import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AdminDashboardClient } from "./dashboard-client";

export default async function AdminDashboardPage() {
  // Strict server-side verification
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/admin/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user || !["OWNER", "MANAGER", "STAFF"].includes(user.role)) {
    redirect("/admin/login");
  }

  // Load all operational and CMS data in parallel
  const [orders, cateringRequests, menuItems, locations, settings, packages, eventTypes, faqs, galleryItems, testimonials] = await Promise.all([
    prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.cateringRequest.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.menuItem.findMany({
      orderBy: { name: "asc" },
    }),
    prisma.location.findMany({
      orderBy: { date: "asc" },
    }),
    prisma.siteSettings.findUnique({
      where: { id: "default" },
    }).then((res) => res || prisma.siteSettings.create({
      data: {
        id: "default",
        contactPhone: "(412) 953-6101",
        contactEmail: "info@hibachilou.com",
        servingStatus: "CLOSED",
      }
    })),
    prisma.cateringPackage.findMany({
      orderBy: { displayOrder: "asc" },
    }),
    prisma.cateringEventType.findMany({
      orderBy: { displayOrder: "asc" },
    }),
    prisma.cateringFaq.findMany({
      orderBy: { displayOrder: "asc" },
    }),
    prisma.cateringGalleryItem.findMany({
      orderBy: { displayOrder: "asc" },
    }),
    prisma.testimonial.findMany({
      orderBy: { displayOrder: "asc" },
    }),
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              Operations Console
            </p>
            <h1 className="font-heading text-4xl font-bold uppercase tracking-tight">
              HIBACHI LOU ADMIN
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{user.name || user.email}</p>
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{user.role}</p>
            </div>
          </div>
        </header>

        <AdminDashboardClient
          initialOrders={orders}
          initialCatering={cateringRequests}
          initialMenuItems={menuItems}
          initialLocations={locations}
          initialSettings={settings}
          initialPackages={packages}
          initialEventTypes={eventTypes}
          initialFaqs={faqs}
          initialGalleryItems={galleryItems}
          initialTestimonials={testimonials}
        />
      </div>
    </div>
  );
}

