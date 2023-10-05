import React, { FC } from 'react';
import {
  BaseEdge,
  EdgeProps,
  getBezierPath,
  ReactFlowState,
  useStore,
} from 'reactflow';

export type GetBidirectionalPathParams = {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
};

export const getBidirectionalPath = (
  { sourceX, sourceY, targetX, targetY }: GetBidirectionalPathParams,
  offset: number
) => {
  const centerX = (sourceX + targetX) / 2;
  const centerY = (sourceY + targetY) / 2;

  return `M ${sourceX} ${sourceY} Q ${centerX} ${
    centerY + offset
  } ${targetX} ${targetY}`;
};

const BiDirectionalEdge: FC<EdgeProps> = ({
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}) => {
  const isBiDirectionEdge = useStore((s: ReactFlowState) => {
    const doesEdgeExist = s.edges.some(
      (e) =>
        (e.source === target && e.target === source) ||
        (e.target === source && e.source === target)
    );

    return doesEdgeExist;
  });

  const edgePathParams = {
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  };

  let path = '';

  if (isBiDirectionEdge) {
    path = getBidirectionalPath(edgePathParams, sourceX < targetX ? 25 : -25);
  } else {
    [path] = getBezierPath(edgePathParams);
  }

  return <BaseEdge path={path} markerEnd={markerEnd} />;
};

export default BiDirectionalEdge;
