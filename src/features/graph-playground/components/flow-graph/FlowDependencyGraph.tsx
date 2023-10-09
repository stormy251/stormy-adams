import React, { FC, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  MiniMap,
  OnSelectionChangeParams,
  Panel,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from 'reactflow';
import { motion } from 'framer-motion';

import { Checkbox } from '@/features/app/components/ui/checkbox';
import BiDirectionalEdge from '@/features/graph-playground/components/flow-graph/edges/BiDirectionalEdge';
import BiDirectionalNode from '@/features/graph-playground/components/flow-graph/nodes/BiDirectionalNode';
import ResourceNode from '@/features/graph-playground/components/flow-graph/nodes/ResourceNode';
import ServiceNode from '@/features/graph-playground/components/flow-graph/nodes/ServiceNode';
import { useGraphExplorerContext } from '@/features/graph-playground/contexts/GraphExplorerContext';
import {
  elkOptions,
  getElkProcessedElements,
} from '@/features/graph-playground/utils/graph-layout-utils';
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
  service: ServiceNode,
  resource: ResourceNode,
};

type onLayoutProps = {
  direction: string;
};

const FlowDependencyGraph: FC = () => {
  const {
    setSelectedNodeId,
    isShowingIcons,
    graphDirection,
    searchText,
    shouldShowNodesWithoutDeps,
    preProcessedEdges,
    preProcessedNodes,
    setShouldShowNodesWithoutDeps,
    setIsShowingIcons,
  } = useGraphExplorerContext();
  const [nodes, setNodes, onNodesChange] = useNodesState(preProcessedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(preProcessedEdges);
  const { fitView, viewportInitialized } = useReactFlow();

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
        maxZoom={50}
        nodesConnectable={false}
      >
        <Controls />
        <MiniMap zoomable pannable nodeBorderRadius={8} />
        <Background variant={BackgroundVariant.Dots} gap={32} size={1} />
        <Panel position='top-right'>
          <div className='flex flex-col gap-2 rounded-lg border border-input bg-background p-2 shadow-md'>
            <h4 className='text-center'>Graph Options</h4>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='without-deps-toggle'
                checked={shouldShowNodesWithoutDeps}
                onCheckedChange={(checked) =>
                  setShouldShowNodesWithoutDeps(checked as boolean)
                }
              />
              <label
                htmlFor='without-deps-toggle'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Show disconnected
              </label>
            </div>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='show-icons-toggle'
                checked={isShowingIcons}
                onCheckedChange={(checked) =>
                  setIsShowingIcons(checked as boolean)
                }
              />
              <label
                htmlFor='show-icons-toggle'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Show icons
              </label>
            </div>
          </div>
        </Panel>
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
