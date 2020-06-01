import React, {ReactNode} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import styled from 'styled-components';
import {ModalContextProvider} from './contexts/ModalContext';
import ModalOutlet from './components/ModalOutlet';

interface Props {
  /** Must be a single React node, it cannot contain a React fragment */
  children: ReactNode;
  /** String representing the layout type */
  layoutKey: string;
}

const parentVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  },
  hidden: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1
    }
  }
};

const AppContainer = styled(motion.div)`
  box-sizing: border-box;
  height: 100%;
  margin: 0;
  overflow-y: hidden;
  width: 100%;
`;

/**
 * This component is responsible for managing layout changes,
 * as well as facilitating a predictable pattern for global services such as modals/notifications/etc...
 */
const AppLayout = (props: Props) => {
  const {children, layoutKey} = props;

  return (
    <ModalContextProvider>
      <AnimatePresence exitBeforeEnter>
        <AppContainer
          variants={parentVariants}
          key={layoutKey}
          initial={false}
          animate="visible"
          exit="hidden"
        >
          {children}
          <ModalOutlet />
        </AppContainer>
      </AnimatePresence>
    </ModalContextProvider>
  );
};

export default AppLayout;
