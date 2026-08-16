import { getPublishedLocations } from "@/lib/dal/locations";
import { LocationsInteractive } from "@/components/public/locations-interactive";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Hibachi Lou — Pittsburgh Food Truck Schedule",
  description: "Check our live operational calendar and map locations to find out where Hibachi Lou is seared fresh today.",
};

export default async function LocationsPage() {
  const dbLocations = await getPublishedLocations();

  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-4">
      <div className="mx-auto max-w-6xl space-y-12">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="h-4 w-4" /> Back to home
        </Link>

        <div className="space-y-4 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Live Schedule</p>
          <h1 className="font-heading text-6xl font-bold uppercase tracking-tight leading-[0.88] text-foreground md:text-8xl">
            FIND THE TRUCK
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Grills seared right in front of you. Check today's active location or explore where we are heading next.
          </p>
        </div>

        {/* Client Side Composable Map & Schedule Interface */}
        <LocationsInteractive initialLocations={dbLocations} />
      </div>
    </div>
  );
}
