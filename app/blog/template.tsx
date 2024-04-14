'use client'
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type TemplateProps = {
  children: ReactNode;
};


export default function Template({ children }: TemplateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}