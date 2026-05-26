"use client";

import { ReactNode } from "react";

import { AppSidebar } from "@src/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@src/components/ui/sidebar";
import { TooltipProvider } from "@src/components/ui/tooltip";
import CookiePolicyModal from "@src/components/global/CookiePolicyModal";
import { useHydrated } from "@src/hooks/useHydrated";
import Footer from "@src/layout/Footer";
import SiteHeader from "@src/layout/SiteHeader";
import { useUserPreferencesStore } from "@src/stores/user-preferences";

interface LayoutProps {
  children?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const isHydrated = useHydrated();
  const hasAcceptedCookies = useUserPreferencesStore(
    (state) => state.hasAcceptedCookies,
  );
  const hasSeenUserGuide = useUserPreferencesStore(
    (state) => state.hasSeenUserGuide,
  );
  const isCookieModalOpen = hasSeenUserGuide && !hasAcceptedCookies;

  if (!isHydrated) {
    return null;
  }

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex min-h-svh flex-col">
          <SiteHeader />
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
            <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 md:p-6">
              {children}
            </div>
            <Footer />
          </div>
        </SidebarInset>
      </SidebarProvider>
      {isCookieModalOpen && (
        <CookiePolicyModal
          isModalOpen={isCookieModalOpen}
          setIsModalOpen={() => {}}
        />
      )}
    </TooltipProvider>
  );
}
