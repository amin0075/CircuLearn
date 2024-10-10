import React, { useState, useEffect } from "react";
import { Handle, Position, NodeProps, useReactFlow } from "react-flow-renderer";
import { useThemeStore } from "@src/zustand_stores/Theme";
import { borderColor } from "@src/utils/colorUtils";
import Switch from "@src/components/Switch";
import Typography from "@src/components/Typography";

interface InputNodeData {
  label: string;
  value?: number;
  isDynamic?: boolean;
}

const InputNode: React.FC<NodeProps<InputNodeData>> = ({
  id,
  data,
  selected,
}) => {
  const { primaryColor } = useThemeStore();
  const reactFlowInstance = useReactFlow();
  const [value, setValue] = useState(data.value || 0);

  // Function to propagate the value change to the circuit and connections
  const propagateValue = (newValue: number) => {
    setValue(newValue);
    data.value = newValue;

    // Update the node in the global state to re-evaluate the circuit
    reactFlowInstance.setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, value: newValue } };
        }
        return node;
      })
    );
  };

  // Handle switch toggle for dynamic inputs
  const toggleSwitch = () => {
    if (data.isDynamic) {
      const newValue = value === 0 ? 1 : 0;
      propagateValue(newValue);
    }
  };

  // Propagate the initial value when the component mounts
  useEffect(() => {
    propagateValue(value);
  }, []);

  return (
    <div
      className={`p-2 dark:bg-backgroundDark bg-backgroundLight border rounded shadow ${
        selected ? borderColor(primaryColor) : "border-black dark:border-white"
      }`}
    >
      <Handle type="source" position={Position.Right} id="a" />
      <div className="flex items-center gap-2">
        {data.isDynamic ? (
          <Switch
            aria-label="Toggle switch"
            checked={value === 1}
            onChange={toggleSwitch}
          />
        ) : (
          <></>
        )}
        <Typography variant="body2">{data.label}</Typography>
        <Typography
          variant="body2"
          className={`${data.value ? "text-green-500 dark:text-green-500" : "text-red-500 dark:text-red-500"} dark:bg-white p-1 px-2 bg-black rounded-md`}
        >
          {data.value}
        </Typography>
      </div>
    </div>
  );
};

export default InputNode;
