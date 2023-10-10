import React, { FC, memo } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { Star, Triangle } from 'lucide-react';

import { useGraphExplorerContext } from '@/features/graph-playground/contexts/GraphExplorerContext';
import { NodeBase } from '@/features/graph-playground/utils/nodes-and-edges-utils';

export type ServiceNodeData = {
  label: string;
};

export type IServiceNode = NodeBase<ServiceNodeData>;

const ServiceNode: FC<NodeProps<ServiceNodeData>> = ({ data, id }) => {
  const { isShowingIcons, selectedNodeId } = useGraphExplorerContext();
  const isSelected = selectedNodeId === id;

  return (
    <div
      className={`flex items-center gap-2 rounded-lg border ${
        isSelected ? 'border-foreground' : 'border-input'
      } bg-secondary p-2 px-4`}
    >
      <Handle type='target' position={Position.Right} />
      {isShowingIcons && (
        <div className={`grid h-10 w-10 place-items-center rounded-lg`}>
          {isSelected ? (
            <Star color={'currentColor'} size={32} />
          ) : (
            <Triangle color={'currentColor'} size={32} />
          )}
        </div>
      )}
      {data?.label}
      <Handle type='source' position={Position.Left} />
    </div>
  );
};

export default memo(ServiceNode);
