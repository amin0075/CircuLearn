import type { LogicGateId } from "@src/utils/gateLogic";

import { gateSvgIcons } from "./gate-svg-icons";

export function GateIcon({
  gateId,
  className,
}: {
  gateId: LogicGateId;
  className?: string;
}) {
  const Icon = gateSvgIcons[gateId];
  return <Icon className={className} />;
}
