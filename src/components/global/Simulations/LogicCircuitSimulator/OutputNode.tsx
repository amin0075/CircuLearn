import React from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useThemeStore } from "@src/zustand_stores/Theme";
import { borderColor } from "@src/utils/colorUtils";
import { LightBulbOn, LightBulbOff } from "@src/assets/icons";
import Typography from "@src/components/Typography";

const OutputNode: React.FC<NodeProps> = ({ data, selected }) => {
  const isOn = data.value === 1;
  const { primaryColor } = useThemeStore();

  return (
    <div
      className={`p-2 dark:bg-backgroundDark bg-backgroundLight border rounded shadow ${selected ? borderColor(primaryColor) : "border-black dark:border-white"}`}
    >
      <Handle type="target" position={Position.Left} id="a" />
      <div className="flex items-center space-x-2">
        {isOn ? (
          <LightBulbOn className="w-10 h-10 text-yellow-500" />
        ) : (
          <LightBulbOff className="w-10 h-10 text-gray-500" />
        )}
        <Typography variant="body2">{data.label}</Typography>
        <Typography
          variant="body2"
          className={`${isOn ? "text-green-500 dark:text-green-500" : "text-red-500 dark:text-red-500"} dark:bg-white p-1 px-2 bg-black rounded-md`}
        >
          {data.value}
        </Typography>
      </div>
    </div>
  );
};

export default OutputNode;
