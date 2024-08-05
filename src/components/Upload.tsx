// react
import { forwardRef, ReactNode, useEffect, useRef, useState } from "react";

// next js
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

// tailwind merge in order to merge added classes
import { twMerge } from "tailwind-merge";

// components
import Typography from "./Typography";
interface IProps {
  variant?: "image" | "pdf";
  label?: ReactNode;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  file: File | null;
  image?: string;
}

const Upload: React.FC<IProps> = (props) => {
  const router = useRouter();
  const {
    variant = "image",
    label,
    setFile,
    file,
    image = "/images/user-profile.jpeg",
  } = props;

  const InputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const [fileName, setfileName] = useState("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      if (variant === "image") {
        setSelectedImage(URL.createObjectURL(e.target.files![0]));
      }
      setFile(e.target.files![0]);
      setfileName(e.target.value);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-start gap-3">
      {label && label}
      {variant === "image" ? (
        <div
          onClick={() => InputRef.current?.click()}
          style={{
            backgroundImage: selectedImage
              ? `url(${selectedImage})`
              : `url(${image})`,
          }}
          className="bg-center bg-no-repeat bg-cover w-[87px] h-[87px] mb-10 rounded-md self-center cursor-pointer"
        />
      ) : (
        <div
          onClick={() => InputRef.current?.click()}
          className="border rounded-[4px] border-darkBlue-100 p-2 text-darkBlue-100 w-full flex cursor-pointer"
        >
          <Typography variant="caption" className="text-darkBlue-100">
            {file
              ? `Selected file: (${fileName.split("\\")[fileName.split("\\").length - 1]})`
              : "upload"}
          </Typography>
        </div>
      )}
      <input
        accept={
          variant === "image"
            ? "image/png, image/gif, image/jpeg, image/jpg"
            : "application/pdf"
        }
        ref={InputRef}
        onChange={handleUpload}
        type="file"
        className="hidden"
      />
    </div>
  );
};

export default Upload;
