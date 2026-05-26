import React from "react";
import { Handle, Position, NodeProps, Node } from "@xyflow/react";

import { Typography } from "@src/components/ui/typography";
import type { GateNodeData } from "@src/lib/circuit/types";
import { GateIcon } from "@src/lib/gates/gate-icon";

import { CircuitNodeShell } from "./CircuitNodeShell";

type GateNodeType = Node<GateNodeData, "gateNode">;

const GateNode: React.FC<NodeProps<GateNodeType>> = ({ data, selected }) => {
  return (
    <CircuitNodeShell selected={selected}>
      {data.gateType !== "not" && (
        <>
          <Handle
            type="target"
            position={Position.Left}
            id="input1"
            style={{ top: "30%" }}
          />
          <Handle
            type="target"
            position={Position.Left}
            id="input2"
            style={{ top: "70%" }}
          />
        </>
      )}
      {data.gateType === "not" && (
        <Handle
          type="target"
          position={Position.Left}
          id="input"
          style={{ top: "50%" }}
        />
      )}
      <div className="flex items-center gap-2">
        <GateIcon
          gateId={data.gateType}
          className="size-8 shrink-0 text-foreground"
        />
        <Typography as="span" variant="label-sm">
          {data.gateType.toUpperCase()}{" "}
          <span className="text-muted-foreground">Gate</span>
        </Typography>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ top: "50%" }}
      />
    </CircuitNodeShell>
  );
};

export default GateNode;
