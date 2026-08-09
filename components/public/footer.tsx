import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 w-full">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="font-heading text-base font-semibold tracking-wide text-foreground">HIBACHI LOU</p>
            <p className="font-mono text-xs text-muted-foreground">PITTSBURGH, PA</p>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm font-medium text-foreground">
            <Link href="/menu" className="hover:text-primary">MENU</Link>
            <Link href="/schedule" className="hover:text-primary">LOCATIONS</Link>
            <Link href="/catering" className="hover:text-primary">CATERING</Link>
            <Link href="/contact" className="hover:text-primary">ABOUT</Link>
            <Link href="/contact" className="hover:text-primary">BOOK LOU →</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
