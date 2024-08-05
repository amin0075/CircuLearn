// react
import React, { ReactNode, useEffect, useState } from "react";

// next js
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

// components
import Typography from "@src/components/Typography";
import Button from "@src/components/Button";
import Paper from "@src/components/Paper";

interface IProps {
  children?: ReactNode;
}

const Privacy: React.FC<IProps> = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Privacy page</title>
        <meta name="description" content="privacy page" />
      </Head>
      <Paper className="w-full flex flex-col gap-4 p-4 min-h-full">
        <Typography variant="h2">Privacy Policy</Typography>
        <Typography variant="body2">
          Welcome to my Privacy Policy page. I value your privacy and am
          committed to protecting your personal information. This Privacy Policy
          explains how I collect, use, and protect your data when you use my
          application. By using this service, you agree to the collection and
          use of information in accordance with this policy.
        </Typography>
        {/* Information Collection */}
        <Typography className="underline" fontweight="semiBold">
          Information Collection
        </Typography>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
          accusantium nemo autem.
        </Typography>
        {/* Use of Information */}
        <Typography className="underline" fontweight="semiBold">
          Use of Information
        </Typography>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
          accusantium nemo autem.
        </Typography>
        {/* Data Protection */}
        <Typography className="underline" fontweight="semiBold">
          Data Protection
        </Typography>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
          accusantium nemo autem.
        </Typography>
        {/* Third-Party Services */}
        <Typography className="underline" fontweight="semiBold">
          Third-Party Services
        </Typography>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
          accusantium nemo autem.
        </Typography>
        {/* User Rights */}
        <Typography className="underline" fontweight="semiBold">
          User Rights
        </Typography>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
          accusantium nemo autem.
        </Typography>
      </Paper>
    </>
  );
};

export default Privacy;
