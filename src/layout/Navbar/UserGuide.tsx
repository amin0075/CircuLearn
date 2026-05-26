"use client";

import Link from "next/link";

import { Button } from "@src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@src/components/ui/dialog";
import { Typography } from "@src/components/ui/typography";
import { useUserPreferencesStore } from "@src/stores/user-preferences";

interface UserGuideProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserGuide = ({ isModalOpen, setIsModalOpen }: UserGuideProps) => {
  const hasSeenUserGuide = useUserPreferencesStore(
    (state) => state.hasSeenUserGuide,
  );
  const setHasSeenUserGuide = useUserPreferencesStore(
    (state) => state.setHasSeenUserGuide,
  );

  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open && !hasSeenUserGuide) {
      setHasSeenUserGuide(true);
    }
  };

  const closeModal = () => handleOpenChange(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[min(85vh,40rem)] overflow-y-auto sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Welcome to CircuLearn!</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-1">
          <Typography variant="body-sm">
            Explore the fundamentals of logic circuits with my interactive app.
            Here’s how to get started:
          </Typography>

          <Typography variant="body-sm" fontWeight="semibold">
            Navigation:
          </Typography>
          <ul className="flex list-disc flex-col pl-4">
            <li>
              <Typography variant="body-xs">
                Use the sidebar to access sections like Basic Concepts, Gates,
                and Final Step.
              </Typography>
            </li>
            <li>
              <Typography variant="body-xs">
                Click on each section for detailed content and interactive
                simulations.
              </Typography>
            </li>
          </ul>

          <Typography variant="body-sm" fontWeight="semibold">
            Interactive Features:
          </Typography>
          <ul className="flex list-disc flex-col pl-4">
            <li>
              <Typography variant="body-xs">
                Engage with simulations by toggling switches to see real-time
                outputs.
              </Typography>
            </li>
            <li>
              <Typography variant="body-xs">
                Test your knowledge with quizzes at the end of each section.
              </Typography>
            </li>
          </ul>

          <Typography variant="body-sm" fontWeight="semibold">
            Final Step:
          </Typography>
          <Typography variant="body-xs">
            After completing the learning sections, take the quiz under Final
            Step. You will see your score and a question-by-question review on
            the same page; nothing is uploaded to a server.
          </Typography>

          <Typography variant="body-sm" fontWeight="semibold">
            Explore the{" "}
            <Link
              href="/simulator"
              className="text-primary underline"
              onClick={closeModal}
            >
              Simulator
            </Link>
            :
          </Typography>
          <Typography variant="body-xs">
            After the quiz, try the Simulator to create and experiment with your
            own logic circuits.
          </Typography>

          <Typography variant="body-sm" fontWeight="semibold">
            FAQ & Glossary:
          </Typography>
          <Typography variant="body-xs">
            Visit the FAQ for common questions and the Glossary for key terms.
          </Typography>

          <Typography variant="body-sm" fontWeight="semibold">
            Need Help or Have Questions About Logic Gates?
          </Typography>
          <Typography variant="body-xs">
            If you have additional questions about the lessons or concepts
            related to logic gates, email{" "}
            <Link
              href="mailto:aminkeshavarzi.dev@gmail.com"
              className="underline"
            >
              aminkeshavarzi.dev@gmail.com
            </Link>{" "}
            or use the Contact page in the navigation bar.
          </Typography>

        </div>
        <DialogFooter className="mt-2 sm:justify-center">
          <DialogClose asChild>
            <Button className="min-w-[140px]">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserGuide;
