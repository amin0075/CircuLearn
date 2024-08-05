import React, { ReactNode, useEffect, forwardRef, Ref, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface IProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement
  > {
  children?: ReactNode;
  isOpen: boolean;
}

const Modal = forwardRef<HTMLDialogElement, IProps>(
  ({ children, className = "", isOpen, ...rest }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
      if (dialogRef.current) {
        if (isOpen) {
          dialogRef.current.showModal();
        } else {
          dialogRef.current.close();
        }
      }
    }, [isOpen, ref]);

    return (
      <dialog
        ref={dialogRef}
        className={twMerge(
          `transition-all duration-300 ease-in-out p-5 items-center justify-center rounded-10 bg-white dark:bg-backgroundDark shadow-box-shadow-black-md`,
          className
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
