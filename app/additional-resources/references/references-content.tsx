"use client";

import Link from "next/link";

import { LessonHero, LessonPage, LessonSection } from "@src/components/content";
import { Typography } from "@/components/ui/typography";

export default function ReferencesContent() {
  return (
    <LessonPage>
      <LessonHero
        badge="Credits"
        title="References"
        description="Sources for course content, research, icons, and images used in CircuLearn."
      />

      <LessonSection title="Content Sections">
        <ol className="flex list-decimal flex-col gap-4 pl-6">
          <li>
            <Typography variant="body-sm">
              Clark, R. C., & Mayer, R. E. (2016).{" "}
              <em>
                E-learning and the science of instruction: Proven guidelines for
                consumers and designers of multimedia learning
              </em>{" "}
              (4th ed.). Wiley.
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              de Jong, T., & van Joolingen, W. R. (1998). Scientific Discovery
              Learning with Computer Simulations of Conceptual Domains.{" "}
              <em>Review of Educational Research, 68</em>(2), 179–201.{" "}
              <Link
                className="underline"
                href="https://doi.org/10.3102/00346543068002179"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://doi.org/10.3102/00346543068002179
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Gee, J. P. (2003). What video games have to teach us about
              learning and literacy. <em>Computers in Entertainment, 1</em>(1),
              20-20.{" "}
              <Link
                className="underline"
                href="https://doi.org/10.1145/950566.950595"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://doi.org/10.1145/950566.950595
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Mano, M. M., Kime, C. R., & Martin, T. (2015).{" "}
              <em>Logic and computer design fundamentals</em> (5th ed.).
              Pearson.
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Nielsen, J. (1994). <em>Usability engineering</em>. Morgan
              Kaufmann.
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Norman, D. A. (2013). <em>The design of everyday things</em>{" "}
              (Revised and expanded ed.). Basic Books.
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Koffka, K. (1935). <em>Principles of Gestalt Psychology</em>.
              Harcourt, Brace and Company.
            </Typography>
          </li>
        </ol>
      </LessonSection>

      <LessonSection title="Icons and Images">
        <ol className="flex list-decimal flex-col gap-4 pl-6">
          <li>
            <Typography variant="body-sm">
              Arrow icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19,
              2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/521479/arrow-next-small"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/521479/arrow-next-small
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Binary system icon [SVG image]. (n.d.). SVGRepo. Retrieved August
              19, 2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/487077/binary"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/487077/binary
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Boolean algebra icon [SVG image]. (n.d.). SVGRepo. Retrieved
              August 19, 2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/450670/boolean"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/450670/boolean
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Burger menu icon [SVG image]. (n.d.). SVGRepo. Retrieved August
              19, 2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/506792/burger-menu-left"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/506792/burger-menu-left
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Circuit icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19,
              2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/339036/chip-circuit"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/339036/chip-circuit
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Close icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19,
              2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/510922/close-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/510922/close-sm
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Color icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19,
              2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/129276/color-palette-with-brush-for-art-education"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/129276/color-palette-with-brush-for-art-education
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Dark mode icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19,
              2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/518221/nightmode"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/518221/nightmode
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Delete icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19,
              2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/502614/delete"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/502614/delete
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Download icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19,
              2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/533682/download"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/533682/download
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Duplicate icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19,
              2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/522102/duplicate"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/522102/duplicate
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Digital clock alarm [Digital image]. (n.d.). Wikipedia. Retrieved
              August 19, 2024, from{" "}
              <Link
                className="underline"
                href="https://en.wikipedia.org/wiki/Digital_clock#/media/File:Digital-clock-alarm.jpg"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://en.wikipedia.org/wiki/Digital_clock#/media/File:Digital-clock-alarm.jpg
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              FAQ icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19, 2024,
              from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/43016/faq"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/43016/faq
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Feedback icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19,
              2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/357738/feedback"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/357738/feedback
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Final evaluation icon [SVG image]. (n.d.). SVGRepo. Retrieved
              August 19, 2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/245607/test-exam"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/245607/test-exam
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Full screen exit icon [SVG image]. (n.d.). SVGRepo. Retrieved
              August 19, 2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/521684/full-screen-exit"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/521684/full-screen-exit
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Full screen icon [SVG image]. (n.d.). SVGRepo. Retrieved August
              19, 2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/521682/full-screen"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/521682/full-screen
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Info icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19, 2024,
              from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/520799/info"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/520799/info
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Gear icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19, 2024,
              from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/495688/setting-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/495688/setting-2
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Glossary icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19,
              2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/425319/glossary"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/425319/glossary
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Law icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19, 2024,
              from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/347783/law"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/347783/law
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Layers reference icon [SVG image]. (n.d.). SVGRepo. Retrieved
              August 19, 2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/451039/layers-reference"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/451039/layers-reference
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Loading icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19,
              2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/448500/loading"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/448500/loading
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Logo [Image]. (n.d.). Logo.com. Retrieved August 19, 2024, from{" "}
              <Link
                className="underline"
                href="https://logo.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://logo.com/
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              NAND gate icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19,
              2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/322722/logic-gate-nand"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/322722/logic-gate-nand
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              NOR gate icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19,
              2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/322721/logic-gate-nor"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/322721/logic-gate-nor
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              NOT gate icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19,
              2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/322720/logic-gate-not"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/322720/logic-gate-not
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              OR gate icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19,
              2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/322724/logic-gate-or"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/322724/logic-gate-or
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Pentium 4 [Digital image]. (n.d.). Wikipedia. Retrieved August 19,
              2024, from{" "}
              <Link
                className="underline"
                href="https://en.wikipedia.org/wiki/Pentium_4"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://en.wikipedia.org/wiki/Pentium_4
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Presentation icon [SVG image]. (n.d.). SVGRepo. Retrieved August
              19, 2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/163824/presentation"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/163824/presentation
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Question icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19,
              2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/533734/question"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/533734/question
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Search icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19,
              2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/532552/search-alt-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/532552/search-alt-2
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Setting icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19,
              2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/495688/setting-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/495688/setting-2
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Traffic light [Digital image]. (n.d.). Wikipedia. Retrieved August
              19, 2024, from{" "}
              <Link
                className="underline"
                href="https://en.wikipedia.org/wiki/Traffic_light"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://en.wikipedia.org/wiki/Traffic_light
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              Truth table icon [SVG image]. (n.d.). SVGRepo. Retrieved August
              19, 2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/435957/table-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/435957/table-3
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              XOR gate icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19,
              2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/322725/logic-gate-xor"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/322725/logic-gate-xor
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body-sm">
              XNOR gate icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19,
              2024, from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/322723/logic-gate-nxor"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/322723/logic-gate-nxor
              </Link>
            </Typography>
          </li>
        </ol>
      </LessonSection>
    </LessonPage>
  );
}
