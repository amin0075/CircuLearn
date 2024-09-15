// react
import React, { ReactNode } from "react";

// next js
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

// components
import Typography from "@src/components/Typography";
import Paper from "@src/components/Paper";

interface IProps {
  children?: ReactNode;
}

const Contact: React.FC<IProps> = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Contact page</title>
        <meta name="description" content="Contact page" />
      </Head>
      <Paper className="w-full flex flex-col gap-4 p-4 min-h-full">
        <Typography variant="h2">Contact Information</Typography>
        <Typography variant="body2">
          In the event of serious issues or complaints regarding the web
          application or research, please follow these steps:
        </Typography>
        {/* Information Collection */}
        <Typography className="underline" fontweight="semiBold">
          1. Initial Contact:
        </Typography>
        <Typography variant="body2">
          Email:{" "}
          <Link
            href="#"
            onClick={(e) => {
              window.location.href = "mailto:2314378@chester.ac.uk";
              e.preventDefault();
            }}
            className="underline"
          >
            2314378@chester.ac.uk
          </Link>{" "}
          <br /> Please address any initial concerns or complaints via email. I
          am committed to responding promptly and appropriately.
        </Typography>
        {/* Use of Information */}
        <Typography className="underline" fontweight="semiBold">
          2. Escalation Procedure:{" "}
        </Typography>
        <Typography variant="body2">
          If necessary, you may escalate the issue to: Kurt AllmanDean of the
          Faculty of Science, Business & EnterpriseUniversity of ChesterEmail:{" "}
          <Link
            href="#"
            onClick={(e) => {
              window.location.href = "mailto:k.allman@chester.ac.uk";
              e.preventDefault();
            }}
            className="underline"
          >
            k.allman@chester.ac.uk
          </Link>
        </Typography>

        <Typography variant="body1">
          Your feedback is important to ensure the quality and integrity of this
          research. Thank you for your cooperation.
        </Typography>
      </Paper>
    </>
  );
};

export default Contact;
