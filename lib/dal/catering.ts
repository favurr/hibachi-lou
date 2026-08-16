import prisma from "@/lib/prisma";

export async function getCateringRequestById(id: string) {
  try {
    return await prisma.cateringRequest.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`Error fetching catering request ${id}:`, error);
    return null;
  }
}

export async function getAllCateringRequests() {
  try {
    return await prisma.cateringRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching catering requests:", error);
    return [];
  }
}

export async function getCateringPackages() {
  try {
    return await prisma.cateringPackage.findMany({
      where: { published: true },
      orderBy: { displayOrder: "asc" },
    });
  } catch (error) {
    console.error("Error fetching catering packages:", error);
    return [];
  }
}

export async function getCateringEventTypes() {
  try {
    return await prisma.cateringEventType.findMany({
      where: { published: true },
      orderBy: { displayOrder: "asc" },
    });
  } catch (error) {
    console.error("Error fetching catering event types:", error);
    return [];
  }
}

export async function getCateringFaqs() {
  try {
    return await prisma.cateringFaq.findMany({
      where: { published: true },
      orderBy: { displayOrder: "asc" },
    });
  } catch (error) {
    console.error("Error fetching catering FAQs:", error);
    return [];
  }
}

export async function getCateringGalleryItems() {
  try {
    return await prisma.cateringGalleryItem.findMany({
      where: { published: true },
      orderBy: { displayOrder: "asc" },
    });
  } catch (error) {
    console.error("Error fetching catering gallery items:", error);
    return [];
  }
}

export async function getFeaturedCateringTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      where: { published: true, featured: true },
      orderBy: { displayOrder: "asc" },
    });
  } catch (error) {
    console.error("Error fetching catering testimonials:", error);
    return [];
  }
}

