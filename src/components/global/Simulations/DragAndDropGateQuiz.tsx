import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { LightBulbOff, LightBulbOn } from "@src/assets/light-bulb-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@src/components/ui/card";
import { Typography } from "@src/components/ui/typography";
import { GateIcon } from "@src/lib/gates/gate-icon";
import { quizKeyToGateId } from "@src/lib/gates/registry";
import { cn } from "@src/lib/utils";
import { isTouchDevice } from "@src/utils/deviceUtils";

interface DragAndDropGateQuizProps {
  randomGates: string[];
  correctGate: string;
  inputs: boolean[];
  output: boolean;
  onDrop: (gate: string) => void;
}

function QuizGateIcon({ quizKey }: { quizKey: string }) {
  const gateId = quizKeyToGateId(quizKey);
  if (!gateId) return null;
  return <GateIcon gateId={gateId} className="size-10 text-foreground" />;
}

function SignalValue({ value }: { value: boolean }) {
  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-md font-mono text-sm font-semibold",
        value
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground ring-1 ring-border",
      )}
      aria-label={value ? "Logic high" : "Logic low"}
    >
      {value ? "1" : "0"}
    </span>
  );
}

const DraggableGate: React.FC<{ gate: string }> = ({ gate }) => {
  const [{ isDragging }, ref] = useDrag(() => ({
    type: "gate",
    item: { gate },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={ref as unknown as React.Ref<HTMLDivElement>}
      className={cn(
        "transition-transform",
        isDragging && "scale-95 opacity-50",
      )}
    >
      <Card
        size="sm"
        className="flex min-w-22 cursor-grab flex-col items-center justify-center gap-1.5 ring-1 ring-border transition-shadow hover:ring-primary/40 active:cursor-grabbing"
      >
        <CardContent className="flex flex-col items-center gap-1.5 py-3">
          <QuizGateIcon quizKey={gate} />
          <Typography variant="label-sm" fontWeight="semibold">
            {gate}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

const DropZone: React.FC<{
  onDrop: (gate: string) => void;
  children: React.ReactNode;
  isFilled: boolean;
}> = ({ onDrop, children, isFilled }) => {
  const [{ isOver }, ref] = useDrop({
    accept: "gate",
    drop: (item: { gate: string }) => {
      onDrop(item.gate);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <Card
      ref={ref as unknown as React.Ref<HTMLDivElement>}
      size="sm"
      className={cn(
        "flex min-h-22 min-w-22 items-center justify-center border-2 border-dashed bg-transparent shadow-none ring-0",
        isFilled
          ? "border-primary/50 bg-primary/5"
          : "border-primary/30 bg-muted/30",
        isOver && "border-primary bg-primary/10",
      )}
    >
      <CardContent className="flex items-center justify-center p-2">
        {children}
      </CardContent>
    </Card>
  );
};

const DragAndDropGateQuiz: React.FC<DragAndDropGateQuizProps> = ({
  randomGates,
  inputs,
  output,
  onDrop,
}) => {
  const [selectedGate, setSelectedGate] = useState<string | null>(null);

  const handleDrop = (gate: string) => {
    setSelectedGate(gate);
    onDrop(gate);
  };

  const backend = isTouchDevice() ? TouchBackend : HTML5Backend;

  return (
    <DndProvider backend={backend}>
      <div className="flex flex-col gap-4">
        <Card size="sm" className="bg-muted/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-center">
              Drag a gate into the circuit
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {randomGates.map((gate) => (
                <DraggableGate key={gate} gate={gate} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-muted/15">
          <CardContent className="relative px-4 py-8">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[24px_24px] opacity-40"
            />
            <div className="relative flex items-center justify-between gap-2">
              {inputs.length === 1 ? (
                <hr className="pointer-events-none absolute top-1/2 left-[calc(50%-8rem)] w-24 -translate-y-1/2 border-foreground/60 sm:left-[calc(50%-6rem)] sm:w-16" />
              ) : (
                <>
                  <hr className="pointer-events-none absolute top-[calc(50%-14px)] left-[calc(50%-8rem)] w-24 rotate-12 border-foreground/60 sm:left-[calc(50%-6rem)] sm:w-16" />
                  <hr className="pointer-events-none absolute bottom-[calc(50%-14px)] left-[calc(50%-8rem)] w-24 -rotate-12 border-foreground/60 sm:left-[calc(50%-6rem)] sm:w-16" />
                </>
              )}
              <hr className="pointer-events-none absolute top-1/2 right-[calc(50%-8rem)] w-24 -translate-y-1/2 border-foreground/60 sm:right-[calc(50%-6rem)] sm:w-16" />

              <div className="flex flex-col items-start gap-4 sm:gap-6">
                {inputs.map((input, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Typography variant="label-sm" fontWeight="semibold">
                      Input {index + 1}
                    </Typography>
                    <SignalValue value={input} />
                  </div>
                ))}
              </div>

              <DropZone onDrop={handleDrop} isFilled={selectedGate !== null}>
                {selectedGate ? (
                  <div className="flex flex-col items-center gap-1">
                    <QuizGateIcon quizKey={selectedGate} />
                    <Typography variant="label-sm" fontWeight="semibold">
                      {selectedGate}
                    </Typography>
                  </div>
                ) : (
                  <Typography
                    variant="body-xs"
                    className="max-w-18 text-center text-muted-foreground"
                  >
                    Drop gate here
                  </Typography>
                )}
              </DropZone>

              <div className="flex items-center gap-2">
                <SignalValue value={output} />
                <div className="flex flex-col items-center text-foreground">
                  {output ? (
                    <LightBulbOn className="size-12 sm:size-14" />
                  ) : (
                    <LightBulbOff className="size-12 sm:size-14" />
                  )}
                  <Typography variant="label-sm" className="mt-1" as="span">
                    Output
                  </Typography>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DndProvider>
  );
};

export default DragAndDropGateQuiz;
