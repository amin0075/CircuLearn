"use client";

import NavLinks from "@src/layout/Navbar/NavLinks";
import { ThemeToggle } from "@src/components/theme-toggle";
import { SidebarTrigger } from "@src/components/ui/sidebar";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-4 shadow-sm backdrop-blur-sm supports-backdrop-filter:bg-background/95">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <div
          aria-hidden
          className="h-6 w-px shrink-0 bg-border"
        />
      </div>
      <div className="hidden flex-1 md:flex">
        <NavLinks />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
}
