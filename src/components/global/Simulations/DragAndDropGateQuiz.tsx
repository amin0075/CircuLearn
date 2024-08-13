import React, { useState } from "react";
import {
  LogicGateAnd,
  LogicGateNand,
  LogicGateNor,
  LogicGateNot,
  LogicGateOr,
  LogicGateXnor,
  LogicGateXor,
  LightBulbOff,
  LightBulbOn,
} from "@src/assets/icons";
import { useDrop, useDrag } from "react-dnd";
import Paper from "@src/components/Paper";
import Typography from "@src/components/Typography";
import { useThemeStore } from "@src/zustand_stores/Theme";
import { bgColor } from "@src/utils/colorUtils";

interface DragAndDropGateQuizProps {
  randomGates: string[];
  correctGate: string;
  inputs: boolean[];
  output: boolean;
  onDrop: (gate: string) => void;
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

const DraggableGate: React.FC<{ gate: string }> = ({ gate }) => {
  const [{ isDragging }, ref] = useDrag(() => ({
    type: "gate",
    item: { gate },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Paper
      // @ts-ignore
      ref={ref}
      className={`p-2 m-2 cursor-pointer flex flex-col gap-2 items-center justify-center ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {gateIcons[gate]}
      <Typography variant="caption">{gate}</Typography>
    </Paper>
  );
};

const DropZone: React.FC<{
  onDrop: (gate: string) => void;
  children: React.ReactNode;
}> = ({ onDrop, children }) => {
  const [, ref] = useDrop({
    accept: "gate",
    drop: (item: { gate: string }) => {
      onDrop(item.gate);
    },
  });

  return (
    <div
      // @ts-ignore
      ref={ref}
      className="w-[100px] h-[100px] flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg"
    >
      {children}
    </div>
  );
};

const DragAndDropGateQuiz: React.FC<DragAndDropGateQuizProps> = ({
  randomGates,
  correctGate,
  inputs,
  output,
  onDrop,
}) => {
  const { primaryColor } = useThemeStore();
  const [selectedGate, setSelectedGate] = useState<string | null>(null);

  const handleDrop = (gate: string) => {
    setSelectedGate(gate);
    const isCorrect = gate === correctGate;
    onDrop(gate);
    // console.log("Dropped Gate:", gate, "Is Correct:", isCorrect);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
      <div className="flex items-center justify-center gap-4 mb-6">
        {randomGates.map((gate, index) => (
          <DraggableGate key={index} gate={gate} />
        ))}
      </div>
      <div className="flex items-center justify-between w-full relative">
        {/* Input Wires */}
        {inputs.length === 1 ? (
          <hr className="border w-[120px] border-black dark:border-white absolute left-[100px] top-[calc(50%-1px)]" />
        ) : (
          <>
            <hr className="border w-[120px] border-black dark:border-white absolute left-[100px] top-[27px] rotate-[12deg]" />
            <hr className="border w-[120px] border-black dark:border-white absolute left-[100px] bottom-[27px] -rotate-[12deg]" />
          </>
        )}
        {/* Output Wire */}
        <hr className="border w-[120px] border-black dark:border-white absolute right-[85px] top-[calc(50%-1px)]" />

        {/* Inputs */}
        <div className="flex flex-col items-center gap-6">
          {inputs.map((input, index) => (
            <div key={index} className="flex items-center mb-2 gap-1">
              <Typography fontweight="semiBold" variant="body2">
                Input {index + 1}
              </Typography>
              <div
                className={`${bgColor(
                  primaryColor
                )} w-[20px] h-[30px] flex items-center justify-center`}
              >
                {input ? "1" : "0"}
              </div>
            </div>
          ))}
        </div>

        {/* Drop Zone for Gate */}
        <DropZone onDrop={handleDrop}>
          {selectedGate ? gateIcons[selectedGate] : "Drag Gate Here"}
        </DropZone>

        {/* Outputs */}
        <div className="flex items-center gap-1">
          <div
            className={`${bgColor(
              primaryColor
            )} w-[20px] h-[30px] flex items-center justify-center`}
          >
            {output ? "1" : "0"}
          </div>
          <div className="flex flex-col items-center text-black dark:text-white">
            {output ? (
              <LightBulbOn className="w-14 h-14" />
            ) : (
              <LightBulbOff className="w-14 h-14" />
            )}
            <Typography className="mt-2 text-sm">Output</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragAndDropGateQuiz;
