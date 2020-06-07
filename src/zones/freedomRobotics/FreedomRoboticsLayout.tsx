import React, {ReactNode} from 'react';
import styled from 'styled-components';

const PageContentContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;

interface Props {
  /** Must be a single React node, it cannot contain a React fragment */
  children: ReactNode;
}

const FreedomRoboticsLayout = (props: Props) => {
  const {children} = props;

  return <PageContentContainer>{children}</PageContentContainer>;
};

export default FreedomRoboticsLayout;
