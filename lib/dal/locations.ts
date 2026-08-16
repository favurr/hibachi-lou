import prisma from "@/lib/prisma";

export async function getPublishedLocations() {
  try {
    return await prisma.location.findMany({
      where: { published: true },
      orderBy: { date: "asc" },
    });
  } catch (error) {
    console.error("Error fetching published locations:", error);
    return [];
  }
}

export async function getAllLocations() {
  try {
    return await prisma.location.findMany({
      orderBy: { date: "asc" },
    });
  } catch (error) {
    console.error("Error fetching all locations:", error);
    return [];
  }
}
