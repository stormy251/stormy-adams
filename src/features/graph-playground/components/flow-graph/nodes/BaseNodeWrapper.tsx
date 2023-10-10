import React, { FC, PropsWithChildren, useCallback } from 'react';
import { Handle, Position } from 'reactflow';

import { useGraphExplorerContext } from '@/features/graph-playground/contexts/GraphExplorerContext';

type BaseNodeWrapperProps = {
  id: string;
};

const BaseNodeWrapper: FC<BaseNodeWrapperProps & PropsWithChildren> = ({
  children,
  id,
}) => {
  const { selectedNodeId, setSelectedNodeId } = useGraphExplorerContext();
  const isSelected = selectedNodeId === id;

  const handleNodeClick = useCallback(() => {
    setSelectedNodeId(id);
  }, [setSelectedNodeId, id]);

  return (
    <div
      onClick={handleNodeClick}
      className={`flex items-center gap-2 rounded-lg border ${
        isSelected ? 'border-foreground' : 'border-input'
      } bg-secondary p-2 px-4`}
    >
      <Handle type='target' position={Position.Right} />
      {children}
      <Handle type='source' position={Position.Left} />
    </div>
  );
};

export default BaseNodeWrapper;
