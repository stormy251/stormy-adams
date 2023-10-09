import React, { FC, memo } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { Star, Waves } from 'lucide-react';

import { useGraphExplorerContext } from '@/features/graph-playground/contexts/GraphExplorerContext';
import { NodeBase } from '@/features/graph-playground/utils/nodes-and-edges-utils';

export type ResourceNodeData = {
  label: string;
};

export type IResourceNode = NodeBase<ResourceNodeData>;

const ResourceNode: FC<NodeProps> = ({ data, selected }) => {
  const { isShowingIcons } = useGraphExplorerContext();

  return (
    <div
      className={`flex items-center gap-2 rounded-lg border ${
        selected ? 'border-foreground' : 'border-input'
      } bg-background p-2 px-4`}
    >
      <Handle type='target' position={Position.Right} />
      {isShowingIcons && (
        <div className='grid h-10 w-10 place-items-center rounded-lg bg-accent'>
          {selected ? (
            <Star color={'currentColor'} size={32} />
          ) : (
            <Waves color={'currentColor'} size={32} />
          )}
        </div>
      )}
      {data?.label}
      <Handle type='source' position={Position.Left} />
    </div>
  );
};

export default memo(ResourceNode);
