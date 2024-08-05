// react
import React, { ReactNode, useEffect, useState } from "react";

// next js
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

// components

interface IProps {
  children?: ReactNode;
}

const ChatBox: React.FC<IProps> = () => {
  const router = useRouter();

  return <div className="">chatbox</div>;
};

export default ChatBox;
