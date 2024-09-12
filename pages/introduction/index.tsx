import { useRef, useEffect } from "react";
import Image from "next/image";

// utils
import Button from "@src/components/Button";
import Link from "next/link";
import { ROUTES_URL } from "@src/routes";
import Head from "next/head";
import Paper from "@src/components/Paper";
import Typography from "@src/components/Typography";
import Tooltip from "@src/components/Tooltip";
import HelperNavigation from "@src/components/global/HelperNavigation";

// components

export default function IntroToLogicCircuits() {
  return (
    <>
      <Head>
        <title>Introduction to logic circuits page</title>
        <meta
          name="description"
          content="Introduction to logic circuits page"
        />
      </Head>
      <Paper className="w-full flex flex-col gap-4 p-4 md:p-6 min-h-full">
        <Typography variant="h2">Introduction to Logic Circuits</Typography>
        <Typography variant="body1">
          <strong>Welcome to Logic Circuits</strong>
        </Typography>
        <Typography variant="body1">
          Logic circuits are the fundamental building blocks of digital systems.
          They are used to process binary information, which consists of only
          two values: 0 and 1. This binary system is the backbone of modern
          electronics, including computers, smartphones, and many other digital
          devices. Understanding logic circuits is essential for anyone
          interested in electronics, computer science, or engineering.
        </Typography>
        <Typography variant="h3">What are Logic Circuits?</Typography>
        <Typography variant="body1">
          Logic circuits are electrical circuits that perform logical operations
          on binary inputs to produce a binary output. These operations are
          based on Boolean algebra, which uses logical functions like AND, OR,
          NOT, NAND, NOR, XOR, and XNOR to process binary data.
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              <strong>Boolean Algebra</strong>: A branch of algebra that deals
              with true or false values (binary 1 or 0). It forms the
              theoretical foundation for logic circuits.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Binary System</strong>: A numbering system that uses only
              two digits, 0 and 1. Every digital device operates on this system.
            </Typography>
          </li>
        </ul>
        <Typography variant="h3">Basic Components of Logic Circuits</Typography>
        <ol>
          <li>
            <Typography variant="body1">
              <strong>Logic Gates</strong>: The basic building blocks of logic
              circuits. Each gate performs a simple logical function. The main
              types of logic gates include AND, OR, NOT, NAND, NOR, XOR, and
              XNOR gates.
            </Typography>
            <ul>
              <li>
                <Typography variant="body1">
                  <strong>AND Gate</strong>: Produces a true output (1) only if
                  all inputs are true.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <strong>OR Gate</strong>: Produces a true output if at least
                  one input is true.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <strong>NOT Gate</strong>: Inverts the input signal; true
                  becomes false, and false becomes true.
                </Typography>
              </li>
            </ul>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Combinational Circuits</strong>: These circuits are made
              up of logic gates whose outputs depend only on the current inputs.
              Examples include adders, encoders, decoders, multiplexers, and
              demultiplexers.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Sequential Circuits</strong>: Unlike combinational
              circuits, these circuits depend on both current inputs and
              previous states (history). They include elements like flip-flops,
              counters, and registers.
            </Typography>
          </li>
        </ol>
        <Typography variant="h3">Applications of Logic Circuits</Typography>
        <Typography variant="body1">
          Logic circuits are used in various applications, from simple digital
          watches to complex computer processors. Here are a few examples:
        </Typography>
        <ol>
          <li className="flex flex-col gap-2">
            <Typography variant="body1">
              <strong>Computers and Smartphones</strong>: The central processing
              unit (CPU) of a computer is a complex assembly of logic circuits
              that perform arithmetic and logical operations.
            </Typography>

            <Tooltip
              direction="right"
              parentClassName="w-full max-w-[400px] aspect-[1.33] relative"
              title="https://en.wikipedia.org/wiki/Pentium_4"
            >
              <Image
                src="/images/intel-cpu.jpeg"
                alt="Intel CPU"
                fill
                className="object-contain rounded-md"
              />
            </Tooltip>
          </li>
          <li className="flex flex-col gap-2">
            <Typography variant="body1">
              <strong>Digital Clocks and Watches</strong>: Logic circuits keep
              track of time and control the display of the time.
            </Typography>
            <Tooltip
              direction="right"
              parentClassName="w-full max-w-[400px] aspect-[1.33] relative"
              title="https://en.wikipedia.org/wiki/Digital_clock"
            >
              <Image
                src="/images/Digital-clock-alarm.jpg"
                alt="Digital Clock"
                fill
                className="object-contain rounded-md"
              />
            </Tooltip>
          </li>
          <li className="flex flex-col gap-2">
            <Typography variant="body1">
              <strong>Automated Systems</strong>: Logic circuits control the
              operations of automated systems like traffic lights and industrial
              robots.
            </Typography>
            <Tooltip
              direction="right"
              parentClassName="w-full max-w-[400px] aspect-[0.7] relative"
              title="https://en.wikipedia.org/wiki/Traffic_light"
            >
              <Image
                src="/images/Modern_British_LED_Traffic_Light.jpg"
                alt="Traffic Light"
                fill
                className="object-contain rounded-md"
              />
            </Tooltip>
          </li>
        </ol>
        <Typography variant="h3">
          The Importance of Learning Logic Circuits
        </Typography>
        <Typography variant="body1">
          Understanding logic circuits is crucial for several reasons:
        </Typography>
        <ol>
          <li>
            <Typography variant="body1">
              <strong>Foundation for Digital Electronics</strong>: All digital
              electronic devices rely on logic circuits. Learning about them
              provides a strong foundation for further studies in electronics
              and computer science.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Problem-Solving Skills</strong>: Designing and analyzing
              logic circuits enhance problem-solving and critical-thinking
              skills.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Innovation and Development</strong>: Knowledge of logic
              circuits is essential for innovation in technology and the
              development of new digital devices.
            </Typography>
          </li>
        </ol>
        <HelperNavigation
          hasPrevious={false}
          nextRoute={ROUTES_URL.binarySystem}
          NextRouteLabel="Binary System"
        />
      </Paper>
    </>
  );
}
