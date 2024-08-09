// types
import { IRoute } from "@src/@types/route";

// icons
import {
  Presentation,
  ChipCircuit,
  Binary,
  Boolean,
  Table,
  LogicGateAnd,
  LogicGateNot,
  LogicGateOr,
  LogicGateNand,
  LogicGateNor,
  LogicGateXor,
  LogicGateXnor,
  Test,
  Feedback,
  Glossary,
  Faq,
} from "@src/assets/icons";

type IMainRoute = {
  introduction: IRoute;
  basicConcepts: IRoute[];
  gates: IRoute[];
  quiz: IRoute[];
  additionalResources: IRoute[];
};

const ROUTES_URL = {
  introduction: "/introduction",
  binarySystem: "/basic-concepts/binary-system",
  booleanAlgebra: "/basic-concepts/boolean-algebra",
  truthTable: "/basic-concepts/truth-table",
  andGate: "/gates/and-gate",
  orGate: "/gates/or-gate",
  notGate: "/gates/not-gate",
  nandGate: "/gates/nand-gate",
  norGate: "/gates/nor-gate",
  xorGate: "/gates/xor-gate",
  xnorGate: "/gates/xnor-gate",
  quiz: "/quiz",
  feedback: "/feedback",
  glossary: "/additional-resources/glossary",
  faq: "/additional-resources/faq",
  contact: "/contact",
  privacy: "/privacy",
};

const mainRoutes: IMainRoute = {
  introduction: {
    name: "Intro to logic circuits",
    url: ROUTES_URL.introduction,
    icon: Presentation,
  },

  basicConcepts: [
    {
      name: "Binary System",
      url: ROUTES_URL.binarySystem,
      icon: Binary,
    },
    {
      name: "Boolean Algebra",
      url: ROUTES_URL.booleanAlgebra,
      icon: Boolean,
    },
    {
      name: "Truth Table",
      url: ROUTES_URL.truthTable,
      icon: Table,
    },
  ],
  gates: [
    { name: "AND Gate", url: ROUTES_URL.andGate, icon: LogicGateAnd },
    { name: "OR Gate", url: ROUTES_URL.orGate, icon: LogicGateOr },
    { name: "NOT Gate", url: ROUTES_URL.notGate, icon: LogicGateNot },
    { name: "NAND Gate", url: ROUTES_URL.nandGate, icon: LogicGateNand },
    { name: "NOR Gate", url: ROUTES_URL.norGate, icon: LogicGateNor },
    { name: "XOR Gate", url: ROUTES_URL.xorGate, icon: LogicGateXor },
    { name: "XNOR Gate", url: ROUTES_URL.xnorGate, icon: LogicGateXnor },
  ],
  quiz: [
    { name: "Final Evaluation", url: ROUTES_URL.quiz, icon: Test },
    {
      name: "Feedback about the application",
      url: ROUTES_URL.feedback,
      icon: Feedback,
    },
  ],
  additionalResources: [
    { name: "Glossary of terms", url: ROUTES_URL.glossary, icon: Glossary },
    { name: "FAQs", url: ROUTES_URL.faq, icon: Faq },
  ],
};

const navRoutes: IRoute[] = [
  { name: "contact", url: ROUTES_URL.contact },
  { name: "privacy", url: ROUTES_URL.privacy },
];
export { ROUTES_URL, mainRoutes, navRoutes };
