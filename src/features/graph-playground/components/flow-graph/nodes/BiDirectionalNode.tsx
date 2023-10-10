import React, { FC, memo } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

// TODO -> Implement this node, may need to use a different baseWrapper, to fine tune the Handle positions.
const BiDirectionalNode: FC<NodeProps> = ({ data }) => {
  return (
    <div className='rounded-lg border border-foreground p-2 px-4'>
      <Handle type='source' position={Position.Left} id='left' />
      {data?.label}
      <Handle type='source' position={Position.Right} id='right' />
    </div>
  );
};

export default memo(BiDirectionalNode);
