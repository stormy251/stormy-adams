import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import Link from 'next/link';

const SideBarLinkContainer = styled(motion.a)`
  display: flex;
  align-items: center;
  height: 3rem;
  width: 100%;
`;

interface Props {
  /** The text desired to show for the given link */
  text: string;
  /** Desired link destination URL */
  urlPath: string;
}

export const SideBarLink = (props: Props) => {
  const {text, urlPath} = props;

  return (
    <Link href={urlPath}>
      <SideBarLinkContainer>
        {text}
      </SideBarLinkContainer>
    </Link>
  );
};
