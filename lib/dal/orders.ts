import prisma from "@/lib/prisma";

export async function getOrderById(id: string) {
  try {
    return await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    return null;
  }
}

export async function getOrderByFriendlyId(friendlyId: string) {
  try {
    return await prisma.order.findUnique({
      where: { friendlyId },
      include: { items: true },
    });
  } catch (error) {
    console.error(`Error fetching order by friendly ID ${friendlyId}:`, error);
    return null;
  }
}

export async function getOrderBySecureToken(friendlyId: string, secureToken: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { friendlyId },
      include: { items: true },
    });
    if (order && order.secureToken === secureToken) {
      return order;
    }
    return null;
  } catch (error) {
    console.error("Error fetching order securely:", error);
    return null;
  }
}
