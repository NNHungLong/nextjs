import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';

interface ModalWrapperProps {
  children: ReactNode;
  isShowing: boolean;
}

const ModalWrapper = ({ children, isShowing }: ModalWrapperProps) => {
  if (typeof document === 'object') {
    return createPortal(
      <AnimatePresence mode='wait'>{isShowing && children}</AnimatePresence>,
      document.body
    );
  }
};

export default ModalWrapper;
