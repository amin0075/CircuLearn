"use client";

import {
  Binary,
  CircuitBoard,
  Layers,
  Lightbulb,
  Workflow,
} from "lucide-react";

import {
  ApplicationShowcase,
  ConceptCard,
  KeyPointList,
  LessonHero,
  LessonPage,
  LessonSection,
} from "@src/components/content";
import HelperNavigation from "@src/components/global/HelperNavigation";
import { Typography } from "@src/components/ui/typography";
import { ROUTES_URL } from "@src/routes";

const foundationConcepts = [
  {
    title: "Boolean Algebra",
    description:
      "Algebra over true/false (1/0) values—the theory behind every logic gate.",
    icon: Binary,
  },
  {
    title: "Binary System",
    description:
      "Base-2 numbering with only 0 and 1; how digital devices represent data.",
    icon: CircuitBoard,
  },
];

const gateTypes = [
  {
    title: "AND Gate",
    description: "Output is 1 only when every input is 1.",
  },
  {
    title: "OR Gate",
    description: "Output is 1 when at least one input is 1.",
  },
  {
    title: "NOT Gate",
    description: "Inverts the input: 1 becomes 0 and 0 becomes 1.",
  },
];

const circuitTypes = [
  {
    title: "Combinational Circuits",
    description:
      "Outputs depend only on current inputs—adders, encoders, multiplexers, and more.",
    icon: Workflow,
  },
  {
    title: "Sequential Circuits",
    description:
      "Outputs depend on inputs and past state—flip-flops, counters, and registers.",
    icon: Layers,
  },
];

const applications = [
  {
    title: "Computers & Smartphones",
    description:
      "CPUs are vast networks of logic circuits performing arithmetic and logic at incredible speed.",
    imageSrc: "/images/intel-cpu.jpeg",
    imageAlt: "Intel CPU microprocessor",
    credit: "Source: wikipedia.org",
  },
  {
    title: "Digital Clocks",
    description:
      "Logic circuits track time and drive what you see on the display.",
    imageSrc: "/images/Digital-clock-alarm.jpg",
    imageAlt: "Digital alarm clock",
    credit: "Source: wikipedia.org",
  },
  {
    title: "Automated Systems",
    description:
      "Traffic lights, factory robots, and control systems all rely on digital logic.",
    imageSrc: "/images/Modern_British_LED_Traffic_Light.jpg",
    imageAlt: "Modern LED traffic light",
    credit: "Source: wikipedia.org",
  },
];

const learningBenefits = [
  {
    title: "Foundation for Digital Electronics",
    description:
      "Every phone, laptop, and embedded device is built on logic circuits.",
  },
  {
    title: "Stronger Problem-Solving",
    description:
      "Designing and analyzing circuits sharpens structured thinking.",
  },
  {
    title: "Innovation & Development",
    description:
      "Essential knowledge for creating new hardware and digital products.",
  },
];

export default function IntroductionContent() {
  return (
    <LessonPage
      footer={
        <HelperNavigation
          hasPrevious={false}
          nextRoute={ROUTES_URL.binarySystem}
          NextRouteLabel="Binary System"
        />
      }
    >
      <LessonHero
        badge="Getting started"
        title="Introduction to Logic Circuits"
        description="Learn how binary signals flow through gates and combine into the digital systems you use every day—from clocks to CPUs."
      />

      <LessonSection>
        <Typography variant="body-base">
          Logic circuits process binary information (0 and 1). That simple idea
          powers computers, phones, and countless devices. This course walks you
          from basics to hands-on practice step by step.
        </Typography>
      </LessonSection>

      <LessonSection
        title="What are Logic Circuits?"
        description="Electrical circuits that apply Boolean logic to binary inputs and outputs."
      >
        <Typography variant="body-base">
          They implement operations such as AND, OR, NOT, NAND, NOR, XOR, and
          XNOR—each defined by Boolean algebra.
        </Typography>
        <div className="grid gap-3 sm:grid-cols-2">
          {foundationConcepts.map((concept) => (
            <ConceptCard key={concept.title} {...concept} />
          ))}
        </div>
      </LessonSection>

      <LessonSection
        title="Basic Components"
        description="Gates are the building blocks; circuits combine them into useful behavior."
      >
        <Typography variant="heading-sm" as="h3">
          Logic gates
        </Typography>
        <KeyPointList items={gateTypes} columns={1} />
        <Typography variant="heading-sm" as="h3" className="mt-2">
          Circuit families
        </Typography>
        <div className="grid gap-3 sm:grid-cols-2">
          {circuitTypes.map((item) => (
            <ConceptCard key={item.title} {...item} />
          ))}
        </div>
      </LessonSection>

      <LessonSection
        title="Real-World Applications"
        description="Logic circuits are everywhere—not only inside computers."
      >
        <ApplicationShowcase items={applications} />
      </LessonSection>

      <LessonSection
        title="Why Learn This?"
        description="A practical skill set for electronics, CS, and engineering paths."
      >
        <KeyPointList items={learningBenefits} columns={2} />
        <div className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <Lightbulb className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
          <Typography variant="body-sm" className="text-muted-foreground">
            Use the sidebar to move through lessons in order, or jump to the
            simulator anytime to experiment with gates interactively.
          </Typography>
        </div>
      </LessonSection>
    </LessonPage>
  );
}
