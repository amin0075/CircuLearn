import React, { useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useThemeStore } from "@src/zustand_stores/Theme";
import { borderColor } from "@src/utils/colorUtils";
import Switch from "@src/components/Switch";
import Typography from "@src/components/Typography";

interface InputNodeData {
  label: string;
  value?: number;
}

const InputNode: React.FC<NodeProps<InputNodeData>> = ({
  id,
  data,
  selected,
}) => {
  const [value, setValue] = useState(data.value || 0);
  const { primaryColor } = useThemeStore();

  const toggleSwitch = () => {
    const newValue = value === 0 ? 1 : 0;
    setValue(newValue);
    data.value = newValue;
  };

  return (
    <div
      className={`p-2 dark:bg-backgroundDark bg-backgroundLight border rounded shadow ${selected ? borderColor(primaryColor) : "border-black dark:border-white"}`}
    >
      <Handle type="source" position={Position.Right} id="a" />
      <div className="flex items-center gap-2">
        <Switch
          aria-label="Toggle switch"
          checked={value === 1}
          onChange={toggleSwitch}
        />
        <Typography variant="body2">{data.label}</Typography>
        <Typography
          variant="body2"
          className="dark:bg-white p-1 px-2 bg-black rounded-md text-white dark:text-black"
        >
          {value}
        </Typography>
      </div>
    </div>
  );
};

export default InputNode;
