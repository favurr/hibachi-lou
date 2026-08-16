import prisma from "./lib/prisma";

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
const dayAfter = new Date();
dayAfter.setDate(today.getDate() + 2);

const LOCATIONS = [
  {
    slug: "west-homestead-today",
    venue: "West Homestead Waterfront",
    address: "Waterfront Dr, West Homestead, PA 15120",
    date: today,
    startTime: "15:00",
    endTime: "19:00",
    latitude: 40.4085,
    longitude: -79.9142,
    mapsUrl: "https://maps.app.goo.gl/WestHomestead",
    visibility: "PUBLIC",
    status: "ACTIVE",
    notes: "Catch us by the town square! Ordering opens at 3:00 PM.",
    published: true,
  },
  {
    slug: "bethel-park-tomorrow",
    venue: "Bethel Park Community Center",
    address: "5151 Park Ave, Bethel Park, PA 15102",
    date: tomorrow,
    startTime: "16:00",
    endTime: "20:00",
    latitude: 40.3292,
    longitude: -80.0381,
    mapsUrl: "https://maps.app.goo.gl/BethelPark",
    visibility: "PUBLIC",
    status: "ACTIVE",
    notes: "Friday night hibachi cravings! Bring the family.",
    published: true,
  },
  {
    slug: "private-wedding-saturday",
    venue: "Homestead Wedding (Private Booking)",
    address: "Private Location",
    date: dayAfter,
    startTime: "17:00",
    endTime: "21:00",
    latitude: 40.4022,
    longitude: -79.9078,
    mapsUrl: null,
    visibility: "PRIVATE",
    status: "ACTIVE",
    notes: "Private catering booking. The truck is booked out for this block.",
    published: true,
  },
];

async function seedLocations() {
  console.log("Seeding test location events into the database...");
  try {
    for (const item of LOCATIONS) {
      await prisma.location.upsert({
        where: { slug: item.slug },
        update: item,
        create: item,
      });
    }
    console.log("Successfully seeded location events!");
  } catch (error) {
    console.error("Error seeding locations:", error);
  }
}

seedLocations();
