// components/global/Simulations/GateSimulation.tsx
import React, { useState, useEffect, useMemo } from "react";
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
  switch (gate) {
    case "AND":
      return calculateAND(newInputs);
    case "NAND":
      return calculateNAND(newInputs);
    case "NOR":
      return calculateNOR(newInputs);
    case "NOT":
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

  // Initialize state based on inputLabels length
  const initialInputs = useMemo(
    () => new Array(inputLabels.length).fill(false),
    [inputLabels.length]
  );

  const [inputs, setInputs] = useState<boolean[]>(initialInputs);
  const [output, setOutput] = useState<boolean>(false);

  const handleInputChange = (index: number) => {
    const newInputs = [...inputs];
    newInputs[index] = !newInputs[index];
    setInputs(newInputs);
    setOutput(gateFunctions(gate.replace(" Gate", ""), newInputs));
  };

  useEffect(() => {
    // Reset inputs when the gate changes
    const resetInputs = new Array(inputLabels.length).fill(false);
    setInputs(resetInputs);
    setOutput(gateFunctions(gate.replace(" Gate", ""), resetInputs));
  }, [gate, inputLabels.length]);

  return (
    <div className="p-4 sxs:px-0 bg-transparent rounded-lg">
      <div className="flex items-center justify-between w-full relative">
        {/* inputs wire(s) */}
        {gate === "NOT Gate" ? (
          <hr className="border w-[120px] ssm:w-[60px] sxs:w-[15px] border-black dark:border-white absolute left-[100px] top-[calc(50%-1px)]" />
        ) : (
          <>
            <hr className="border w-[120px] ssm:w-[60px] sxs:w-[15px] border-black dark:border-white absolute left-[100px] top-[27px] rotate-[12deg]" />
            <hr className="border w-[120px] ssm:w-[60px] sxs:w-[15px] border-black dark:border-white absolute left-[100px] bottom-[27px] -rotate-[12deg]" />
          </>
        )}

        {/* output wire */}
        <hr className="border w-[120px] ssm:w-[60px] sxs:w-[15px] border-black dark:border-white absolute right-[85px] top-[calc(50%-1px)]" />

        {/* gate */}
        <div className="flex flex-col items-center gap-6">
          {inputLabels.map((label, index) => (
            <div key={index} className="flex items-center mb-2 gap-1">
              <Switch
                checked={inputs[index]}
                onChange={() => handleInputChange(index)}
              >
                <Typography fontweight="semiBold">{label}</Typography>
              </Switch>
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
              <LightBulbOn className="w-14 h-14 sxs:w-10 sxs:h-10" />
            ) : (
              <LightBulbOff className="w-14 h-14 sxs:w-10 sxs:h-10" />
            )}
            <Typography variant="body2">{outputLabel}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GateSimulation;
