import React, {ReactNode} from 'react';

interface Props {
  /** Must be a single React node, it cannot contain a React fragment */
  children: ReactNode;
}

const FreedomRoboticsLayout = (props: Props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

export default FreedomRoboticsLayout;
