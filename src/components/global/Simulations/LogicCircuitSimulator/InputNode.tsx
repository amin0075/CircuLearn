import {
  Handle,
  Position,
  type Node,
  type NodeProps,
} from "@xyflow/react";

import { Switch } from "@src/components/ui/switch";
import { Typography } from "@src/components/ui/typography";

import {
  useCircuitEvaluation,
  useCircuitNodes,
} from "./circuit-evaluation-context";
import {
  CircuitNodeShell,
  SignalValueBadge,
} from "./CircuitNodeShell";

interface InputNodeData extends Record<string, unknown> {
  label: string;
  value?: number;
  isDynamic?: boolean;
}

type InputNodeType = Node<InputNodeData, "inputNode">;

const InputNode = ({ id, data, selected }: NodeProps<InputNodeType>) => {
  const runEvaluation = useCircuitEvaluation();
  const { updateNodeData } = useCircuitNodes();
  const value = typeof data.value === "number" ? data.value : 0;

  const propagateValue = (newValue: number) => {
    updateNodeData(id, { value: newValue });
    queueMicrotask(() => runEvaluation());
  };

  return (
    <CircuitNodeShell selected={selected}>
      <Handle type="source" position={Position.Right} id="a" />
      <div className="flex items-center gap-2">
        {data.isDynamic ? (
          <Switch
            aria-label="Toggle input value"
            checked={value === 1}
            onCheckedChange={(checked) => propagateValue(checked ? 1 : 0)}
          />
        ) : null}
        <Typography variant="label-sm">{data.label}</Typography>
        <SignalValueBadge value={value} />
      </div>
    </CircuitNodeShell>
  );
};

export default InputNode;
