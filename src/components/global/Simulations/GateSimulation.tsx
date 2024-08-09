import React, { useState, useMemo, useEffect } from "react";
import {
  calculateAND,
  calculateNAND,
  calculateNOR,
  calculateNOT,
  calculateOR,
  calculateXNOR,
  calculateXOR,
} from "@src/utils/gateLogic";
import Switch from "@src/components/Switch";
import {
  LightBulbOff,
  LightBulbOn,
  LogicGateAnd,
  LogicGateNand,
  LogicGateNor,
  LogicGateNot,
  LogicGateOr,
  LogicGateXnor,
  LogicGateXor,
} from "@src/assets/icons";
import { useThemeStore } from "@src/zustand_stores/Theme";
import { bgColor } from "@src/utils/colorUtils";
import Divider from "@src/components/Divider";
import Typography from "@src/components/Typography";

interface GateSimulationProps {
  gate: string;
  inputLabels: string[];
  outputLabel: string;
}

const gateIcons: { [key: string]: JSX.Element } = {
  AND: <LogicGateAnd className="w-10 h-w-10 text-black dark:text-white" />,
  NAND: <LogicGateNand className="w-10 h-w-10 text-black dark:text-white" />,
  NOR: <LogicGateNor className="w-10 h-w-10 text-black dark:text-white" />,
  NOT: <LogicGateNot className="w-10 h-w-10 text-black dark:text-white" />,
  OR: <LogicGateOr className="w-10 h-w-10 text-black dark:text-white" />,
  XNOR: <LogicGateXnor className="w-10 h-w-10 text-black dark:text-white" />,
  XOR: <LogicGateXor className="w-10 h-w-10 text-black dark:text-white" />,
};

const gateFunctions = (gate: string, newInputs: boolean[]) => {
  // AND: calculateAND,
  // NAND: calculateNAND,
  // NOR: calculateNOR,
  // NOT: calculateNOT,
  // OR: calculateOR,
  // XNOR: calculateXNOR,
  // XOR: calculateXOR,
  // make switch operator to check the gate
  switch (gate) {
    case "AND":
      return calculateAND(newInputs);
    case "NAND":
      return calculateNAND(newInputs);
    case "NOR":
      return calculateNOR(newInputs);
    case "NOT":
      console.log("here");
      return calculateNOT(newInputs);
    case "OR":
      return calculateOR(newInputs);
    case "XNOR":
      return calculateXNOR(newInputs);
    case "XOR":
      return calculateXOR(newInputs);
    default:
      return calculateAND(newInputs);
  }
};

const GateSimulation: React.FC<GateSimulationProps> = ({
  gate,
  inputLabels,
  outputLabel,
}) => {
  const { primaryColor } = useThemeStore((state) => state);
  const [inputs, setInputs] = useState<boolean[]>(
    new Array(inputLabels.length).fill(false)
  );
  const [output, setOutput] = useState<boolean>(false);

  // console.log("gate: ", gate);

  const handleInputChange = (index: number) => {
    const newInputs = [...inputs];
    newInputs[index] = !newInputs[index];
    setInputs(newInputs);
    setOutput(gateFunctions(gate.replace(" Gate", ""), newInputs));
  };

  useEffect(() => {
    setOutput(gateFunctions(gate.replace(" Gate", ""), inputs));
  }, [gate]);

  return (
    <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
      <div className="flex items-center justify-between w-full relative">
        {/* inputs wire(s) */}
        {gate === "NOT Gate" ? (
          <hr className="border w-[120px] border-black dark:border-white absolute left-[100px] top-[calc(50%-1px)]" />
        ) : (
          <>
            <hr className="border w-[120px] border-black dark:border-white absolute left-[100px] top-[27px] rotate-[12deg]" />
            <hr className="border w-[120px] border-black dark:border-white absolute left-[100px] bottom-[27px] -rotate-[12deg]" />
          </>
        )}

        {/* output wire */}
        <hr className="border w-[120px] border-black dark:border-white absolute right-[85px] top-[calc(50%-1px)]" />

        {/* gate */}
        <div className="flex flex-col items-center gap-6">
          {inputLabels.map((label, index) => (
            <div key={index} className="flex items-center mb-2 gap-1">
              <Switch
                checked={inputs[index]}
                onChange={() => handleInputChange(index)}
              />
              <Typography fontweight="semiBold">{label}</Typography>
              <div
                className={`${bgColor(primaryColor)} w-[20px] h-[30px] flex items-center justify-center`}
              >
                {inputs[index] ? "1" : "0"}
              </div>
            </div>
          ))}
        </div>
        <div className="text-black dark:text-white min-w-10 min-h-10">
          {gateIcons[gate.replace(" Gate", "")]}
        </div>
        <div className="flex items-center gap-1">
          <div
            className={`${bgColor(primaryColor)} w-[20px] h-[30px] flex items-center justify-center`}
          >
            {output ? "1" : "0"}
          </div>
          <div className="flex flex-col items-center text-black dark:text-white">
            {output ? (
              <LightBulbOn className="w-14 h-14" />
            ) : (
              <LightBulbOff className="w-14 h-14" />
            )}
            <span className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              {outputLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GateSimulation;
