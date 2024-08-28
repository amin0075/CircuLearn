import React, { useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import Switch from "@src/components/Switch";

interface InputNodeData {
  label: string;
  value?: number;
}

const InputNode: React.FC<NodeProps<InputNodeData>> = ({ id, data }) => {
  const [value, setValue] = useState(data.value || 0);

  const toggleSwitch = () => {
    const newValue = value === 0 ? 1 : 0;
    setValue(newValue);
    data.value = newValue;
  };

  return (
    <div className="p-2 dark:bg-backgroundDark bg-backgroundLight border border-black dark:border-white dark:text-white text-black rounded shadow">
      <Handle type="source" position={Position.Right} id="a" />
      <div className="flex items-center space-x-2">
        <Switch checked={value === 1} onChange={toggleSwitch} />
        <span className="font-semibold">{data.label}</span>
        <span className="text-green-500 text-lg">{value}</span>
      </div>
    </div>
  );
};

export default InputNode;
