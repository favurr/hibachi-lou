"use client";

import {
  createCateringEventType,
  createCateringFaq,
  createCateringGalleryItem,
  createCateringPackage,
  createLocation,
  createMenuItem,
  createTestimonial,
  deleteCateringEventType,
  deleteCateringFaq,
  deleteCateringGalleryItem,
  deleteCateringPackage,
  deleteLocation,
  deleteMenuItem,
  deleteTestimonial,
  toggleMenuItemAvailability,
  updateCateringRequestStatus,
  updateOrderStatus,
  updateSiteSettings
} from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapControls, Map as MapMap, MapMarker, MarkerContent } from "@/components/ui/map";
import { Textarea } from "@/components/ui/textarea";
import { signOut } from "@/lib/auth-client";
import { supabase } from "@/lib/supabase/client";
import {
  CheckCircle,
  ChefHat,
  ClipboardList,
  Inbox,
  Loader2,
  LogOut,
  MapPin,
  Settings,
  Store,
  Trash
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Tab = "overview" | "orders" | "menu" | "locations" | "catering" | "settings";

interface Props {
  initialOrders: any[];
  initialCatering: any[];
  initialMenuItems: any[];
  initialLocations: any[];
  initialSettings: any;
  initialPackages?: any[];
  initialEventTypes?: any[];
  initialFaqs?: any[];
  initialGalleryItems?: any[];
  initialTestimonials?: any[];
}

export function AdminDashboardClient({
  initialOrders,
  initialCatering,
  initialMenuItems,
  initialLocations,
  initialSettings,
  initialPackages = [],
  initialEventTypes = [],
  initialFaqs = [],
  initialGalleryItems = [],
  initialTestimonials = []
}: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [settings, setSettings] = useState(initialSettings);
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [locations, setLocations] = useState(initialLocations);
  const [packages, setPackages] = useState<any[]>(initialPackages);
  const [eventTypes, setEventTypes] = useState<any[]>(initialEventTypes);
  const [faqs, setFaqs] = useState<any[]>(initialFaqs);
  const [galleryItems, setGalleryItems] = useState<any[]>(initialGalleryItems);
  const [testimonials, setTestimonials] = useState<any[]>(initialTestimonials);

  const [cateringSubTab, setCateringSubTab] = useState<"leads" | "packages" | "eventTypes" | "faqs" | "gallery" | "testimonials">("leads");

  // CMS Form States
  const [newPackage, setNewPackage] = useState({
    name: "",
    slug: "",
    description: "",
    imageUrl: "",
    menuItems: "",
    startingPrice: "",
    priceVisible: true,
    minGuests: "15",
    featured: false,
    displayOrder: "0",
  });

  const [newEventType, setNewEventType] = useState({
    name: "",
    slug: "",
    description: "",
    imageUrl: "",
    displayOrder: "0",
  });

  const [newFaq, setNewFaq] = useState({
    question: "",
    answer: "",
    displayOrder: "0",
  });

  const [newGalleryItem, setNewGalleryItem] = useState({
    title: "",
    hint: "",
    imageUrl: "",
    displayOrder: "0",
  });

  const [newTestimonial, setNewTestimonial] = useState({
    author: "",
    role: "",
    quote: "",
    rating: "5",
    imageUrl: "",
    displayOrder: "0",
    featured: false,
  });


  // New Menu Item Form state
  const [newMenu, setNewMenu] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    category: "Hibachi",
    imageUrl: "",
  });

  const [newLoc, setNewLoc] = useState({
    venue: "",
    address: "",
    date: "",
    startTime: "",
    endTime: "",
    notes: "",
    slug: "",
    latitude: null as number | null,
    longitude: null as number | null,
    mapsUrl: "",
    visibility: "PUBLIC",
    status: "ACTIVE",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  // Autocomplete place search for Location Form
  useEffect(() => {
    if (searchQuery.length < 3) {
      setSearchResults([]);
      return;
    }
    const timeout = setTimeout(async () => {
      setLoadingSearch(true);
      try {
        const res = await fetch(`/api/geocode?q=${encodeURIComponent(searchQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data);
        }
      } catch (err) {
        console.error("Place search error:", err);
      } finally {
        setLoadingSearch(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const handleSelectSearchResult = (item: any) => {
    const cleanVenue = item.name.split(",")[0] || item.name;
    const computedSlug = cleanVenue.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
    setNewLoc(prev => ({
      ...prev,
      venue: cleanVenue,
      address: item.address,
      latitude: item.latitude,
      longitude: item.longitude,
      slug: computedSlug,
    }));
    setSearchQuery("");
    setSearchResults([]);
  };

  // Metrics calculation
  const totalRevenue = initialOrders
    .filter(o => o.paymentStatus === "PAID" || o.status === "COMPLETED")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingOrders = initialOrders.filter(o => ["RECEIVED", "PREPARING", "COOKING", "READY"].includes(o.status)).length;
  const activeCatering = initialCatering.filter(c => ["NEW", "CONTACTED", "QUOTE_SENT"].includes(c.status)).length;

  const handleStatusChange = async (id: string, status: any) => {
    const order = initialOrders.find((o) => o.id === id);
    await updateOrderStatus(id, status);

    if (order) {
      try {
        const channelName = `order:${order.friendlyId}_${order.secureToken}`;
        const channel = supabase.channel(channelName);
        channel.subscribe((subStatus) => {
          if (subStatus === "SUBSCRIBED") {
            channel.send({
              type: "broadcast",
              event: "status-update",
              payload: { status },
            });
            setTimeout(() => {
              supabase.removeChannel(channel);
            }, 1000);
          }
        });
      } catch (err) {
        console.error("Failed to broadcast order status update:", err);
      }
    }

    router.refresh();
  };

  const handleCateringChange = async (id: string, status: any) => {
    await updateCateringRequestStatus(id, status);
    router.refresh();
  };

  const handleToggleMenu = async (id: string, available: boolean) => {
    await toggleMenuItemAvailability(id, available);
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, available } : item));
    router.refresh();
  };

  const handleDeleteMenu = async (id: string) => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      await deleteMenuItem(id);
      setMenuItems(prev => prev.filter(item => item.id !== id));
      router.refresh();
    }
  };

  const handleCreateMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await createMenuItem({
        ...newMenu,
        price: parseFloat(newMenu.price),
      });
      setMenuItems(prev => [...prev, created]);
      setNewMenu({ name: "", slug: "", description: "", price: "", category: "Hibachi", imageUrl: "" });
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to create menu item.");
    }
  };

  const handleCreateLoc = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await createLocation({
        ...newLoc,
        published: true,
      });
      setLocations(prev => [...prev, created]);
      setNewLoc({
        venue: "",
        address: "",
        date: "",
        startTime: "",
        endTime: "",
        notes: "",
        slug: "",
        latitude: null,
        longitude: null,
        mapsUrl: "",
        visibility: "PUBLIC",
        status: "ACTIVE",
      });
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to create location stop.");
    }
  };

  const handleDeleteLoc = async (id: string) => {
    if (confirm("Delete this stop from the schedule?")) {
      await deleteLocation(id);
      setLocations(prev => prev.filter(loc => loc.id !== id));
      router.refresh();
    }
  };

  const handleCreatePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const items = newPackage.menuItems.split(",").map(i => i.trim()).filter(Boolean);
      const created = await createCateringPackage({
        ...newPackage,
        startingPrice: parseFloat(newPackage.startingPrice) || 0,
        minGuests: parseInt(newPackage.minGuests) || 10,
        displayOrder: parseInt(newPackage.displayOrder) || 0,
        menuItems: items,
      });
      setPackages(prev => [...prev, created]);
      setNewPackage({
        name: "",
        slug: "",
        description: "",
        imageUrl: "",
        menuItems: "",
        startingPrice: "",
        priceVisible: true,
        minGuests: "15",
        featured: false,
        displayOrder: "0",
      });
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to create catering package.");
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (confirm("Delete this catering package?")) {
      await deleteCateringPackage(id);
      setPackages(prev => prev.filter(p => p.id !== id));
      router.refresh();
    }
  };

  const handleCreateEventType = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await createCateringEventType({
        ...newEventType,
        displayOrder: parseInt(newEventType.displayOrder) || 0,
      });
      setEventTypes(prev => [...prev, created]);
      setNewEventType({
        name: "",
        slug: "",
        description: "",
        imageUrl: "",
        displayOrder: "0",
      });
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to create event type.");
    }
  };

  const handleDeleteEventType = async (id: string) => {
    if (confirm("Delete this event type?")) {
      await deleteCateringEventType(id);
      setEventTypes(prev => prev.filter(et => et.id !== id));
      router.refresh();
    }
  };

  const handleCreateFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await createCateringFaq({
        ...newFaq,
        displayOrder: parseInt(newFaq.displayOrder) || 0,
      });
      setFaqs(prev => [...prev, created]);
      setNewFaq({
        question: "",
        answer: "",
        displayOrder: "0",
      });
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to create FAQ.");
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (confirm("Delete this FAQ?")) {
      await deleteCateringFaq(id);
      setFaqs(prev => prev.filter(f => f.id !== id));
      router.refresh();
    }
  };

  const handleCreateGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await createCateringGalleryItem({
        ...newGalleryItem,
        displayOrder: parseInt(newGalleryItem.displayOrder) || 0,
      });
      setGalleryItems(prev => [...prev, created]);
      setNewGalleryItem({
        title: "",
        hint: "",
        imageUrl: "",
        displayOrder: "0",
      });
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to create gallery item.");
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if (confirm("Delete this gallery item?")) {
      await deleteCateringGalleryItem(id);
      setGalleryItems(prev => prev.filter(gi => gi.id !== id));
      router.refresh();
    }
  };

  const handleCreateTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await createTestimonial({
        ...newTestimonial,
        rating: parseInt(newTestimonial.rating) || 5,
        displayOrder: parseInt(newTestimonial.displayOrder) || 0,
      });
      setTestimonials(prev => [...prev, created]);
      setNewTestimonial({
        author: "",
        role: "",
        quote: "",
        rating: "5",
        imageUrl: "",
        displayOrder: "0",
        featured: false,
      });
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to create testimonial.");
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (confirm("Delete this testimonial?")) {
      await deleteTestimonial(id);
      setTestimonials(prev => prev.filter(t => t.id !== id));
      router.refresh();
    }
  };

  const handleUpdateSettings = async (field: string, value: any) => {
    const updated = await updateSiteSettings({ [field]: value });
    setSettings(updated);
    
    // Broadcast real-time status update to all listening clients
    try {
      const channel = supabase.channel("hibachi-lou:status");
      channel.subscribe((status) => {
        if (status === "SUBSCRIBED") {
          channel.send({
            type: "broadcast",
            event: "status-update",
            payload: {
              servingStatus: updated.servingStatus,
              announcement: updated.announcement,
            },
          });
          // Clean up local temp channel after a short delay
          setTimeout(() => {
            supabase.removeChannel(channel);
          }, 1000);
        }
      });
    } catch (err) {
      console.error("Failed to broadcast real-time settings update:", err);
    }
    
    router.refresh();
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="grid gap-8 md:grid-cols-[200px_1fr]">
      {/* Sidebar Navigation */}
      <aside className="flex flex-col gap-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "overview" ? "bg-primary text-cream" : "hover:bg-muted text-foreground"
          }`}
        >
          <Store className="h-4 w-4" /> OVERVIEW
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "orders" ? "bg-primary text-cream" : "hover:bg-muted text-foreground"
          }`}
        >
          <ClipboardList className="h-4 w-4" /> ORDERS ({pendingOrders})
        </button>
        <button
          onClick={() => setActiveTab("menu")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "menu" ? "bg-primary text-cream" : "hover:bg-muted text-foreground"
          }`}
        >
          <ChefHat className="h-4 w-4" /> MENU
        </button>
        <button
          onClick={() => setActiveTab("locations")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "locations" ? "bg-primary text-cream" : "hover:bg-muted text-foreground"
          }`}
        >
          <MapPin className="h-4 w-4" /> LOCATIONS
        </button>
        <button
          onClick={() => setActiveTab("catering")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "catering" ? "bg-primary text-cream" : "hover:bg-muted text-foreground"
          }`}
        >
          <Inbox className="h-4 w-4" /> CATERING ({activeCatering})
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "settings" ? "bg-primary text-cream" : "hover:bg-muted text-foreground"
          }`}
        >
          <Settings className="h-4 w-4" /> SETTINGS
        </button>
        <hr className="border-border my-2" />
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="h-4 w-4" /> SIGN OUT
        </button>
      </aside>

      {/* Main Panel Content */}
      <main className="space-y-6">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 space-y-2">
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Today's Revenue</p>
                <p className="font-heading text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 space-y-2">
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Pending Orders</p>
                <p className="font-heading text-3xl font-bold">{pendingOrders}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 space-y-2">
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Active Catering Leads</p>
                <p className="font-heading text-3xl font-bold">{activeCatering}</p>
              </div>
            </div>

            {/* Serving Status Controller */}
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <div>
                <h3 className="font-heading text-xl font-bold uppercase">Truck Serving Status</h3>
                <p className="text-sm text-muted-foreground">Broadcast current truck load to the public banner.</p>
              </div>
              <div className="flex gap-4">
                {["CLOSED", "OPEN", "BUSY"].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleUpdateSettings("servingStatus", status)}
                    className={`h-10 px-6 text-sm font-medium rounded-lg border transition-colors ${
                      settings.servingStatus === status
                        ? "bg-primary text-cream border-transparent"
                        : "bg-transparent text-foreground border-border hover:bg-muted"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === "orders" && (
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="font-heading text-xl font-bold uppercase">Customer Orders</h3>
            </div>
            <div className="divide-y divide-border">
              {initialOrders.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground text-sm">No orders recorded yet.</div>
              ) : (
                initialOrders.map((order) => (
                  <div key={order.id} className="p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-primary">{order.friendlyId}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-mono uppercase ${
                          order.paymentStatus === "PAID" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                        }`}>{order.paymentStatus}</span>
                      </div>
                      <p className="text-sm font-medium">{order.guestName} ({order.guestPhone})</p>
                      <p className="text-xs text-muted-foreground">
                        {order.items.map((i: any) => `${i.quantity}x ${i.name}`).join(", ")}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm font-semibold">${order.totalAmount.toFixed(2)}</span>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus-visible:outline-none"
                      >
                        <option value="RECEIVED">RECEIVED</option>
                        <option value="PREPARING">PREPARING</option>
                        <option value="COOKING">COOKING</option>
                        <option value="READY">READY</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* MENU TAB */}
        {activeTab === "menu" && (
          <div className="space-y-6">
            {/* Create Menu Item */}
            <form onSubmit={handleCreateMenu} className="rounded-xl border border-border bg-card p-6 space-y-4">
              <h3 className="font-heading text-xl font-bold uppercase">Add Menu Item</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="menu-name">Item Name</Label>
                  <Input
                    id="menu-name"
                    value={newMenu.name}
                    onChange={(e) => setNewMenu(prev => ({ ...prev, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, "-") }))}
                    placeholder="e.g. Teriyaki Chicken"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="menu-price">Price ($)</Label>
                  <Input
                    id="menu-price"
                    type="number"
                    step="0.01"
                    value={newMenu.price}
                    onChange={(e) => setNewMenu(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="e.g. 16.00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="menu-category">Category</Label>
                  <select
                    id="menu-category"
                    value={newMenu.category}
                    onChange={(e) => setNewMenu(prev => ({ ...prev, category: e.target.value }))}
                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="Hibachi">Hibachi</option>
                    <option value="Noodles">Noodles</option>
                    <option value="Sides">Sides</option>
                    <option value="Drinks">Drinks</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="menu-image">Image URL</Label>
                  <Input
                    id="menu-image"
                    value={newMenu.imageUrl}
                    onChange={(e) => setNewMenu(prev => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="menu-desc">Description</Label>
                <Textarea
                  id="menu-desc"
                  value={newMenu.description}
                  onChange={(e) => setNewMenu(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe details or modifiers..."
                />
              </div>
              <Button type="submit" className="h-10">Add Item</Button>
            </form>

            {/* Menu List */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="p-6 border-b border-border">
                <h3 className="font-heading text-xl font-bold uppercase">Current Menu</h3>
              </div>
              <div className="divide-y divide-border">
                {menuItems.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <p className="font-heading text-lg font-semibold">{item.name}</p>
                      <p className="text-xs font-mono text-muted-foreground uppercase">{item.category} • ${item.price.toFixed(2)}</p>
                      {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleToggleMenu(item.id, !item.available)}
                        className={`h-9 px-4 text-xs font-semibold uppercase tracking-wider rounded-lg border transition-colors ${
                          item.available 
                            ? "bg-emerald-100 text-emerald-800 border-emerald-200" 
                            : "bg-red-100 text-red-800 border-red-200"
                        }`}
                      >
                        {item.available ? "AVAILABLE" : "SOLD OUT"}
                      </button>
                      <button
                        onClick={() => handleDeleteMenu(item.id)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LOCATIONS TAB */}
        {activeTab === "locations" && (
          <div className="space-y-6">
            {/* Create Location Stop */}
            <form onSubmit={handleCreateLoc} className="rounded-xl border border-border bg-card p-6 space-y-6">
              <h3 className="font-heading text-xl font-bold uppercase">Add Location Stop</h3>
              
              {/* Autocomplete Search */}
              <div className="space-y-2 relative">
                <Label htmlFor="loc-search">Search Location / Address</Label>
                <Input
                  id="loc-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for a venue, address, or place..."
                />
                {loadingSearch && (
                  <Loader2 className="absolute right-3 top-9 h-4 w-4 animate-spin text-muted-foreground" />
                )}
                {searchResults.length > 0 && (
                  <div className="absolute top-16 left-0 right-0 z-50 bg-background border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto divide-y divide-border/50">
                    {searchResults.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectSearchResult(item)}
                        className="p-3 text-xs text-foreground hover:bg-muted/50 cursor-pointer transition-colors"
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="loc-venue">Venue Name</Label>
                  <Input
                    id="loc-venue"
                    value={newLoc.venue}
                    onChange={(e) => setNewLoc(prev => ({ ...prev, venue: e.target.value }))}
                    placeholder="e.g. Bethel Park Farmers Market"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loc-address">Address</Label>
                  <Input
                    id="loc-address"
                    value={newLoc.address}
                    onChange={(e) => setNewLoc(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="e.g. 5100 West Library Ave, PA"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loc-date">Date</Label>
                  <Input
                    id="loc-date"
                    type="date"
                    value={newLoc.date}
                    onChange={(e) => setNewLoc(prev => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>
                <div className="grid gap-2 grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="loc-start">Start Time</Label>
                    <Input
                      id="loc-start"
                      value={newLoc.startTime}
                      onChange={(e) => setNewLoc(prev => ({ ...prev, startTime: e.target.value }))}
                      placeholder="e.g. 12:00 PM"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="loc-end">End Time</Label>
                    <Input
                      id="loc-end"
                      value={newLoc.endTime}
                      onChange={(e) => setNewLoc(prev => ({ ...prev, endTime: e.target.value }))}
                      placeholder="e.g. 7:00 PM"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loc-visibility">Visibility</Label>
                  <select
                    id="loc-visibility"
                    value={newLoc.visibility}
                    onChange={(e) => setNewLoc(prev => ({ ...prev, visibility: e.target.value }))}
                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none"
                  >
                    <option value="PUBLIC">PUBLIC (Visible on map/schedule)</option>
                    <option value="PRIVATE">PRIVATE (Generic schedule notice only)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loc-status">Operational Status</Label>
                  <select
                    id="loc-status"
                    value={newLoc.status}
                    onChange={(e) => setNewLoc(prev => ({ ...prev, status: e.target.value }))}
                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>
              </div>

              {/* Draggable Map Confirmation Preview */}
              {newLoc.latitude !== null && newLoc.longitude !== null && (
                <div className="space-y-2">
                  <Label>Map Location Preview & Pin Adjustment</Label>
                  <div className="rounded-lg bg-emerald-500/10 p-3 text-xs text-emerald-800 border border-emerald-500/20 font-medium flex items-center gap-1.5 mb-2">
                    <CheckCircle className="h-4 w-4 shrink-0" /> Verified coordinates resolved. Drag marker pin to adjust park point.
                  </div>
                  <div 
                    data-lenis-prevent
                    className="h-60 w-full overflow-hidden rounded-xl border border-border bg-muted/20 relative"
                  >
                    <MapMap
                      center={[newLoc.longitude, newLoc.latitude]}
                      zoom={14}
                      theme="dark"
                    >
                      <MapControls />
                      <MapMarker
                        longitude={newLoc.longitude}
                        latitude={newLoc.latitude}
                        draggable={true}
                        onDragEnd={(lngLat) => {
                          setNewLoc(prev => ({
                            ...prev,
                            longitude: lngLat.lng,
                            latitude: lngLat.lat,
                          }));
                        }}
                      >
                        <MarkerContent>
                          <div className="bg-primary size-5 rounded-full border-2 border-white shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center text-[10px] font-bold text-cream">
                            L
                          </div>
                        </MarkerContent>
                      </MapMarker>
                    </MapMap>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-mono">
                    Coords: Lat {newLoc.latitude.toFixed(6)}, Lng {newLoc.longitude.toFixed(6)}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="loc-notes">Public Notes</Label>
                <Textarea
                  id="loc-notes"
                  value={newLoc.notes}
                  onChange={(e) => setNewLoc(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="e.g. Serving Yum Yum chicken special today!"
                />
              </div>
              <Button type="submit" className="h-10 uppercase tracking-widest font-semibold">Publish Location</Button>
            </form>

            {/* Locations List */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="p-6 border-b border-border">
                <h3 className="font-heading text-xl font-bold uppercase">Upcoming Stops</h3>
              </div>
              <div className="divide-y divide-border">
                {locations.map((loc) => (
                  <div key={loc.id} className="p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <p className="font-heading text-lg font-semibold">{loc.venue}</p>
                      {loc.address && <p className="text-sm text-muted-foreground">{loc.address}</p>}
                      <p className="text-xs font-mono text-primary uppercase">
                        {new Date(loc.date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} • {loc.startTime} — {loc.endTime}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteLoc(loc.id)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors align-self-start sm:align-self-center"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CATERING TAB */}
        {activeTab === "catering" && (
          <div className="space-y-6">
            {/* Catering Sub-Navigation */}
            <div className="flex flex-wrap border-b border-border bg-card rounded-t-xl">
              {[
                { id: "leads", label: "Leads" },
                { id: "packages", label: "Packages" },
                { id: "eventTypes", label: "Event Types" },
                { id: "faqs", label: "FAQs" },
                { id: "gallery", label: "Gallery" },
                { id: "testimonials", label: "Testimonials" },
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setCateringSubTab(sub.id as any)}
                  className={`px-4 py-3 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-all ${
                    cateringSubTab === sub.id
                      ? "border-primary text-primary bg-primary/5"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* LEADS SUB-TAB */}
            {cateringSubTab === "leads" && (
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h3 className="font-heading text-xl font-bold uppercase">Catering Leads</h3>
                </div>
                <div className="divide-y divide-border">
                  {initialCatering.length === 0 ? (
                    <div className="p-6 text-center text-muted-foreground text-sm">No catering inquiries yet.</div>
                  ) : (
                    initialCatering.map((req) => (
                      <div key={req.id} className="p-6 space-y-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <div className="space-y-0.5">
                            <h4 className="font-heading text-lg font-semibold uppercase">{req.eventType}</h4>
                            <p className="text-sm text-muted-foreground">Requested by {req.name} ({req.email} • {req.phone})</p>
                          </div>
                          <select
                            value={req.status}
                            onChange={(e) => handleCateringChange(req.id, e.target.value)}
                            className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus-visible:outline-none"
                          >
                            <option value="NEW">NEW</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="QUOTE_SENT">QUOTE SENT</option>
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="COMPLETED">COMPLETED</option>
                          </select>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-3 text-xs font-mono text-muted-foreground">
                          <p>Date: {new Date(req.date).toLocaleDateString()}</p>
                          <p>Guests: {req.guestCount}</p>
                          <p>Location: {req.location}</p>
                        </div>
                        {req.message && (
                          <div className="rounded-lg bg-muted p-3 text-sm text-foreground">
                            {req.message}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* PACKAGES SUB-TAB */}
            {cateringSubTab === "packages" && (
              <div className="space-y-6">
                <form onSubmit={handleCreatePackage} className="rounded-xl border border-border bg-card p-6 space-y-4">
                  <h3 className="font-heading text-xl font-bold uppercase">Add Catering Package</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="pkg-name">Package Name</Label>
                      <Input
                        id="pkg-name"
                        value={newPackage.name}
                        onChange={(e) => setNewPackage(prev => ({ ...prev, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, "-") }))}
                        placeholder="e.g. Backyard Feast"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pkg-price">Starting Price ($ / guest)</Label>
                      <Input
                        id="pkg-price"
                        type="number"
                        step="0.01"
                        value={newPackage.startingPrice}
                        onChange={(e) => setNewPackage(prev => ({ ...prev, startingPrice: e.target.value }))}
                        placeholder="e.g. 35.00"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pkg-guests">Minimum Guests</Label>
                      <Input
                        id="pkg-guests"
                        type="number"
                        value={newPackage.minGuests}
                        onChange={(e) => setNewPackage(prev => ({ ...prev, minGuests: e.target.value }))}
                        placeholder="e.g. 15"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pkg-image">Image URL</Label>
                      <Input
                        id="pkg-image"
                        value={newPackage.imageUrl}
                        onChange={(e) => setNewPackage(prev => ({ ...prev, imageUrl: e.target.value }))}
                        placeholder="https://..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pkg-order">Display Order</Label>
                      <Input
                        id="pkg-order"
                        type="number"
                        value={newPackage.displayOrder}
                        onChange={(e) => setNewPackage(prev => ({ ...prev, displayOrder: e.target.value }))}
                      />
                    </div>
                    <div className="flex items-center gap-6 pt-8">
                      <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newPackage.priceVisible}
                          onChange={(e) => setNewPackage(prev => ({ ...prev, priceVisible: e.target.checked }))}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        Price Visible
                      </label>
                      <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newPackage.featured}
                          onChange={(e) => setNewPackage(prev => ({ ...prev, featured: e.target.checked }))}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        Featured Status
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pkg-items">Menu Items (comma separated)</Label>
                    <Input
                      id="pkg-items"
                      value={newPackage.menuItems}
                      onChange={(e) => setNewPackage(prev => ({ ...prev, menuItems: e.target.value }))}
                      placeholder="e.g. 2 Proteins, Fried Rice, Vegetables, Yum Yum sauce"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pkg-desc">Description</Label>
                    <Textarea
                      id="pkg-desc"
                      value={newPackage.description}
                      onChange={(e) => setNewPackage(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Summary of experience..."
                      required
                    />
                  </div>
                  <Button type="submit" className="h-10">Add Package</Button>
                </form>

                <div className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <h3 className="font-heading text-xl font-bold uppercase">Catering Packages</h3>
                  </div>
                  <div className="divide-y divide-border">
                    {packages.map((pkg) => (
                      <div key={pkg.id} className="p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-1">
                          <p className="font-heading text-lg font-semibold">{pkg.name}</p>
                          <p className="text-xs font-mono text-muted-foreground uppercase">
                            Price: {pkg.priceVisible ? `$${pkg.startingPrice}/guest` : "Hidden"} • Min Guests: {pkg.minGuests} • Order: {pkg.displayOrder}
                          </p>
                          <p className="text-sm text-muted-foreground">{pkg.description}</p>
                        </div>
                        <button
                          onClick={() => handleDeletePackage(pkg.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* EVENT TYPES SUB-TAB */}
            {cateringSubTab === "eventTypes" && (
              <div className="space-y-6">
                <form onSubmit={handleCreateEventType} className="rounded-xl border border-border bg-card p-6 space-y-4">
                  <h3 className="font-heading text-xl font-bold uppercase">Add Event Type</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="et-name">Event Type Name</Label>
                      <Input
                        id="et-name"
                        value={newEventType.name}
                        onChange={(e) => setNewEventType(prev => ({ ...prev, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, "-") }))}
                        placeholder="e.g. Graduation"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="et-image">Image URL</Label>
                      <Input
                        id="et-image"
                        value={newEventType.imageUrl}
                        onChange={(e) => setNewEventType(prev => ({ ...prev, imageUrl: e.target.value }))}
                        placeholder="https://..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="et-order">Display Order</Label>
                      <Input
                        id="et-order"
                        type="number"
                        value={newEventType.displayOrder}
                        onChange={(e) => setNewEventType(prev => ({ ...prev, displayOrder: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="et-desc">Description</Label>
                    <Textarea
                      id="et-desc"
                      value={newEventType.description}
                      onChange={(e) => setNewEventType(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe what we offer for this event type..."
                      required
                    />
                  </div>
                  <Button type="submit" className="h-10">Add Event Type</Button>
                </form>

                <div className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <h3 className="font-heading text-xl font-bold uppercase">Current Event Types</h3>
                  </div>
                  <div className="divide-y divide-border">
                    {eventTypes.map((et) => (
                      <div key={et.id} className="p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-1">
                          <p className="font-heading text-lg font-semibold">{et.name}</p>
                          <p className="text-xs font-mono text-muted-foreground uppercase">Order: {et.displayOrder}</p>
                          <p className="text-sm text-muted-foreground">{et.description}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteEventType(et.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* FAQS SUB-TAB */}
            {cateringSubTab === "faqs" && (
              <div className="space-y-6">
                <form onSubmit={handleCreateFaq} className="rounded-xl border border-border bg-card p-6 space-y-4">
                  <h3 className="font-heading text-xl font-bold uppercase">Add FAQ</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="faq-q">Question</Label>
                      <Input
                        id="faq-q"
                        value={newFaq.question}
                        onChange={(e) => setNewFaq(prev => ({ ...prev, question: e.target.value }))}
                        placeholder="e.g. Do you travel outside Pittsburgh?"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="faq-order">Display Order</Label>
                      <Input
                        id="faq-order"
                        type="number"
                        value={newFaq.displayOrder}
                        onChange={(e) => setNewFaq(prev => ({ ...prev, displayOrder: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="faq-a">Answer</Label>
                    <Textarea
                      id="faq-a"
                      value={newFaq.answer}
                      onChange={(e) => setNewFaq(prev => ({ ...prev, answer: e.target.value }))}
                      placeholder="Answer details..."
                      required
                    />
                  </div>
                  <Button type="submit" className="h-10">Add FAQ</Button>
                </form>

                <div className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <h3 className="font-heading text-xl font-bold uppercase">Current FAQs</h3>
                  </div>
                  <div className="divide-y divide-border">
                    {faqs.map((faq) => (
                      <div key={faq.id} className="p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-1">
                          <p className="font-heading text-base font-semibold">{faq.question}</p>
                          <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteFaq(faq.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* GALLERY SUB-TAB */}
            {cateringSubTab === "gallery" && (
              <div className="space-y-6">
                <form onSubmit={handleCreateGalleryItem} className="rounded-xl border border-border bg-card p-6 space-y-4">
                  <h3 className="font-heading text-xl font-bold uppercase">Add Gallery Image</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="gal-title">Title</Label>
                      <Input
                        id="gal-title"
                        value={newGalleryItem.title}
                        onChange={(e) => setNewGalleryItem(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g. Fire show griddle"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gal-hint">Subtitle / Category Hint</Label>
                      <Input
                        id="gal-hint"
                        value={newGalleryItem.hint}
                        onChange={(e) => setNewGalleryItem(prev => ({ ...prev, hint: e.target.value }))}
                        placeholder="e.g. Backyard Party"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gal-image">Image URL</Label>
                      <Input
                        id="gal-image"
                        value={newGalleryItem.imageUrl}
                        onChange={(e) => setNewGalleryItem(prev => ({ ...prev, imageUrl: e.target.value }))}
                        placeholder="https://..."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gal-order">Display Order</Label>
                      <Input
                        id="gal-order"
                        type="number"
                        value={newGalleryItem.displayOrder}
                        onChange={(e) => setNewGalleryItem(prev => ({ ...prev, displayOrder: e.target.value }))}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="h-10">Add Image</Button>
                </form>

                <div className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <h3 className="font-heading text-xl font-bold uppercase">Gallery Images</h3>
                  </div>
                  <div className="divide-y divide-border">
                    {galleryItems.map((gi) => (
                      <div key={gi.id} className="p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                          {gi.imageUrl && (
                            <div className="relative h-12 w-16 rounded overflow-hidden border border-border">
                              <img src={gi.imageUrl} alt={gi.title} className="object-cover h-full w-full" />
                            </div>
                          )}
                          <div>
                            <p className="font-heading text-base font-semibold">{gi.title}</p>
                            {gi.hint && <p className="text-xs text-muted-foreground uppercase">{gi.hint}</p>}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteGalleryItem(gi.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TESTIMONIALS SUB-TAB */}
            {cateringSubTab === "testimonials" && (
              <div className="space-y-6">
                <form onSubmit={handleCreateTestimonial} className="rounded-xl border border-border bg-card p-6 space-y-4">
                  <h3 className="font-heading text-xl font-bold uppercase">Add Testimonial</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="t-author">Author / Client Name</Label>
                      <Input
                        id="t-author"
                        value={newTestimonial.author}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, author: e.target.value }))}
                        placeholder="e.g. John D."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="t-role">Role / Event Type</Label>
                      <Input
                        id="t-role"
                        value={newTestimonial.role}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, role: e.target.value }))}
                        placeholder="e.g. Wedding Reception"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="t-image">Avatar Image URL</Label>
                      <Input
                        id="t-image"
                        value={newTestimonial.imageUrl}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, imageUrl: e.target.value }))}
                        placeholder="https://..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="t-rating">Rating (1-5)</Label>
                      <select
                        id="t-rating"
                        value={newTestimonial.rating}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, rating: e.target.value }))}
                        className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none"
                      >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="t-order">Display Order</Label>
                      <Input
                        id="t-order"
                        type="number"
                        value={newTestimonial.displayOrder}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, displayOrder: e.target.value }))}
                      />
                    </div>
                    <div className="flex items-center pt-8">
                      <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newTestimonial.featured}
                          onChange={(e) => setNewTestimonial(prev => ({ ...prev, featured: e.target.checked }))}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        Featured
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="t-quote">Quote / Review</Label>
                    <Textarea
                      id="t-quote"
                      value={newTestimonial.quote}
                      onChange={(e) => setNewTestimonial(prev => ({ ...prev, quote: e.target.value }))}
                      placeholder="What the client wrote..."
                      required
                    />
                  </div>
                  <Button type="submit" className="h-10">Add Testimonial</Button>
                </form>

                <div className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <h3 className="font-heading text-xl font-bold uppercase">Current Testimonials</h3>
                  </div>
                  <div className="divide-y divide-border">
                    {testimonials.map((t) => (
                      <div key={t.id} className="p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-1">
                          <p className="font-heading text-base font-semibold">{t.author}</p>
                          {t.role && <p className="text-xs text-muted-foreground uppercase">{t.role}</p>}
                          <p className="text-sm text-muted-foreground leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                        </div>
                        <button
                          onClick={() => handleDeleteTestimonial(t.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div className="rounded-xl border border-border bg-card p-6 space-y-6">
            <h3 className="font-heading text-xl font-bold uppercase">Global Operations Settings</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Contact Phone</Label>
                <Input
                  id="contact-phone"
                  value={settings.contactPhone}
                  onChange={(e) => setSettings((prev: any) => ({ ...prev, contactPhone: e.target.value }))}
                  onBlur={(e) => handleUpdateSettings("contactPhone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input
                  id="contact-email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings((prev: any) => ({ ...prev, contactEmail: e.target.value }))}
                  onBlur={(e) => handleUpdateSettings("contactEmail", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="announcement">Announcement Banner Text</Label>
                <Textarea
                  id="announcement"
                  value={settings.announcement || ""}
                  onChange={(e) => setSettings((prev: any) => ({ ...prev, announcement: e.target.value }))}
                  onBlur={(e) => handleUpdateSettings("announcement", e.target.value || null)}
                  placeholder="e.g. Free Yum Yum side with any order this Saturday!"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
