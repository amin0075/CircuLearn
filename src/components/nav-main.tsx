"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRightIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@src/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@src/components/ui/sidebar";
import type { SidebarNavItem } from "@src/lib/sidebar-nav";
import { Typography } from "@/components/ui/typography";
import { cn } from "@src/lib/utils";

export function NavMain({ items }: { items: SidebarNavItem[] }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const Icon = item.icon;
          const hasChildren = item.items && item.items.length > 0;

          if (!hasChildren) {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                >
                  <Link href={item.url}>
                    {Icon ? <Icon /> : null}
                    <Typography as="span" variant="label-sm">
                      {item.title}
                    </Typography>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          const defaultOpen =
            item.isActive ??
            item.items?.some(
              (sub) =>
                pathname === sub.url || pathname.startsWith(`${sub.url}/`),
            );

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={defaultOpen}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {Icon ? <Icon /> : null}
                    <Typography as="span" variant="label-sm">
                      {item.title}
                    </Typography>
                    <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const isSubActive =
                        pathname === subItem.url ||
                        pathname.startsWith(`${subItem.url}/`);
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild isActive={isSubActive}>
                            <Link href={subItem.url}>
                              <Typography as="span" variant="label-sm">
                                {subItem.title}
                              </Typography>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
