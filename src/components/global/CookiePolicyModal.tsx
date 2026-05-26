"use client";

import { Button } from "@src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import { Typography } from "@src/components/ui/typography";
import { useUserPreferencesStore } from "@src/stores/user-preferences";

interface CookiePolicyModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CookiePolicyModal({
  isModalOpen,
  setIsModalOpen,
}: CookiePolicyModalProps) {
  const setHasAcceptedCookies = useUserPreferencesStore(
    (state) => state.setHasAcceptedCookies,
  );

  if (!isModalOpen) {
    return null;
  }

  const handleAcknowledge = () => {
    setHasAcceptedCookies(true);
    setIsModalOpen(false);
  };

  return (
    <Card className="fixed bottom-5 right-5 z-70 max-w-[400px] shadow-lg">
      <CardHeader>
        <CardTitle>Cookie Policy</CardTitle>
        <CardDescription>How we use cookies on CircuLearn</CardDescription>
      </CardHeader>
      <CardContent>
        <Typography variant="body-sm">
          I use cookies only for essential preferences (such as theme). Quiz
          answers are graded in your browser and are not stored on our servers.
        </Typography>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAcknowledge} className="w-full">
          I understand
        </Button>
      </CardFooter>
    </Card>
  );
}
