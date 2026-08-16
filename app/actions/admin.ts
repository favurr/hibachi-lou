"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Helper to check if user is an admin (OWNER, MANAGER, STAFF)
async function verifyAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (!session || !session.user) {
    throw new Error("Unauthorized: Access denied.");
  }
  
  // Verify role
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  
  if (!user || !["OWNER", "MANAGER", "STAFF"].includes(user.role)) {
    throw new Error("Unauthorized: Insufficient privileges.");
  }
  
  return user;
}

// Zod schemas for inputs
const MenuItemSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().optional().nullable(),
  price: z.number().min(0, "Price must be positive"),
  category: z.string().min(2, "Category must be specified"),
  imageUrl: z.string().url().or(z.string().length(0)).optional().nullable(),
  available: z.boolean().default(true),
});

const LocationSchema = z.object({
  venue: z.string().min(2, "Venue must be at least 2 characters"),
  address: z.string().optional().nullable(),
  date: z.string().transform((val) => new Date(val)),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  notes: z.string().optional().nullable(),
  published: z.boolean().default(true),
  slug: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  mapsUrl: z.string().optional().nullable(),
  visibility: z.string().default("PUBLIC"),
  status: z.string().default("ACTIVE"),
  menuId: z.string().optional().nullable(),
});

// MENU ACTIONS
export async function createMenuItem(data: unknown) {
  await verifyAdmin();
  const parsed = MenuItemSchema.parse(data);
  const item = await prisma.menuItem.create({
    data: {
      name: parsed.name,
      slug: parsed.slug,
      description: parsed.description,
      price: parsed.price,
      category: parsed.category,
      imageUrl: parsed.imageUrl,
      available: parsed.available,
    },
  });
  revalidatePath("/menu");
  revalidatePath("/admin");
  return item;
}

export async function updateMenuItem(id: string, data: unknown) {
  await verifyAdmin();
  const parsed = MenuItemSchema.parse(data);
  const item = await prisma.menuItem.update({
    where: { id },
    data: {
      name: parsed.name,
      slug: parsed.slug,
      description: parsed.description,
      price: parsed.price,
      category: parsed.category,
      imageUrl: parsed.imageUrl,
      available: parsed.available,
    },
  });
  revalidatePath("/menu");
  revalidatePath("/admin");
  return item;
}

export async function toggleMenuItemAvailability(id: string, available: boolean) {
  await verifyAdmin();
  const item = await prisma.menuItem.update({
    where: { id },
    data: { available },
  });
  revalidatePath("/menu");
  revalidatePath("/admin");
  return item;
}

export async function deleteMenuItem(id: string) {
  await verifyAdmin();
  await prisma.menuItem.delete({
    where: { id },
  });
  revalidatePath("/menu");
  revalidatePath("/admin");
  return { success: true };
}

// LOCATION ACTIONS
export async function createLocation(data: unknown) {
  await verifyAdmin();
  const parsed = LocationSchema.parse(data);
  const loc = await prisma.location.create({
    data: {
      venue: parsed.venue,
      address: parsed.address,
      date: parsed.date,
      startTime: parsed.startTime,
      endTime: parsed.endTime,
      notes: parsed.notes,
      published: parsed.published,
      slug: parsed.slug,
      latitude: parsed.latitude,
      longitude: parsed.longitude,
      mapsUrl: parsed.mapsUrl,
      visibility: parsed.visibility,
      status: parsed.status,
      menuId: parsed.menuId,
    },
  });
  revalidatePath("/locations");
  revalidatePath("/admin");
  return loc;
}

export async function updateLocation(id: string, data: unknown) {
  await verifyAdmin();
  const parsed = LocationSchema.parse(data);
  const loc = await prisma.location.update({
    where: { id },
    data: {
      venue: parsed.venue,
      address: parsed.address,
      date: parsed.date,
      startTime: parsed.startTime,
      endTime: parsed.endTime,
      notes: parsed.notes,
      published: parsed.published,
      slug: parsed.slug,
      latitude: parsed.latitude,
      longitude: parsed.longitude,
      mapsUrl: parsed.mapsUrl,
      visibility: parsed.visibility,
      status: parsed.status,
      menuId: parsed.menuId,
    },
  });
  revalidatePath("/locations");
  revalidatePath("/admin");
  return loc;
}

export async function toggleLocationPublish(id: string, published: boolean) {
  await verifyAdmin();
  const loc = await prisma.location.update({
    where: { id },
    data: { published },
  });
  revalidatePath("/locations");
  revalidatePath("/admin");
  return loc;
}

export async function deleteLocation(id: string) {
  await verifyAdmin();
  await prisma.location.delete({
    where: { id },
  });
  revalidatePath("/locations");
  revalidatePath("/admin");
  return { success: true };
}

// ORDER ACTIONS
export async function updateOrderStatus(id: string, status: "RECEIVED" | "PREPARING" | "COOKING" | "READY" | "COMPLETED" | "CANCELLED") {
  await verifyAdmin();
  const order = await prisma.order.update({
    where: { id },
    data: { status },
  });
  
  // Realtime update hook placeholder (e.g. Supabase channel broadcast would be triggered here)
  
  revalidatePath("/admin");
  return order;
}

// CATERING ACTIONS
export async function updateCateringRequestStatus(id: string, status: "NEW" | "CONTACTED" | "QUOTE_SENT" | "CONFIRMED" | "COMPLETED") {
  await verifyAdmin();
  const req = await prisma.cateringRequest.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin");
  return req;
}

// SITE SETTINGS ACTIONS
export async function updateSiteSettings(data: { contactPhone?: string; contactEmail?: string; announcement?: string | null; servingStatus?: "OPEN" | "BUSY" | "CLOSED" }) {
  await verifyAdmin();
  const settings = await prisma.siteSettings.update({
    where: { id: "default" },
    data,
  });
  revalidatePath("/");
  revalidatePath("/admin");
  return settings;
}

// CATERING CMS SCHEMAS
const CateringPackageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().min(2, "Description must be specified"),
  imageUrl: z.string().url().or(z.string().length(0)).optional().nullable(),
  menuItems: z.array(z.string()),
  startingPrice: z.number().min(0, "Starting price must be positive"),
  priceVisible: z.boolean().default(true),
  minGuests: z.number().min(1, "Minimum guests must be at least 1"),
  featured: z.boolean().default(false),
  displayOrder: z.number().int().default(0),
  published: z.boolean().default(true),
});

const CateringEventTypeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().min(2, "Description must be specified"),
  imageUrl: z.string().url().or(z.string().length(0)).optional().nullable(),
  displayOrder: z.number().int().default(0),
  published: z.boolean().default(true),
});

const CateringFaqSchema = z.object({
  question: z.string().min(2, "Question must be specified"),
  answer: z.string().min(2, "Answer must be specified"),
  displayOrder: z.number().int().default(0),
  published: z.boolean().default(true),
});

const CateringGalleryItemSchema = z.object({
  title: z.string().min(2, "Title must be specified"),
  hint: z.string().optional().nullable(),
  imageUrl: z.string().url("Must be a valid image URL"),
  displayOrder: z.number().int().default(0),
  published: z.boolean().default(true),
});

const TestimonialSchema = z.object({
  author: z.string().min(2, "Author name is required"),
  role: z.string().optional().nullable(),
  quote: z.string().min(2, "Quote content is required"),
  rating: z.number().min(1).max(5).default(5),
  published: z.boolean().default(true),
  imageUrl: z.string().url().or(z.string().length(0)).optional().nullable(),
  displayOrder: z.number().int().default(0),
  featured: z.boolean().default(false),
});

// CATERING PACKAGE ACTIONS
export async function createCateringPackage(data: unknown) {
  await verifyAdmin();
  const parsed = CateringPackageSchema.parse(data);
  const pkg = await prisma.cateringPackage.create({
    data: parsed,
  });
  revalidatePath("/catering");
  revalidatePath("/admin");
  return pkg;
}

export async function updateCateringPackage(id: string, data: unknown) {
  await verifyAdmin();
  const parsed = CateringPackageSchema.parse(data);
  const pkg = await prisma.cateringPackage.update({
    where: { id },
    data: parsed,
  });
  revalidatePath("/catering");
  revalidatePath("/admin");
  return pkg;
}

export async function deleteCateringPackage(id: string) {
  await verifyAdmin();
  await prisma.cateringPackage.delete({
    where: { id },
  });
  revalidatePath("/catering");
  revalidatePath("/admin");
  return { success: true };
}

// CATERING EVENT TYPE ACTIONS
export async function createCateringEventType(data: unknown) {
  await verifyAdmin();
  const parsed = CateringEventTypeSchema.parse(data);
  const et = await prisma.cateringEventType.create({
    data: parsed,
  });
  revalidatePath("/catering");
  revalidatePath("/admin");
  return et;
}

export async function updateCateringEventType(id: string, data: unknown) {
  await verifyAdmin();
  const parsed = CateringEventTypeSchema.parse(data);
  const et = await prisma.cateringEventType.update({
    where: { id },
    data: parsed,
  });
  revalidatePath("/catering");
  revalidatePath("/admin");
  return et;
}

export async function deleteCateringEventType(id: string) {
  await verifyAdmin();
  await prisma.cateringEventType.delete({
    where: { id },
  });
  revalidatePath("/catering");
  revalidatePath("/admin");
  return { success: true };
}

// CATERING FAQ ACTIONS
export async function createCateringFaq(data: unknown) {
  await verifyAdmin();
  const parsed = CateringFaqSchema.parse(data);
  const faq = await prisma.cateringFaq.create({
    data: parsed,
  });
  revalidatePath("/catering");
  revalidatePath("/admin");
  return faq;
}

export async function updateCateringFaq(id: string, data: unknown) {
  await verifyAdmin();
  const parsed = CateringFaqSchema.parse(data);
  const faq = await prisma.cateringFaq.update({
    where: { id },
    data: parsed,
  });
  revalidatePath("/catering");
  revalidatePath("/admin");
  return faq;
}

export async function deleteCateringFaq(id: string) {
  await verifyAdmin();
  await prisma.cateringFaq.delete({
    where: { id },
  });
  revalidatePath("/catering");
  revalidatePath("/admin");
  return { success: true };
}

// CATERING GALLERY ACTIONS
export async function createCateringGalleryItem(data: unknown) {
  await verifyAdmin();
  const parsed = CateringGalleryItemSchema.parse(data);
  const gi = await prisma.cateringGalleryItem.create({
    data: parsed,
  });
  revalidatePath("/catering");
  revalidatePath("/admin");
  return gi;
}

export async function updateCateringGalleryItem(id: string, data: unknown) {
  await verifyAdmin();
  const parsed = CateringGalleryItemSchema.parse(data);
  const gi = await prisma.cateringGalleryItem.update({
    where: { id },
    data: parsed,
  });
  revalidatePath("/catering");
  revalidatePath("/admin");
  return gi;
}

export async function deleteCateringGalleryItem(id: string) {
  await verifyAdmin();
  await prisma.cateringGalleryItem.delete({
    where: { id },
  });
  revalidatePath("/catering");
  revalidatePath("/admin");
  return { success: true };
}

// TESTIMONIAL ACTIONS
export async function createTestimonial(data: unknown) {
  await verifyAdmin();
  const parsed = TestimonialSchema.parse(data);
  const t = await prisma.testimonial.create({
    data: parsed,
  });
  revalidatePath("/catering");
  revalidatePath("/admin");
  return t;
}

export async function updateTestimonial(id: string, data: unknown) {
  await verifyAdmin();
  const parsed = TestimonialSchema.parse(data);
  const t = await prisma.testimonial.update({
    where: { id },
    data: parsed,
  });
  revalidatePath("/catering");
  revalidatePath("/admin");
  return t;
}

export async function deleteTestimonial(id: string) {
  await verifyAdmin();
  await prisma.testimonial.delete({
    where: { id },
  });
  revalidatePath("/catering");
  revalidatePath("/admin");
  return { success: true };
}

