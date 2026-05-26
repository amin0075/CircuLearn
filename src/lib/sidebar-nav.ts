import type { LucideIcon } from "lucide-react";
import {
  BookOpenIcon,
  CalculatorIcon,
  CircleHelpIcon,
  CircuitBoardIcon,
  CpuIcon,
  FileTextIcon,
  GraduationCapIcon,
  LibraryIcon,
  ListIcon,
} from "lucide-react";

import { mainRoutes, ROUTES_URL } from "@src/routes";

export type SidebarNavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: { title: string; url: string }[];
};

const sectionIcons: Record<string, LucideIcon> = {
  "Basic Concepts": BookOpenIcon,
  "Boolean Algebra": CalculatorIcon,
  Gates: CpuIcon,
  "Final Step": GraduationCapIcon,
  "Additional Resources": LibraryIcon,
};

function routeToSubItem(route: { name: string; url: string }) {
  return { title: route.name, url: route.url };
}

export function buildSidebarNav(pathname: string): SidebarNavItem[] {
  const {
    introduction,
    basicConcepts,
    BooleanAlgebra,
    gates,
    finalStep,
    additionalResources,
  } = mainRoutes;

  const isSectionActive = (urls: string[]) =>
    urls.some((url) => pathname === url || pathname.startsWith(`${url}/`));

  return [
    {
      title: introduction.name,
      url: introduction.url,
      icon: FileTextIcon,
      isActive: pathname === introduction.url,
    },
    {
      title: "Simulator",
      url: ROUTES_URL.simulator,
      icon: CircuitBoardIcon,
      isActive:
        pathname === ROUTES_URL.simulator ||
        pathname.startsWith(`${ROUTES_URL.simulator}/`),
    },
    {
      title: "Basic Concepts",
      url: basicConcepts[0]?.url ?? "/basic-concepts",
      icon: sectionIcons["Basic Concepts"],
      isActive: isSectionActive(basicConcepts.map((r) => r.url)),
      items: basicConcepts.map(routeToSubItem),
    },
    {
      title: "Boolean Algebra",
      url: BooleanAlgebra[0]?.url ?? "/boolean-algebra",
      icon: sectionIcons["Boolean Algebra"],
      isActive: isSectionActive(BooleanAlgebra.map((r) => r.url)),
      items: BooleanAlgebra.map(routeToSubItem),
    },
    {
      title: "Gates",
      url: gates[0]?.url ?? "/gates",
      icon: sectionIcons.Gates,
      isActive: isSectionActive(gates.map((r) => r.url)),
      items: gates.map(routeToSubItem),
    },
    {
      title: "Final Step",
      url: finalStep[0]?.url ?? "/final-step",
      icon: sectionIcons["Final Step"],
      isActive: isSectionActive(finalStep.map((r) => r.url)),
      items: finalStep.map(routeToSubItem),
    },
    {
      title: "Additional Resources",
      url: additionalResources[0]?.url ?? "/additional-resources",
      icon: sectionIcons["Additional Resources"],
      isActive: isSectionActive(additionalResources.map((r) => r.url)),
      items: additionalResources.map(routeToSubItem),
    },
  ];
}

export const sidebarFooterLinks = [
  { title: "Glossary", url: "/additional-resources/glossary", icon: ListIcon },
  { title: "FAQ", url: "/additional-resources/faq", icon: CircleHelpIcon },
  { title: "References", url: "/additional-resources/references", icon: BookOpenIcon },
] as const;
