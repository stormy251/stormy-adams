import React, { FC, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  MiniMap,
  OnSelectionChangeParams,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from 'reactflow';
import { motion } from 'framer-motion';

import BiDirectionalEdge from '@/features/graph-playground/components/flow-graph/edges/BiDirectionalEdge';
import BiDirectionalNode from '@/features/graph-playground/components/flow-graph/nodes/BiDirectionalNode';
import { useGraphExplorerContext } from '@/features/graph-playground/contexts/GraphExplorerContext';
import {
  EDGES,
  NODES,
} from '@/features/graph-playground/data/dummyEdgesAndNodes';
import {
  elkOptions,
  getElkProcessedElements,
} from '@/features/graph-playground/utils/graph-config-utils';
import {
  ANIMATE_VARIANT_BINDINGS,
  fadeDownVariants,
  SLOW_TIMING,
} from '@/lib/framer-motion/motion-variants';

import 'reactflow/dist/style.css';

const edgeTypes = {
  bidirectional: BiDirectionalEdge,
};

const nodeTypes = {
  bidirectional: BiDirectionalNode,
};

type onLayoutProps = {
  direction: string;
};

const FlowDependencyGraph: FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(EDGES);
  const { fitView, viewportInitialized } = useReactFlow();
  const {
    setSelectedNodeId,
    graphDirection,
    searchText,
    shouldShowNodesWithoutDeps,
    preProcessedEdges,
    preProcessedNodes,
  } = useGraphExplorerContext();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // ELK based onLayout function.
  const onLayout = useCallback(
    ({ direction }: onLayoutProps) => {
      const opts = { 'elk.direction': direction, ...elkOptions };

      // @ts-ignore
      getElkProcessedElements(preProcessedNodes, preProcessedEdges, opts).then(
        // @ts-ignore
        ({ nodes: postProcessedNodes, edges: postProcessedEdges }) => {
          setNodes(postProcessedNodes);
          setEdges(postProcessedEdges);

          window.requestAnimationFrame(() =>
            fitView({
              maxZoom: 50,
              duration: 1000,
            })
          );
        }
      );
    },
    [preProcessedEdges, preProcessedNodes, setEdges, setNodes, fitView]
  );

  const handleSelectionChange = useCallback(
    (selection: OnSelectionChangeParams) => {
      if (selection?.nodes?.length) {
        const [selectedNode] = selection.nodes;
        setSelectedNodeId(selectedNode.id);
      }
    },
    [setSelectedNodeId]
  );

  // Rerender when the graph direction changes.
  useEffect(() => {
    if (viewportInitialized) {
      onLayout({ direction: graphDirection });
      // IMPORTANT NOTE: This is a hack, without this, the onLayout call seems to be unresponsive for initial, and some quick searching workflows.
      setTimeout(() => {
        onLayout({ direction: graphDirection });
      }, 0);
    }
  }, [
    onLayout,
    graphDirection,
    searchText,
    shouldShowNodesWithoutDeps,
    preProcessedEdges,
    preProcessedNodes,
    viewportInitialized,
  ]);

  return (
    <motion.div
      variants={fadeDownVariants}
      transition={{ delay: SLOW_TIMING * 3 }}
      {...ANIMATE_VARIANT_BINDINGS}
      className='flex h-full w-full grow rounded-lg rounded-tl-none rounded-tr-none border border-input'
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        onSelectionChange={handleSelectionChange}
        proOptions={{ hideAttribution: true }}
      >
        <Controls />
        <MiniMap zoomable pannable />
        <Background variant={BackgroundVariant.Dots} gap={32} size={1} />
      </ReactFlow>
    </motion.div>
  );
};

export default function WrappedFlowDependencyGraph() {
  return (
    <ReactFlowProvider>
      <FlowDependencyGraph />
    </ReactFlowProvider>
  );
}
