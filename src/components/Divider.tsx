// next js
import { useRouter } from "next/router";

// tailwind merge in order to merge added classes
import { twMerge } from "tailwind-merge";

interface IProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHRElement>,
    HTMLHRElement
  > {
  darkcolor?: boolean;
}

const Divider: React.FC<IProps> = (props) => {
  const router = useRouter();
  const { className, darkcolor = false, ...rest } = props;

  return (
    <hr
      className={twMerge(`my-4`, className)}
      style={{
        flexShrink: 0,
        borderTop: darkcolor
          ? "0px solid rgba(255, 255, 255, 0.08)"
          : "0px solid rgba(0, 0, 0, 0.08)",
        borderRight: darkcolor
          ? "0px solid rgba(255, 255, 255, 0.08)"
          : "0px solid rgba(0, 0, 0, 0.08)",
        borderLeft: darkcolor
          ? "0px solid rgba(255, 255, 255, 0.08)"
          : "0px solid rgba(0, 0, 0, 0.08)",
        height: "0.0625rem",
        borderBottom: "none",
        opacity: 0.25,
        backgroundColor: "transparent",
        backgroundImage: darkcolor
          ? "linear-gradient(to right, rgba(0, 0, 0, 0), rgb(0, 0, 0), rgba(0, 0, 0, 0))"
          : "linear-gradient(to right, rgba(255, 255, 255, 0), rgb(255, 255, 255), rgba(255, 255, 255, 0))",
      }}
      {...rest}
    />
  );
};

export default Divider;
