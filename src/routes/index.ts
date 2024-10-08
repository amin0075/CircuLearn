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
  Reference,
  LawIcon,
} from "@src/assets/icons";

type IMainRoute = {
  introduction: IRoute;
  basicConcepts: IRoute[];
  BooleanAlgebra: IRoute[];
  gates: IRoute[];
  finalStep: IRoute[];
  additionalResources: IRoute[];
};

const ROUTES_URL = {
  introduction: "/introduction",
  binarySystem: "/basic-concepts/binary-system",
  booleanAlgebraIntro: "/boolean-algebra/introduction",
  IdentityLaw: "/boolean-algebra/identity-law",
  AnnulmentLaw: "/boolean-algebra/annulment-law",
  IdempotentLaw: "/boolean-algebra/idempotent-law",
  ComplementLaw: "/boolean-algebra/complement-law",
  CommutativeLaw: "/boolean-algebra/commutative-law",
  DoubleNegationLaw: "/boolean-algebra/double-negation-law",
  deMorganTheorem: "/boolean-algebra/de-morgan's-theorem",
  DistributiveLaw: "/boolean-algebra/distributive-law",
  AbsorptiveLaw: "/boolean-algebra/absorptive-law",
  AssociativeLaw: "/boolean-algebra/associative-law",
  truthTable: "/basic-concepts/truth-table",
  andGate: "/gates/and-gate",
  orGate: "/gates/or-gate",
  notGate: "/gates/not-gate",
  nandGate: "/gates/nand-gate",
  norGate: "/gates/nor-gate",
  xorGate: "/gates/xor-gate",
  xnorGate: "/gates/xnor-gate",
  quiz: "/final-step/quiz",
  feedback: "/final-step/feedback",
  glossary: "/additional-resources/glossary",
  faq: "/additional-resources/faq",
  references: "/additional-resources/references",
  results: "/additional-resources/results",
  contact: "/contact",
  privacy: "/privacy",
  simulator: "/simulator",
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
      name: "Truth Table",
      url: ROUTES_URL.truthTable,
      icon: Table,
    },
  ],
  BooleanAlgebra: [
    {
      name: "Introduction",
      url: ROUTES_URL.booleanAlgebraIntro,
      icon: Boolean,
    },
    {
      name: "Annulment Law",
      url: ROUTES_URL.AnnulmentLaw,
      icon: LawIcon,
    },
    {
      name: "Identity Law",
      url: ROUTES_URL.IdentityLaw,
      icon: LawIcon,
    },
    {
      name: "Idempotent Law",
      url: ROUTES_URL.IdempotentLaw,
      icon: LawIcon,
    },
    {
      name: "Complement Law",
      url: ROUTES_URL.ComplementLaw,
      icon: LawIcon,
    },
    {
      name: "Commutative Law",
      url: ROUTES_URL.CommutativeLaw,
      icon: LawIcon,
    },
    {
      name: "Double Negation Law",
      url: ROUTES_URL.DoubleNegationLaw,
      icon: LawIcon,
    },
    {
      name: "de Morgan´s Theorem",
      url: ROUTES_URL.deMorganTheorem,
      icon: LawIcon,
    },
    {
      name: "Distributive Law",
      url: ROUTES_URL.DistributiveLaw,
      icon: LawIcon,
    },
    {
      name: "Absorptive Law",
      url: ROUTES_URL.AbsorptiveLaw,
      icon: LawIcon,
    },
    {
      name: "Associative Law",
      url: ROUTES_URL.AssociativeLaw,
      icon: LawIcon,
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
  finalStep: [
    { name: "Quiz", url: ROUTES_URL.quiz, icon: Test },
    {
      name: "Feedback about the application",
      url: ROUTES_URL.feedback,
      icon: Feedback,
    },
  ],
  additionalResources: [
    { name: "Glossary of terms", url: ROUTES_URL.glossary, icon: Glossary },
    { name: "FAQs", url: ROUTES_URL.faq, icon: Faq },
    { name: "Results", url: ROUTES_URL.results, icon: Test },
    { name: "References", url: ROUTES_URL.references, icon: Reference },
  ],
};

const navRoutes: IRoute[] = [
  { name: "simulator", url: ROUTES_URL.simulator },
  { name: "contact", url: ROUTES_URL.contact },
  { name: "privacy", url: ROUTES_URL.privacy },
];
export { ROUTES_URL, mainRoutes, navRoutes };
