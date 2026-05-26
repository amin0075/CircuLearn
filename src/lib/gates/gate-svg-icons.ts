import type { ComponentType } from "react";

import LogicGateAnd from "@src/assets/icons/logic-gate-and.svg";
import LogicGateNand from "@src/assets/icons/logic-gate-nand.svg";
import LogicGateNor from "@src/assets/icons/logic-gate-nor.svg";
import LogicGateNot from "@src/assets/icons/logic-gate-not.svg";
import LogicGateOr from "@src/assets/icons/logic-gate-or.svg";
import LogicGateXnor from "@src/assets/icons/logic-gate-xnor.svg";
import LogicGateXor from "@src/assets/icons/logic-gate-xor.svg";
import type { LogicGateId } from "@src/utils/gateLogic";

export const gateSvgIcons: Record<
  LogicGateId,
  ComponentType<{ className?: string }>
> = {
  and: LogicGateAnd,
  or: LogicGateOr,
  not: LogicGateNot,
  nand: LogicGateNand,
  nor: LogicGateNor,
  xor: LogicGateXor,
  xnor: LogicGateXnor,
};
