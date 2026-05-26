"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@src/components/ui/button";
import { navRoutes } from "@src/routes";
import { cn } from "@src/lib/utils";
import { useUserPreferencesStore } from "@src/stores/user-preferences";

import UserGuide from "./UserGuide";

interface NavLinksProps {
  usedInNavbar?: boolean;
  className?: string;
}

export default function NavLinks({
  usedInNavbar = true,
  className,
}: NavLinksProps) {
  const pathname = usePathname();
  const [userGuideOpen, setUserGuideOpen] = useState(false);
  const hasSeenUserGuide = useUserPreferencesStore(
    (state) => state.hasSeenUserGuide,
  );
  const isModalOpen = !hasSeenUserGuide || userGuideOpen;

  if (!usedInNavbar) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {navRoutes.map((route) => (
        <Button
          key={route.url}
          variant="ghost"
          size="sm"
          asChild
          className={cn(
            pathname === route.url && "bg-accent text-accent-foreground",
          )}
        >
          <Link href={route.url} className="capitalize">
            {route.name}
          </Link>
        </Button>
      ))}
      <Button variant="ghost" size="sm" onClick={() => setUserGuideOpen(true)}>
        User Guide
      </Button>
      <UserGuide isModalOpen={isModalOpen} setIsModalOpen={setUserGuideOpen} />
    </div>
  );
}
