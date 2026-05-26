// types
import { IRoute } from "@src/@types/route";

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
  glossary: "/additional-resources/glossary",
  faq: "/additional-resources/faq",
  references: "/additional-resources/references",
  contact: "/contact",
  privacy: "/privacy",
  simulator: "/simulator",
};

const mainRoutes: IMainRoute = {
  introduction: {
    name: "Intro to logic circuits",
    url: ROUTES_URL.introduction,
  },

  basicConcepts: [
    {
      name: "Binary System",
      url: ROUTES_URL.binarySystem,
    },
    {
      name: "Truth Table",
      url: ROUTES_URL.truthTable,
    },
  ],
  BooleanAlgebra: [
    {
      name: "Introduction",
      url: ROUTES_URL.booleanAlgebraIntro,
    },
    {
      name: "Annulment Law",
      url: ROUTES_URL.AnnulmentLaw,
    },
    {
      name: "Identity Law",
      url: ROUTES_URL.IdentityLaw,
    },
    {
      name: "Idempotent Law",
      url: ROUTES_URL.IdempotentLaw,
    },
    {
      name: "Complement Law",
      url: ROUTES_URL.ComplementLaw,
    },
    {
      name: "Commutative Law",
      url: ROUTES_URL.CommutativeLaw,
    },
    {
      name: "Double Negation Law",
      url: ROUTES_URL.DoubleNegationLaw,
    },
    {
      name: "de Morgan´s Theorem",
      url: ROUTES_URL.deMorganTheorem,
    },
    {
      name: "Distributive Law",
      url: ROUTES_URL.DistributiveLaw,
    },
    {
      name: "Absorptive Law",
      url: ROUTES_URL.AbsorptiveLaw,
    },
    {
      name: "Associative Law",
      url: ROUTES_URL.AssociativeLaw,
    },
  ],
  gates: [
    { name: "AND Gate", url: ROUTES_URL.andGate },
    { name: "OR Gate", url: ROUTES_URL.orGate },
    { name: "NOT Gate", url: ROUTES_URL.notGate },
    { name: "NAND Gate", url: ROUTES_URL.nandGate },
    { name: "NOR Gate", url: ROUTES_URL.norGate },
    { name: "XOR Gate", url: ROUTES_URL.xorGate },
    { name: "XNOR Gate", url: ROUTES_URL.xnorGate },
  ],
  finalStep: [{ name: "Quiz", url: ROUTES_URL.quiz }],
  additionalResources: [
    { name: "Glossary of terms", url: ROUTES_URL.glossary },
    { name: "FAQs", url: ROUTES_URL.faq },
    { name: "References", url: ROUTES_URL.references },
  ],
};

const navRoutes: IRoute[] = [
  { name: "simulator", url: ROUTES_URL.simulator },
  { name: "contact", url: ROUTES_URL.contact },
  { name: "privacy", url: ROUTES_URL.privacy },
];
export { ROUTES_URL, mainRoutes, navRoutes };
