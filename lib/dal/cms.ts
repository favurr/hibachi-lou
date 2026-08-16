import prisma from "@/lib/prisma";

export async function getSiteSettings() {
  try {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: "default" },
    });
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          id: "default",
          contactPhone: "(412) 953-6101",
          contactEmail: "info@hibachilou.com",
          servingStatus: "CLOSED",
        },
      });
    }
    return settings;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return {
      id: "default",
      contactPhone: "(412) 953-6101",
      contactEmail: "info@hibachilou.com",
      announcement: null,
      servingStatus: "CLOSED",
    };
  }
}

export async function getContentSection(slug: string) {
  try {
    return await prisma.contentSection.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error(`Error fetching content section ${slug}:`, error);
    return null;
  }
}

export async function getPublishedTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}
