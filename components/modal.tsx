import { motion } from 'framer-motion';

const Backdrop = ({ onClick }) => {
  return (
    <motion.div
      key='modal'
      onClick={onClick}
      className='absolute inset-0 bg-gray-600 bg-opacity-80 backdrop-blur-sm'
    />
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
  containerClassName?: string;
}

export default function Modal({
  hideModal,
  children,
  containerClassName,
}: ModalProps) {
  return (
    <motion.div
      className='fixed inset-0 z-50 inline-flex justify-center items-center'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Backdrop onClick={hideModal} />
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={`max-h-[80vh] p-10 overflow-auto bg-white rounded-lg shadow-2xl text-gray-900 max-w-[70vw] ${containerClassName}`}
        variants={dropIn}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        {children}

        <button
          type='button'
          className='absolute right-2 top-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center'
          onClick={hideModal}
        >
          <svg
            className='w-3 h-3'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
            />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}
