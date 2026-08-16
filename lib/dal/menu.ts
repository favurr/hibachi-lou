import prisma from "@/lib/prisma";

export async function getMenuItems() {
  try {
    return await prisma.menuItem.findMany({
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return [];
  }
}

export async function getAvailableMenuItems() {
  try {
    return await prisma.menuItem.findMany({
      where: { available: true },
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Error fetching available menu items:", error);
    return [];
  }
}

export async function getMenuItemBySlug(slug: string) {
  try {
    return await prisma.menuItem.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error(`Error fetching menu item ${slug}:`, error);
    return null;
  }
}
