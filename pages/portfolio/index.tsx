import { useState } from 'react';

import Layout from '../../components/layout';
import PageTitle from '../../components/pageTitle';
import { portfolioData } from '../../data/portfolio';
import { motion } from 'framer-motion';
import ImageContainer from '../../components/imageContainer';

import Modal from '../../components/modal';
import ModalWrapper from '../../components/ModalWrapper';

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
          className='h-[300px]'
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
        <Modal hideModal={() => setIsOpen(false)}>
          {selectedItem && (
            <motion.div layoutId={`project_id_${selectedItem?.id}`}>
              <ImageContainer
                src={selectedItem?.src}
                alt={selectedItem?.title}
                className='h-[300px]'
              />
            </motion.div>
          )}
        </Modal>
      </ModalWrapper>
    </Layout>
  );
}
