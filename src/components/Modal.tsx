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
  onClose: () => void; // Add this to trigger parent close function
}

const Modal = forwardRef<HTMLDialogElement, IProps>(
  ({ children, className = "", isOpen, onClose, ...rest }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    // Handle modal close when clicking outside
    const handleBackdropClick = (e: MouseEvent) => {
      // Close the modal only if clicking outside the modal content
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    // Prevent body scrolling when modal is open
    useLayoutEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
        if (dialogRef.current) {
          dialogRef.current.showModal();
        }

        // Delay adding the event listener to avoid immediate closing
        setTimeout(() => {
          window.addEventListener("click", handleBackdropClick);
        }, 0);
      } else {
        document.body.style.overflow = "auto";
        if (dialogRef.current) {
          dialogRef.current.close();
        }
        window.removeEventListener("click", handleBackdropClick);
      }

      // Cleanup listener on component unmount
      return () => {
        window.removeEventListener("click", handleBackdropClick);
        document.body.style.overflow = "auto"; // Reset body overflow when unmounting
      };
    }, [isOpen, onClose]);

    return (
      <dialog
        ref={dialogRef}
        className={twMerge(
          `transition-all duration-300 ease-in-out p-5 items-center justify-center rounded-10 bg-white dark:bg-backgroundDark shadow-box-shadow-black-md custom-backdrop`,
          className,
          "backdrop:bg-black/50" // To ensure a proper backdrop
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
