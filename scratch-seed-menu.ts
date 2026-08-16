import prisma from "./lib/prisma";

const MENU_ITEMS = [
  {
    name: "Steak Hibachi",
    slug: "steak-hibachi",
    description: "Tender flat-iron steak grilled with soy, garlic, and butter, served over fried rice.",
    price: 18.00,
    category: "Hibachi",
    imageUrl: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&auto=format&fit=crop&q=80",
    available: true,
  },
  {
    name: "Chicken Hibachi",
    slug: "chicken-hibachi",
    description: "Juicy chicken breast seared with garlic butter, served with signature vegetables.",
    price: 16.00,
    category: "Hibachi",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80",
    available: true,
  },
  {
    name: "Shrimp Hibachi",
    slug: "shrimp-hibachi",
    description: "Plump pacific shrimp grilled with lemon and garlic, served family-style.",
    price: 18.00,
    category: "Hibachi",
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&auto=format&fit=crop&q=80",
    available: true,
  },
  {
    name: "Lou's Trio",
    slug: "lous-trio",
    description: "The ultimate combo: Steak, Chicken, and Shrimp hibachi grilled to perfection.",
    price: 24.00,
    category: "Hibachi",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=80",
    available: true,
  },
  {
    name: "Yum Yum Noodles",
    slug: "yum-yum-noodles",
    description: "Pan-fried yakisoba noodles tossed in sweet garlic sauce and green onions.",
    price: 12.00,
    category: "Noodles",
    imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1200&auto=format&fit=crop&q=80",
    available: true,
  },
  {
    name: "Fried Rice Side",
    slug: "fried-rice-side",
    description: "Lou's classic seasoned hibachi fried rice with egg and scallions.",
    price: 6.00,
    category: "Sides",
    imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&auto=format&fit=crop&q=80",
    available: true,
  },
];

async function seedMenu() {
  console.log("Seeding menu items into the database...");
  try {
    for (const item of MENU_ITEMS) {
      await prisma.menuItem.upsert({
        where: { slug: item.slug },
        update: item,
        create: item,
      });
    }
    console.log("Successfully seeded menu items!");
  } catch (error) {
    console.error("Error seeding menu:", error);
  }
}

seedMenu();
