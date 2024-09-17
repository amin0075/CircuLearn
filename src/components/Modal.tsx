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
  children?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = forwardRef<HTMLDialogElement, IProps>(
  ({ children, className = "", isOpen, onClose, ...rest }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useLayoutEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
        if (dialogRef.current) {
          dialogRef.current.showModal();
        }
      } else {
        document.body.style.overflow = "auto";
        if (dialogRef.current) {
          dialogRef.current.close();
          onClose();
        }
      }
      return () => {
        document.body.style.overflow = "auto";
      };
    }, [isOpen]);

    return (
      <dialog
        ref={dialogRef}
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
  }
);

Modal.displayName = "Modal";

export default Modal;
