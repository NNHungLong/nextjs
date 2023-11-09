import { useState } from 'react';

import Layout from '../../components/layout';
import PageTitle from '../../components/pageTitle';
import { portfolioData } from '../../data/portfolio';
import { motion } from 'framer-motion';
import ImageContainer from '../../components/imageContainer';

import Modal from '../../components/modal';
import ModalWrapper from '../../components/ModalWrapper';
import Image from 'next/image';

interface PortfolioData {
  item: {
    id: string;
    title: string;
    description: string;
    src?: string;
  };
}

interface ProjectCardOnClick {
  onClick?: () => void;
}

interface ProjectCardProps {
  item: PortfolioData['item'];
  onClick: ProjectCardOnClick['onClick'];
}

function ProjectCard({ item, onClick }: ProjectCardProps) {
  return (
    <div className='flex flex-col gap-2 items-center cursor-pointer mb-4'>
      <motion.div layoutId={`project_id_${item?.id}`} onClick={onClick}>
        <ImageContainer
          src={item?.src}
          alt={item?.title}
          containerClassName='h-[300px] rounded-lg shadow-xl'
          imageClassName='hover:scale-125 transition-all duration-200 ease-linear'
        />
      </motion.div>
      <p className='font-bold text-lg'>{item?.title}</p>
    </div>
  );
}

export default function Portfolio() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioData['item']>(null);
  return (
    <Layout>
      <PageTitle text='Portfolio' />
      <div className='inline-flex flex-wrap gap-2 justify-around items-center'>
        {portfolioData.map((item) => (
          <ProjectCard
            key={item?.id}
            item={item}
            onClick={() => {
              setSelectedItem(item);
              setIsOpen((prev) => !prev);
            }}
          />
        ))}
      </div>
      <ModalWrapper isShowing={isOpen}>
        <Modal containerClassName='' hideModal={() => setIsOpen(false)}>
          {selectedItem && (
            <div className='inline-flex flex-col gap-4'>
              <motion.div
                className='h-[400px] shrink-0 flex justify-center items-center'
                layoutId={`project_id_${selectedItem?.id}`}
              >
                <Image
                  className='h-[400px] w-auto'
                  src={selectedItem?.src}
                  alt={selectedItem?.title}
                  width={400}
                  height={500}
                />
              </motion.div>
              <div className='flex flex-col justify-start items-center'>
                <p className='text-center font-bold text-lg'>
                  {selectedItem?.title}
                </p>
                <p className='max-w-1/3 text-sm text-gray-500'>
                  {selectedItem?.description}
                </p>
              </div>
            </div>
          )}
        </Modal>
      </ModalWrapper>
    </Layout>
  );
}
