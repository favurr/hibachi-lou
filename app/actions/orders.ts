"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const CheckoutSchema = z.object({
  guestName: z.string().min(2, "Name must be at least 2 characters"),
  guestPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  guestEmail: z.string().email("Invalid email address"),
  pickupTime: z.string().min(1, "Pickup time is required"),
  items: z.array(
    z.object({
      menuItemId: z.string(),
      quantity: z.number().min(1, "Quantity must be at least 1"),
    })
  ).min(1, "Your cart must contain at least 1 item"),
});

function generateFriendlyId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Readable alphanumeric base32
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `HL-${code}`;
}

export async function createGuestOrder(data: unknown) {
  try {
    const parsed = CheckoutSchema.parse(data);

    // 1. Fetch menu items to calculate the authoritative prices server-side
    const menuItemIds = parsed.items.map((i) => i.menuItemId);
    const dbMenuItems = await prisma.menuItem.findMany({
      where: { id: { in: menuItemIds } },
    });

    if (dbMenuItems.length !== menuItemIds.length) {
      throw new Error("Some items in your cart are no longer available.");
    }

    // Map database items for quick lookup
    const menuMap = new Map(dbMenuItems.map((item) => [item.id, item]));

    let totalAmount = 0;
    const orderItemsData = parsed.items.map((item) => {
      const dbItem = menuMap.get(item.menuItemId)!;
      if (!dbItem.available) {
        throw new Error(`${dbItem.name} is currently sold out.`);
      }
      const itemSubtotal = dbItem.price * item.quantity;
      totalAmount += itemSubtotal;

      return {
        menuItemId: item.menuItemId,
        name: dbItem.name,
        price: dbItem.price,
        quantity: item.quantity,
      };
    });

    // Add PA/Allegheny County Food Tax (7% in West Homestead/Pittsburgh areas)
    const taxAmount = totalAmount * 0.07;
    const finalTotal = totalAmount + taxAmount;

    // 2. Generate unique friendlyId with collision check
    let friendlyId = "";
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 10) {
      friendlyId = generateFriendlyId();
      const existing = await prisma.order.findUnique({
        where: { friendlyId },
      });
      if (!existing) {
        isUnique = true;
      }
      attempts++;
    }

    if (!isUnique) {
      throw new Error("Server busy. Please try placing your order again.");
    }

    // 3. Create order and items in a database transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          friendlyId,
          guestName: parsed.guestName,
          guestPhone: parsed.guestPhone,
          guestEmail: parsed.guestEmail,
          pickupTime: parsed.pickupTime,
          totalAmount: parseFloat(finalTotal.toFixed(2)),
          paymentStatus: "PENDING", // PENDING -> PAID on mock payment trigger
          status: "RECEIVED",
          items: {
            create: orderItemsData,
          },
        },
        include: {
          items: true,
        },
      });

      return newOrder;
    });

    revalidatePath("/admin");
    return {
      success: true,
      friendlyId: order.friendlyId,
      secureToken: order.secureToken,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Something went wrong. Please try again.",
    };
  }
}

export async function payOrderSimulation(friendlyId: string) {
  try {
    const order = await prisma.order.update({
      where: { friendlyId },
      data: { paymentStatus: "PAID" },
    });
    
    // Realtime update hook placeholder (e.g. Supabase channel broadcast would be triggered here)
    
    revalidatePath("/admin");
    return { success: true, order };
  } catch (error: any) {
    return { success: false, error: error?.message || "Payment simulation failed." };
  }
}
