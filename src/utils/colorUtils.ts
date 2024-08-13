// types
import { IColor } from "@src/@types/color";

const textColor = (color: IColor) => {
  switch (color) {
    case "orange":
      return "text-primary-orange dark:text-primary-orange";
    case "blue":
      return "text-primary-blue dark:text-primary-blue";
    case "green":
      return "text-primary-green dark:text-primary-green";
    case "red":
      return "text-primary-red dark:text-primary-red";
    case "purple":
      return "text-primary-purple dark:text-primary-purple";
    default:
      return "text-primary-red dark:text-primary-red";
  }
};

const borderColor = (color: IColor) => {
  switch (color) {
    case "orange":
      return "border-primary-orange hover:border-primary-orange/50";
    case "blue":
      return "border-primary-blue hover:border-primary-blue/50";
    case "green":
      return "border-primary-green hover:border-primary-green/50";
    case "red":
      return "border-primary-red hover:border-primary-red/50";
    case "purple":
      return "border-primary-purple hover:border-primary-purple/50";
    default:
      return "border-primary-red hover:border-primary-red/50";
  }
};

const bgGradient = (color: IColor) => {
  switch (color) {
    case "orange":
      return "bg-gradientOrange";
    case "blue":
      return "bg-gradientBlue";
    case "green":
      return "bg-gradientGreen";
    case "red":
      return "bg-gradientRed";
    case "purple":
      return "bg-gradientPurple";
    default:
      return "bg-gradientRed";
  }
};

const bgColor = (color: IColor, opacity?: string) => {
  switch (color) {
    case "orange":
      return "bg-primary-orange" + (opacity ? `/[${opacity}]` : "");
    case "blue":
      return "bg-primary-blue" + (opacity ? `/[${opacity}]` : "");
    case "green":
      return "bg-primary-green" + (opacity ? `/[${opacity}]` : "");
    case "red":
      return "bg-primary-red" + (opacity ? `/[${opacity}]` : "");
    case "purple":
      return "bg-primary-purple" + (opacity ? `/[${opacity}]` : "");
    default:
      return "bg-primary-red" + (opacity ? `/[${opacity}]` : "");
  }
};

const fillColor = (color: IColor) => {
  switch (color) {
    case "orange":
      return "[&_path]:fill-primary-orange";
    case "blue":
      return "[&_path]:fill-primary-blue";
    case "green":
      return "[&_path]:fill-primary-green";
    case "red":
      return "[&_path]:fill-primary-red";
    case "purple":
      return "[&_path]:fill-primary-purple";
    default:
      return "[&_path]:fill-primary-red";
  }
};

const strokeColor = (color: IColor) => {
  switch (color) {
    case "orange":
      return "[&_path]:stroke-primary-orange";
    case "blue":
      return "[&_path]:stroke-primary-blue";
    case "green":
      return "[&_path]:stroke-primary-green";
    case "red":
      return "[&_path]:stroke-primary-red";
    case "purple":
      return "[&_path]:stroke-primary-purple";
    default:
      return "[&_path]:stroke-primary-red";
  }
};

const hexColor = (color: IColor) => {
  switch (color) {
    case "orange":
      return "#ffb547";
    case "blue":
      return "#0077ff";
    case "green":
      return "#01b573";
    case "red":
      return "#e31a1a";
    case "purple":
      return "#4218ff";
    default:
      return "#e31a1a";
  }
};

// const invoiceStatusColor = (status: IInvoiceStatus) => {
//   switch (status) {
//     case "waiting":
//       return "orange";
//     case "sending":
//       return "blue";
//     case "rejected":
//       return "red";
//     case "processing":
//       return "blue";
//     case "failed":
//       return "red";
//     case "finished":
//       return "green";
//     default:
//       return "blue";
//   }
// };

export {
  bgGradient,
  strokeColor,
  fillColor,
  bgColor,
  textColor,
  borderColor,
  hexColor,
  // invoiceStatusColor,
};
