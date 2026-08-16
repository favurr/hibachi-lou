"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const CateringSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  eventType: z.string().min(2, "Event type is required"),
  guestCount: z.number().min(1, "Guest count must be at least 1"),
  date: z.string().transform((val) => new Date(val)),
  startTime: z.string().min(1, "Start time is required"),
  location: z.string().min(2, "Location venue is required"),
  serviceType: z.string().default("Standard Buffet"),
  message: z.string().optional().nullable(),
});

export async function submitCateringRequest(data: unknown) {
  try {
    const parsed = CateringSchema.parse(data);

    const request = await prisma.cateringRequest.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        phone: parsed.phone,
        eventType: parsed.eventType,
        guestCount: parsed.guestCount,
        date: parsed.date,
        startTime: parsed.startTime,
        location: parsed.location,
        serviceType: parsed.serviceType,
        message: parsed.message || null,
        status: "NEW",
      },
    });

    // Mock Email Alert / Log Notification
    console.log(`[EMAIL ALERT] New Catering Request submitted!
Reference ID: ${request.id}
Client: ${request.name} (${request.email} / ${request.phone})
Event: ${request.eventType} for ${request.guestCount} guests on ${request.date.toLocaleDateString()} at ${request.startTime}
Location: ${request.location}
Package: ${request.serviceType}
Message: ${request.message || "None"}`);

    revalidatePath("/admin");
    return { success: true, referenceId: request.id };
  } catch (error: any) {
    console.error("Error submitting catering request:", error);
    return {
      success: false,
      error: error?.message || "Failed to submit catering request.",
    };
  }
}

export async function checkDateAvailability(dateStr: string) {
  try {
    if (!dateStr) return { available: false, reason: "Invalid date" };
    
    const targetDate = new Date(dateStr);
    if (isNaN(targetDate.getTime())) {
      return { available: false, reason: "Invalid date format" };
    }
    
    // Normalize date to compare only year/month/day
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    // 1. Check active locations (scheduled truck stops)
    const activeLocations = await prisma.location.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: "ACTIVE",
      },
    });

    // 2. Check confirmed catering requests
    const confirmedRequests = await prisma.cateringRequest.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: "CONFIRMED",
      },
    });

    const isAvailable = activeLocations.length === 0 && confirmedRequests.length === 0;

    return {
      available: isAvailable,
      reason: !isAvailable
        ? activeLocations.length > 0
          ? "We have a scheduled public truck stop on this date."
          : "We are already booked for a private catering event on this date."
        : null,
    };
  } catch (error) {
    console.error("Error checking availability:", error);
    return { available: false, reason: "Error checking availability." };
  }
}

