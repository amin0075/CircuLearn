"use client";

import * as React from "react";
import {
  ChevronRightIcon,
  CircleDotIcon,
  LightbulbIcon,
  MinusCircleIcon,
  ToggleLeftIcon,
} from "lucide-react";

import { Button } from "@src/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@src/components/ui/collapsible";
import { Typography } from "@src/components/ui/typography";
import type { CircuitNodeType, InputLevelId } from "@src/lib/circuit/types";
import { LOGIC_GATES, type LogicGateId } from "@src/lib/gates/registry";
import { cn } from "@src/lib/utils";

interface SimulatorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  addNode: (
    nodeType: CircuitNodeType,
    gateType?: LogicGateId | InputLevelId,
  ) => void;
}

type SectionKey = "inputs" | "gates" | "outputs";

const elementButtonClass =
  "h-8 w-full justify-start gap-2 px-2.5 text-left font-normal";

function ElementButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={elementButtonClass}
      onClick={onClick}
    >
      {Icon ? (
        <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      ) : null}
      <Typography as="span" variant="body-sm">
        {label}
      </Typography>
    </Button>
  );
}

function ElementsSection({
  title,
  sectionKey,
  open,
  onOpenChange,
  children,
}: {
  title: string;
  sectionKey: SectionKey;
  open: boolean;
  onOpenChange: (section: SectionKey, open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <Collapsible
      open={open}
      onOpenChange={(nextOpen) => onOpenChange(sectionKey, nextOpen)}
      className="rounded-lg border border-border/60 bg-muted/20"
    >
      <CollapsibleTrigger
        className={cn(
          "flex w-full items-center justify-between px-3 py-2.5 text-left transition-colors",
          "hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
        )}
      >
        <Typography
          variant="label-sm"
          fontWeight="semibold"
          className="tracking-wide text-muted-foreground uppercase"
        >
          {title}
        </Typography>
        <ChevronRightIcon
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-90",
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-1.5 px-2 pb-2.5">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default function SimulatorDrawer({
  isOpen,
  onClose,
  addNode,
}: SimulatorDrawerProps) {
  const [openSections, setOpenSections] = React.useState<
    Record<SectionKey, boolean>
  >({
    inputs: true,
    gates: true,
    outputs: true,
  });

  const setSectionOpen = (section: SectionKey, open: boolean) => {
    setOpenSections((prev) => ({ ...prev, [section]: open }));
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-x-0 top-14 bottom-0 z-20 bg-black/50 transition-opacity md:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden
      />
      <aside
        aria-label="Circuit elements"
        className={cn(
          "flex min-h-0 flex-col border-r border-border bg-card",
          "fixed top-14 bottom-0 left-0 z-30 w-[min(100%,16rem)] shadow-lg transition-transform duration-200 ease-out",
          "md:relative md:top-auto md:bottom-auto md:z-auto md:h-full md:w-64 md:max-w-64 md:shrink-0 md:translate-x-0 md:shadow-none md:rounded-l-lg",
          isOpen
            ? "translate-x-0"
            : "pointer-events-none -translate-x-full md:pointer-events-auto md:translate-x-0",
        )}
      >
        <div className="shrink-0 border-b border-border/60 px-4 py-3.5">
          <Typography variant="heading-sm">Elements</Typography>
          <Typography variant="body-xs" className="mt-1 text-muted-foreground">
            Tap a component to add it to the canvas center.
          </Typography>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain touch-pan-y p-3">
          <div className="flex flex-col gap-2">
            <ElementsSection
              title="Inputs"
              sectionKey="inputs"
              open={openSections.inputs}
              onOpenChange={setSectionOpen}
            >
              <ElementButton
                icon={ToggleLeftIcon}
                label="Dynamic input"
                onClick={() => addNode("inputNode")}
              />
              <ElementButton
                icon={MinusCircleIcon}
                label="Low (0)"
                onClick={() => addNode("inputNode", "low")}
              />
              <ElementButton
                icon={CircleDotIcon}
                label="High (1)"
                onClick={() => addNode("inputNode", "high")}
              />
            </ElementsSection>

            <ElementsSection
              title="Gates"
              sectionKey="gates"
              open={openSections.gates}
              onOpenChange={setSectionOpen}
            >
              {LOGIC_GATES.map(({ id, label, Icon }) => (
                <ElementButton
                  key={id}
                  icon={Icon}
                  label={label}
                  onClick={() => addNode("gateNode", id)}
                />
              ))}
            </ElementsSection>

            <ElementsSection
              title="Outputs"
              sectionKey="outputs"
              open={openSections.outputs}
              onOpenChange={setSectionOpen}
            >
              <ElementButton
                icon={LightbulbIcon}
                label="Output (lamp)"
                onClick={() => addNode("outputNode")}
              />
            </ElementsSection>
          </div>
        </div>
      </aside>
    </>
  );
}
