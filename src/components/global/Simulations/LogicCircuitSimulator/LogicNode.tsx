// src/components/LogicNode.tsx
import React from "react";
import { Handle, Position } from "react-flow-renderer";

const LogicNode = ({ data }: any) => {
  return (
    <div className="bg-gray-700 text-white p-2 rounded shadow-md text-center">
      <Handle
        type="target"
        position={Position.Left}
        className="bg-blue-400 w-3 h-3"
      />
      <div>{data.label}</div>
      <Handle
        type="source"
        position={Position.Right}
        className="bg-blue-400 w-3 h-3"
      />
    </div>
  );
};

export default LogicNode;
