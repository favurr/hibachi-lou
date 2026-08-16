import prisma from "./lib/prisma";

const PACKAGES = [
  {
    name: "Classic Hibachi",
    slug: "classic-hibachi",
    description: "Our signature hibachi package featuring two proteins, fresh vegetables, and Lou's classic fried rice.",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=80",
    menuItems: ["2 Proteins (Steak, Chicken, or Shrimp)", "Signature Fried Rice", "Garlic Butter Vegetables", "Yum Yum & Ginger Sauces"],
    startingPrice: 35.0,
    priceVisible: true,
    minGuests: 15,
    featured: true,
    displayOrder: 1,
    published: true,
  },
  {
    name: "The Golden Sear",
    slug: "golden-sear",
    description: "Upgraded experience with 3 proteins, yakisoba noodles side, and interactive chef show tricks.",
    imageUrl: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=1200&auto=format&fit=crop&q=80",
    menuItems: ["3 Proteins (Steak, Chicken, Shrimp, or Salmon)", "Signature Fried Rice & Yakisoba Noodles", "Garlic Butter Vegetables", "Chef Show Entertainment & Tricks", "Yum Yum, Ginger & Teriyaki Sauces"],
    startingPrice: 45.0,
    priceVisible: true,
    minGuests: 15,
    featured: true,
    displayOrder: 2,
    published: true,
  },
  {
    name: "The Imperial Feast",
    slug: "imperial-feast",
    description: "The premium VIP backyard private chef experience. Includes premium cut filet, lobster tail, appetizers, and premium entertainment.",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=80",
    menuItems: ["Premium Filet Mignon, Lobster Tail & Jumbo Shrimp", "Appetizers: Gyoza & Edamame", "Signature Fried Rice & Yakisoba Noodles", "Extended Interactive Chef Show", "Customized Menu Requests Accommodated"],
    startingPrice: 0.0,
    priceVisible: false,
    minGuests: 10,
    featured: false,
    displayOrder: 3,
    published: true,
  },
];

const EVENT_TYPES = [
  {
    name: "Backyard Parties",
    slug: "backyard-parties",
    description: "Turn your backyard into a live teppanyaki grill station. High energy, fire show, and hot plates cooked right in front of your guests.",
    imageUrl: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=1200&auto=format&fit=crop&q=80",
    displayOrder: 1,
    published: true,
  },
  {
    name: "Weddings",
    slug: "weddings",
    description: "Make your special day unforgettable with interactive catering. Lou will grill live to order, providing a fun and memorable feast for your guests.",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=80",
    displayOrder: 2,
    published: true,
  },
  {
    name: "Corporate Events",
    slug: "corporate",
    description: "Boost team morale or impress clients with a unique on-site cooking experience. Perfect for company picnics and milestone celebrations.",
    imageUrl: "https://images.unsplash.com/photo-1528604228932-9360a56f0b6a?w=1200&auto=format&fit=crop&q=80",
    displayOrder: 3,
    published: true,
  },
];

const FAQS = [
  {
    question: "What is included in the live catering experience?",
    answer: "Our chef sets up a professional flat-top griddle on-site. We provide all the food (proteins, rice, vegetables, sauces) and cook live in front of your guests, performing classic interactive hibachi show tricks. We clean up our setup completely when finished.",
    displayOrder: 1,
    published: true,
  },
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking at least 3-4 weeks in advance, especially for weekend events during spring and summer seasons.",
    displayOrder: 2,
    published: true,
  },
  {
    question: "Is there a minimum guest count for catering?",
    answer: "Yes, our private catering events typically require a minimum of 15 guests. For smaller groups, a minimum spend requirement may apply.",
    displayOrder: 3,
    published: true,
  },
  {
    question: "Can you accommodate dietary restrictions and allergies?",
    answer: "Absolutely. We can accommodate gluten-free, dairy-free, vegetarian, and nut allergies. Please let us know of any specific restrictions when submitting your request.",
    displayOrder: 4,
    published: true,
  },
  {
    question: "What happens if it rains or there is bad weather?",
    answer: "Our cooking equipment requires cover in case of rain. We can cook under a tent, awning, or garage, and serve guests indoors or under cover.",
    displayOrder: 5,
    published: true,
  },
];

const GALLERY_ITEMS = [
  {
    title: "Griddle Fire Trick",
    hint: "Chef Show Trick",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=80",
    displayOrder: 1,
    published: true,
  },
  {
    title: "Fresh Seared Salmon",
    hint: "Catering Menu",
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&auto=format&fit=crop&q=80",
    displayOrder: 2,
    published: true,
  },
  {
    title: "Outdoor Party Setup",
    hint: "Backyard Party",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-3792f7984f3c?w=1200&auto=format&fit=crop&q=80",
    displayOrder: 3,
    published: true,
  },
  {
    title: "Wedding Hibachi Show",
    hint: "Interactive Event",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=80",
    displayOrder: 4,
    published: true,
  },
];

const TESTIMONIALS = [
  {
    author: "Mark S.",
    role: "Backyard Birthday",
    quote: "Lou came out for my 40th birthday party and absolutely crushed it. The food was incredible, but the entertainment was even better. Our guests are still talking about it!",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    featured: true,
    displayOrder: 1,
    published: true,
  },
  {
    author: "Amanda & Chris",
    role: "Wedding Reception",
    quote: "We wanted a unique experience for our wedding and Lou delivered. Cooking right on site, great vibes, and the steak was cooked perfectly. Highly recommend!",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    featured: true,
    displayOrder: 2,
    published: true,
  },
];

async function main() {
  console.log("Seeding catering database...");

  // Seed Packages
  for (const pkg of PACKAGES) {
    await prisma.cateringPackage.upsert({
      where: { slug: pkg.slug },
      update: pkg,
      create: pkg,
    });
  }
  console.log("- Packages seeded");

  // Seed Event Types
  for (const et of EVENT_TYPES) {
    await prisma.cateringEventType.upsert({
      where: { slug: et.slug },
      update: et,
      create: et,
    });
  }
  console.log("- Event Types seeded");

  // Seed FAQs
  await prisma.cateringFaq.deleteMany();
  for (const faq of FAQS) {
    await prisma.cateringFaq.create({
      data: faq,
    });
  }
  console.log("- FAQs seeded");

  // Seed Gallery Items
  await prisma.cateringGalleryItem.deleteMany();
  for (const gi of GALLERY_ITEMS) {
    await prisma.cateringGalleryItem.create({
      data: gi,
    });
  }
  console.log("- Gallery Items seeded");

  // Seed Testimonials (extend existing)
  for (const t of TESTIMONIALS) {
    const existing = await prisma.testimonial.findFirst({
      where: { author: t.author, quote: t.quote },
    });
    if (!existing) {
      await prisma.testimonial.create({
        data: t,
      });
    }
  }
  console.log("- Testimonials seeded");

  console.log("Done!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
