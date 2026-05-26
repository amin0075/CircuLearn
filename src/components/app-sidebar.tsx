"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavMain } from "@src/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@src/components/ui/sidebar";
import { buildSidebarNav } from "@src/lib/sidebar-nav";
import { cn } from "@src/lib/utils";
import { ROUTES_URL } from "@src/routes";

const logoClassName =
  "h-14 w-auto max-w-full rounded-none group-data-[collapsible=icon]:h-10";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const navItems = buildSidebarNav(pathname);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="px-3 py-4">
        <Link
          href={ROUTES_URL.introduction}
          aria-label="CircuLearn"
          className="flex w-full items-center justify-start rounded-none outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
        >
          <Image
            src="/images/Logo-black.svg"
            alt=""
            aria-hidden
            width={200}
            height={56}
            className={cn(logoClassName, "dark:hidden")}
            style={{ width: "auto", height: "auto" }}
            priority
          />
          <Image
            src="/images/Logo-white.svg"
            alt=""
            aria-hidden
            width={200}
            height={56}
            className={cn(logoClassName, "hidden dark:block")}
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
