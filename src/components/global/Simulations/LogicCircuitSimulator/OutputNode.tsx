import React from "react";
import { Handle, Position, NodeProps, Node } from "@xyflow/react";

import { Typography } from "@src/components/ui/typography";
import { LightBulbOff, LightBulbOn } from "@src/assets/light-bulb-icons";

import { CircuitNodeShell, SignalValueBadge } from "./CircuitNodeShell";

interface OutputNodeData extends Record<string, unknown> {
  label: string;
  value?: number;
}

type OutputNodeType = Node<OutputNodeData, "outputNode">;

const OutputNode: React.FC<NodeProps<OutputNodeType>> = ({
  data,
  selected,
}) => {
  const isOn = data.value === 1;

  return (
    <CircuitNodeShell selected={selected}>
      <Handle type="target" position={Position.Left} id="a" />
      <div className="flex items-center gap-2">
        {isOn ? (
          <LightBulbOn className="size-10 shrink-0 text-amber-500" />
        ) : (
          <LightBulbOff className="size-10 shrink-0 text-muted-foreground" />
        )}
        <Typography variant="label-sm">{data.label}</Typography>
        <SignalValueBadge value={data.value as number | undefined} />
      </div>
    </CircuitNodeShell>
  );
};

export default OutputNode;
