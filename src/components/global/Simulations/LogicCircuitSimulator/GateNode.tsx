import React, { useEffect, useState } from "react";
import { Handle, Position, useUpdateNodeInternals } from "react-flow-renderer";
import * as logic from "@src/utils/gateLogic"; // Import your gate logic
import {
  LogicGateAnd,
  LogicGateOr,
  LogicGateNot,
  LogicGateNand,
  LogicGateNor,
  LogicGateXor,
  LogicGateXnor,
} from "@src/assets/icons"; // Import icons

interface GateNodeProps {
  id: string;
  data: {
    gateType: string;
    value?: number;
  };
}

const GateNode: React.FC<GateNodeProps> = ({ id, data }) => {
  const [outputValue, setOutputValue] = useState(0);
  const updateNodeInternals = useUpdateNodeInternals();

  const calculateGateOutput = (inputs: boolean[]) => {
    switch (data.gateType) {
      case "and":
        return logic.calculateAND(inputs);
      case "or":
        return logic.calculateOR(inputs);
      case "not":
        return logic.calculateNOT(inputs);
      case "nand":
        return logic.calculateNAND(inputs);
      case "nor":
        return logic.calculateNOR(inputs);
      case "xor":
        return logic.calculateXOR(inputs);
      case "xnor":
        return logic.calculateXNOR(inputs);
      default:
        return 0;
    }
  };

  useEffect(() => {
    // Logic to determine the inputs to this gate node
    const inputValues: boolean[] = []; // Fetch the input values from connected nodes
    const output = calculateGateOutput(inputValues) ? 1 : 0;
    setOutputValue(output);
    data.value = output; // Update the output in node data
    updateNodeInternals(id); // Ensure connections and edges are updated
  }, [data.gateType, id, updateNodeInternals]);

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
