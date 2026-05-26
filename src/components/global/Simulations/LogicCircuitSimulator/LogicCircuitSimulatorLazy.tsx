"use client";

import type { ComponentProps } from "react";
import dynamic from "next/dynamic";

import { Spinner } from "@src/components/ui/spinner";
import { cn } from "@src/lib/utils";

import "@xyflow/react/dist/style.css";

function SimulatorSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex min-h-[min(640px,calc(100dvh-11rem))] flex-1 items-center justify-center rounded-lg border border-border bg-muted/40",
        className,
      )}
      aria-busy="true"
      aria-label="Loading circuit simulator"
    >
      <Spinner className="size-8" />
    </div>
  );
}

const Simulator = dynamic(() => import("./index"), {
  ssr: false,
  loading: () => <SimulatorSkeleton />,
});

export type LogicCircuitSimulatorProps = ComponentProps<typeof Simulator>;

export default function LogicCircuitSimulatorLazy(
  props: LogicCircuitSimulatorProps,
) {
  return <Simulator {...props} />;
}
