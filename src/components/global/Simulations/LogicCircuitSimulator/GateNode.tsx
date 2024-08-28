import React from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import {
  LogicGateAnd,
  LogicGateOr,
  LogicGateNot,
  LogicGateNand,
  LogicGateNor,
  LogicGateXor,
  LogicGateXnor,
} from "@src/assets/icons";

interface GateNodeData {
  gateType: string;
  value?: number;
}

const GateNode: React.FC<NodeProps<GateNodeData>> = ({ data }) => {
  const renderIcon = () => {
    switch (data.gateType) {
      case "and":
        return <LogicGateAnd className="w-8 h-8" />;
      case "or":
        return <LogicGateOr className="w-8 h-8" />;
      case "not":
        return <LogicGateNot className="w-8 h-8" />;
      case "nand":
        return <LogicGateNand className="w-8 h-8" />;
      case "nor":
        return <LogicGateNor className="w-8 h-8" />;
      case "xor":
        return <LogicGateXor className="w-8 h-8" />;
      case "xnor":
        return <LogicGateXnor className="w-8 h-8" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-2 border rounded shadow">
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
      <div className="flex items-center space-x-2 text-black">
        {renderIcon()}
        <span>{data.gateType.toUpperCase()} Gate</span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ top: "50%" }}
      />
    </div>
  );
};

export default GateNode;
