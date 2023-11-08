import { motion } from 'framer-motion';

const Backdrop = ({ onClick, children }) => {
  return (
    <motion.div
      key='modal'
      onClick={onClick}
      className='fixed inset-0 bg-gray-600 bg-opacity-80 z-50'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};

interface ModalProps {
  hideModal: () => void;
  children?: React.ReactNode;
}

export default function Modal({ hideModal, children }: ModalProps) {
  return (
    <Backdrop onClick={hideModal}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className='modal bg-orange-500'
        variants={dropIn}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        <p>modal here</p>
        <button onClick={hideModal}>Close</button>
        {children}
      </motion.div>
    </Backdrop>
  );
}
