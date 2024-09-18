import React, {
  ReactNode,
  useEffect,
  forwardRef,
  useRef,
  useLayoutEffect,
} from "react";
import { twMerge } from "tailwind-merge";

interface IProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement
  > {
  isOpen: boolean;
  onClose: () => void; // Add this to trigger parent close function
}

const Modal: React.FC<React.PropsWithChildren<IProps>> = ({
  children,
  className = "",
  isOpen,
  onClose,
  ...rest
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen) {
      // document.body.style.overflow = "hidden";
      if (dialog && !dialog.hasAttribute("open")) {
        console.log("here", dialog);
        dialog.showModal();
      }
    } else {
      // document.body.style.overflow = "auto";

      if (dialog && dialog.hasAttribute("open")) {
        console.log("closed", dialog, isOpen);
        dialog.close();
        onClose();
      }
    }

    return () => {
      // document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      id="modal"
      className={twMerge(
        `transition-all duration-300 ease-in-out p-5 items-center justify-center rounded-10 bg-white dark:bg-backgroundDark shadow-box-shadow-black-md custom-backdrop`,
        className,
        "backdrop:bg-black/50"
      )}
      {...rest}
    >
      {children}
    </dialog>
  );
};

Modal.displayName = "Modal";

export default Modal;
