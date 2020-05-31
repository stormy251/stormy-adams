import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { colors } from "lib/theme";
import {
  fadeVariants,
  ANIMATE_VARIANT_NAME,
  INITIAL_VARIANT_NAME,
  EXIT_VARIANT_NAME,
} from "lib/framer-motion/motion-variants";
import styled from "styled-components";
import { SideBar } from "zones/home/components/SideBar";

const LayoutContainer = styled.main`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100%;
  width: 100%;
`;

const PageContentContainer = styled(motion.div)`
  box-sizing: border-box;
  padding: 2rem;
  height: 100%;
  width: 100%;
  background-color: ${colors.blueGrey.darken1};
`;

interface Props {
  /** Must be a single React node, it cannot contain a React fragment */
  children: ReactNode;
  /** String representing the requested route name */
  transitionKey: string;
}

const HomeLayout = (props: Props) => {
  const { children, transitionKey } = props;

  return (
    <LayoutContainer>
      <SideBar />
      <AnimatePresence exitBeforeEnter>
        <PageContentContainer
          key={transitionKey}
          variants={fadeVariants}
          initial={INITIAL_VARIANT_NAME}
          animate={ANIMATE_VARIANT_NAME}
          exit={EXIT_VARIANT_NAME}
        >
          {children}
        </PageContentContainer>
      </AnimatePresence>
    </LayoutContainer>
  );
};

export default HomeLayout;
