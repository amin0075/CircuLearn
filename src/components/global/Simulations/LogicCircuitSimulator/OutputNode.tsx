import React from "react";
import { Handle, Position } from "react-flow-renderer";
import { LightBulbOn, LightBulbOff } from "@src/assets/icons"; // Import both icons

const OutputNode = ({ data }: any) => {
  const isOn = data.value === 1;

  return (
    <div className="p-2 dark:bg-backgroundDark bg-backgroundLight border border-black dark:border-white dark:text-white text-black rounded shadow">
      <Handle type="target" position={Position.Left} id="a" />
      <div className="flex items-center space-x-2">
        {isOn ? (
          <LightBulbOn className="w-6 h-6 text-yellow-500" />
        ) : (
          <LightBulbOff className="w-6 h-6 text-gray-500" />
        )}
        <span className="font-semibold">{data.label}</span>
        <span className={`text-lg ${isOn ? "text-green-500" : "text-red-500"}`}>
          {data.value}
        </span>
      </div>
    </div>
  );
};

export default OutputNode;
