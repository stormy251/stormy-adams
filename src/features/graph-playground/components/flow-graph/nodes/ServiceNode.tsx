import React, { FC, memo } from 'react';
import { NodeProps } from 'reactflow';
import { Star, Triangle } from 'lucide-react';

import BaseNodeWrapper from '@/features/graph-playground/components/flow-graph/nodes/BaseNodeWrapper';
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
    <BaseNodeWrapper id={id}>
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
    </BaseNodeWrapper>
  );
};

export default memo(ServiceNode);
