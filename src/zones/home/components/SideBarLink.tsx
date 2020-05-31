import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";
import { colors } from "lib/theme";
import { useRouter } from "next/router";
import Typography from "zones/app/components/Typography";

const SideBarLinkContainer = styled(motion.a)`
  display: grid;
  grid-template-columns: 10% 1fr;
  align-items: center;
  height: 3rem;
  width: 100%;

  :hover {
    cursor: pointer;
  }
`;

interface ActiveIndicatorProps {
  readonly isActive: boolean;
}

const activeIndicatorVariants = {
  active: {
    width: "40%",
  },
  inActive: {
    width: "0",
  },
};

const ActiveIndicatorContainer = styled(motion.span)<ActiveIndicatorProps>`
  display: flex;
  width: 0%;
  height: 100%;
  background-color: ${({ color }) => color || colors.red.base};
`;

interface Props {
  /** The text desired to show for the given link */
  text: string;
  /** Desired link destination URL */
  urlPath: string;
  /** String Hex value of desired active indicator color the default is red */
  activeColor?: string;
}

export const SideBarLink = (props: Props) => {
  const router = useRouter();
  const { text, urlPath, activeColor, hoverColor } = props;
  const isActive = router.asPath === urlPath;

  return (
    <Link href={urlPath}>
      <SideBarLinkContainer>
        <ActiveIndicatorContainer
          color={activeColor}
          isActive={isActive}
          variants={activeIndicatorVariants}
          animate={isActive ? "active" : "inActive"}
        />
        <Typography type="Hero" color={colors.white}>
          {text}
        </Typography>
      </SideBarLinkContainer>
    </Link>
  );
};
