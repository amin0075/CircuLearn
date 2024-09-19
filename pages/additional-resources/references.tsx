import React from "react";
import Head from "next/head";
import Typography from "@src/components/Typography";
import Paper from "@src/components/Paper";
import Link from "next/link";

const References = () => {
  return (
    <>
      <Head>
        <title>References</title>
        <meta name="description" content="References page" />
      </Head>
      <Paper className="w-full flex flex-col gap-4 p-4 min-h-full">
        <Typography variant="h2">References</Typography>

        {/* Content Sections */}
        <Typography variant="h4" className="mt-4">
          Content Sections
        </Typography>
        <ul className="list-decimal pl-6 flex flex-col gap-4">
          <li>
            <Typography variant="body2">
              Brown, T., Mann, B., Ryder, N., Subbiah, M., Kaplan, J., Dhariwal,
              P., ... & Amodei, D. (2020). Language models are few-shot
              learners.{" "}
              <em>Advances in Neural Information Processing Systems, 33</em>,
              1877-1901.{" "}
              <Link
                className="underline"
                href="https://arxiv.org/abs/2005.14165"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://arxiv.org/abs/2005.14165
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Clark, R. C., & Mayer, R. E. (2016).{" "}
              <em>
                E-learning and the science of instruction: Proven guidelines for
                consumers and designers of multimedia learning
              </em>{" "}
              (4th ed.). Wiley.
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
              Mano, M. M., Kime, C. R., & Martin, T. (2015).{" "}
              <em>Logic and computer design fundamentals</em> (5th ed.).
              Pearson.
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Nielsen, J. (1994). <em>Usability engineering</em>. Morgan
              Kaufmann.
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Norman, D. A. (2013). <em>The design of everyday things</em>{" "}
              (Revised and expanded ed.). Basic Books.
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Todorovic, D. (2008). Gestalt principles. <em>Scholarpedia, 3</em>
              (12), 5345.{" "}
              <Link
                className="underline"
                href="https://doi.org/10.4249/scholarpedia.5345"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://doi.org/10.4249/scholarpedia.5345
              </Link>
            </Typography>
          </li>
        </ul>

        {/* Icons and Images */}
        <Typography variant="h4" className="mt-4">
          Icons and Images
        </Typography>
        <ul className="list-decimal pl-6 flex flex-col gap-4">
          <li>
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
              Bot icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19, 2024,
              from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/310391/bot-add"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/310391/bot-add
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
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
            <Typography variant="body2">
              Chat icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19, 2024,
              from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/523273/chat-line"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/523273/chat-line
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
              Send icon [SVG image]. (n.d.). SVGRepo. Retrieved August 19, 2024,
              from{" "}
              <Link
                className="underline"
                href="https://www.svgrepo.com/svg/495684/send-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.svgrepo.com/svg/495684/send-1
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
            <Typography variant="body2">
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
        </ul>
      </Paper>
    </>
  );
};

export default References;
