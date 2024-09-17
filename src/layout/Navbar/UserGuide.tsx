import React, { ReactNode } from "react";
import Link from "next/link";
import Typography from "@src/components/Typography";
import Button from "@src/components/Button";
import IconButton from "@src/components/IconButton";
import Modal from "@src/components/Modal";
import { Close } from "@src/assets/icons";
import { textColor } from "@src/utils/colorUtils";
import { useThemeStore } from "@src/zustand_stores/Theme";

interface IProps {
  children?: ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserGuide: React.FC<IProps> = ({ isModalOpen, setIsModalOpen }) => {
  const { primaryColor, setFirstVisit } = useThemeStore((state) => state);

  const handleClose = () => {
    setIsModalOpen(false);
    if (setFirstVisit) {
      setFirstVisit(false);
    }
  };
  return (
    <Modal
      className="max-w-[471px] relative"
      isOpen={isModalOpen}
      onClose={handleClose}
    >
      <div className="flex flex-col gap-1 mt-4">
        <Typography variant="h4" className="text-center">
          Welcome to CircuLearn!
        </Typography>
        <Typography variant="body2">
          Explore the fundamentals of logic circuits with my interactive app.
          Here’s how to get started:
        </Typography>

        {/* Main Navigation */}
        <Typography variant="body2" fontweight="semiBold">
          Navigation:
        </Typography>
        <ul className="flex flex-col list-disc pl-4 dark:text-white">
          <li>
            <Typography variant="caption">
              Use the sidebar to access sections like Basic Concepts, Gates, and
              Final Step.
            </Typography>
          </li>
          <li>
            <Typography variant="caption">
              Click on each section for detailed content and interactive
              simulations.
            </Typography>
          </li>
        </ul>

        {/* Interactive Features */}
        <Typography variant="body2" fontweight="semiBold">
          Interactive Features:
        </Typography>
        <ul className="flex flex-col list-disc pl-4 dark:text-white">
          <li>
            <Typography variant="caption">
              Engage with simulations by toggling switches to see real-time
              outputs.
            </Typography>
          </li>
          <li>
            <Typography variant="caption">
              Test your knowledge with quizzes at the end of each section.
            </Typography>
          </li>
        </ul>

        {/* Final Step */}
        <Typography variant="body2" fontweight="semiBold">
          Final Step:
        </Typography>
        <Typography variant="caption">
          After completing the learning sections, take the quiz and provide
          feedback. Your responses are anonymous and help improve the app.
        </Typography>

        {/* Simulator */}
        <Typography variant="body2" fontweight="semiBold">
          Explore the{" "}
          <Link
            href="/simulator"
            className={`${textColor(primaryColor)} underline`}
            onClick={handleClose}
          >
            Simulator
          </Link>
          :
        </Typography>
        <Typography variant="caption">
          After the quiz, try the Simulator to create and experiment with your
          own logic circuits.
        </Typography>

        {/* Additional Resources */}
        <Typography variant="body2" fontweight="semiBold">
          FAQ & Glossary:
        </Typography>
        <Typography variant="caption">
          Visit the FAQ for common questions and the Glossary for key terms.
        </Typography>

        {/* Help Section */}
        <Typography variant="body2" fontweight="semiBold">
          Need Help?
        </Typography>
        <Typography variant="caption">
          Contact me at{" "}
          <Link href="mailto:2314378@chester.ac.uk" className="underline">
            2314378@chester.ac.uk
          </Link>{" "}
          for any questions or issues.
        </Typography>

        <Button
          variant="contained"
          className="max-w-[140px] self-center mt-3"
          onClick={handleClose}
        >
          <Typography className="text-white" variant="body2">
            Close
          </Typography>
        </Button>
      </div>
      <IconButton
        onClick={handleClose}
        className="absolute top-2 right-2 p-0 dark:text-white text-black"
      >
        <Close className="w-8 h-8" />
      </IconButton>
    </Modal>
  );
};

export default UserGuide;
