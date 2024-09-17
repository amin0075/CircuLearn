import React from "react";
import Modal from "@src/components/Modal";
import Typography from "@src/components/Typography";
import Button from "@src/components/Button";
import { useThemeStore } from "@src/zustand_stores/Theme";

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CookiePolicyModal: React.FC<IProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const { setHasAcceptedCookies } = useThemeStore((state) => state);

  const handleAcknowledge = () => {
    setHasAcceptedCookies(true);
    setIsModalOpen(false);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className="max-w-[400px] relative"
    >
      <div className="flex flex-col gap-4 p-4">
        <Typography variant="h4" className="text-center">
          Cookie Policy
        </Typography>
        <Typography variant="body2">
          I only use cookies to store the results of your quizzes and feedback.
          This data is anonymous and used solely to improve your experience.
        </Typography>
        <Button
          variant="contained"
          className="self-center"
          onClick={handleAcknowledge}
        >
          <Typography variant="body2">I understand</Typography>
        </Button>
      </div>
    </Modal>
  );
};

export default CookiePolicyModal;
