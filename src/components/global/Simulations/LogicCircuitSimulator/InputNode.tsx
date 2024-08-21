import React, { useState, useEffect } from "react";
import { Handle, Position, useUpdateNodeInternals } from "react-flow-renderer";
import Switch from "@src/components/Switch"; // Import the switch component

const InputNode = ({ id, data }: any) => {
  const [value, setValue] = useState(data.value);
  const updateNodeInternals = useUpdateNodeInternals();

  const toggleSwitch = () => {
    const newValue = value === 0 ? 1 : 0;
    setValue(newValue);
    data.value = newValue; // Update data value
    updateNodeInternals(id); // Update the node to reflect changes
  };

  useEffect(() => {
    data.value = value; // Ensure the value is in sync with the node data
    updateNodeInternals(id); // Recalculate connections when value changes
  }, [value, id, updateNodeInternals, data]);

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
