import { useState } from "react";

import { Label } from "@src/components/ui/label";
import { Switch } from "@src/components/ui/switch";
import { Typography } from "@src/components/ui/typography";
import { LightBulbOff, LightBulbOn } from "@src/assets/light-bulb-icons";
import { displayNameToGateId } from "@src/lib/gates/registry";
import { GateIcon } from "@src/lib/gates/gate-icon";
import { cn } from "@src/lib/utils";
import { evaluateGate } from "@src/utils/gateLogic";

interface GateSimulationProps {
  gate: string;
  inputLabels: string[];
  outputLabel: string;
}

function CircuitWire({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex min-w-4 shrink items-center self-center", className)}
      aria-hidden
    >
      <div className="h-px w-full bg-foreground" />
    </div>
  );
}

function InputWires({ dual }: { dual: boolean }) {
  if (!dual) {
    return <CircuitWire className="w-8 sm:w-12" />;
  }

  return (
    <div
      className="relative h-16 w-8 shrink-0 self-center sm:h-20 sm:w-12"
      aria-hidden
    >
      <div className="absolute top-[28%] left-0 h-px w-[110%] origin-left rotate-20 bg-foreground" />
      <div className="absolute bottom-[28%] left-0 h-px w-[110%] origin-left rotate-[-20deg] bg-foreground" />
    </div>
  );
}

const GateSimulation = ({
  gate,
  inputLabels,
  outputLabel,
}: GateSimulationProps) => {
  const gateId = displayNameToGateId(gate);
  const [inputs, setInputs] = useState<boolean[]>(() =>
    new Array(inputLabels.length).fill(false),
  );
  const output = gateId ? evaluateGate(gateId, inputs) === 1 : false;
  const dualInput = inputLabels.length > 1;

  const handleInputChange = (index: number) => {
    const newInputs = [...inputs];
    newInputs[index] = !newInputs[index];
    setInputs(newInputs);
  };

  return (
    <div className="rounded-lg bg-transparent p-4 sxs:px-0">
      <div className="overflow-x-auto pb-1">
        <div className="flex min-w-[min(100%,20rem)] items-center sm:min-w-md">
          <div className="flex shrink-0 flex-col gap-4 py-1 sm:gap-6">
            {inputLabels.map((label, index) => (
              <div key={index} className="flex items-center gap-2">
                <Switch
                  id={`gate-input-${index}`}
                  checked={inputs[index]}
                  onCheckedChange={() => handleInputChange(index)}
                />
                <Label htmlFor={`gate-input-${index}`}>{label}</Label>
                <Typography
                  as="div"
                  variant="body-sm"
                  className="flex h-[30px] w-[20px] shrink-0 items-center justify-center bg-primary text-primary-foreground"
                >
                  {inputs[index] ? "1" : "0"}
                </Typography>
              </div>
            ))}
          </div>

          <InputWires dual={dualInput} />

          <div className="shrink-0 px-1 text-foreground">
            {gateId ? (
              <GateIcon gateId={gateId} className="size-10 text-foreground" />
            ) : null}
          </div>

          <CircuitWire className="min-w-6 flex-1" />

          <div className="flex shrink-0 items-center gap-1.5 pl-0.5">
            <Typography
              as="div"
              variant="body-sm"
              className="flex h-[30px] w-[20px] shrink-0 items-center justify-center bg-primary text-primary-foreground"
            >
              {output ? "1" : "0"}
            </Typography>
            <Typography fontWeight="semibold" className="shrink-0">
              {outputLabel}
            </Typography>
            {output ? (
              <LightBulbOn className="size-8 shrink-0 text-yellow-400" />
            ) : (
              <LightBulbOff className="size-8 shrink-0 text-muted-foreground" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GateSimulation;
