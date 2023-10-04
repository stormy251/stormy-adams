import React, { FC, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  OnSelectionChangeParams,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from 'reactflow';
import { motion } from 'framer-motion';

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

type FlowDependencyGraphProps = {
  initialEdges?: Edge[];
  initialNodes?: Node[];
};

const FlowDependencyGraph: FC<FlowDependencyGraphProps> = ({
  initialEdges = EDGES,
  initialNodes = NODES,
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(EDGES);
  const { fitView, viewportInitialized } = useReactFlow();
  const {
    setSelectedNodeId,
    graphDirection,
    searchText,
    shouldShowNodesWithoutDeps,
  } = useGraphExplorerContext();

  type onLayoutProps = {
    direction: string;
  };

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // ELK based onLayout function.
  const onLayout = useCallback(
    ({ direction }: onLayoutProps) => {
      const opts = { 'elk.direction': direction, ...elkOptions };

      // Step 1: Filter out nodes that don't contain a label with a substring of the searchText.
      // NOTE: If there is no search text, then we can just use the initial nodes.
      const searchFilteredNodes = !searchText
        ? initialNodes
        : initialNodes.filter((node) => {
            return node.data.label
              .toLowerCase()
              .includes(searchText.toLowerCase());
          });

      const searchFilteredNodesIds = searchFilteredNodes.map((node) => node.id);

      const activeSearchConnectedNodeEdgeIndex = new Map();
      const filteredEdges = initialEdges.filter((edge) => {
        // Here we are building out a map index, to keep the time complexity a little lower.
        const isEdgeConnectingSearchFilteredNodes =
          searchFilteredNodesIds.includes(edge.source) &&
          searchFilteredNodesIds.includes(edge.target);
        if (isEdgeConnectingSearchFilteredNodes) {
          activeSearchConnectedNodeEdgeIndex.set(edge.source, true);
        }

        // Likely to be other
        if (!searchText) {
          return true;
        }

        return isEdgeConnectingSearchFilteredNodes;
      });

      const filteredNodes = searchFilteredNodes.filter((node) => {
        // Step 2: Filter out nodes that don't have any edges, depending on the shouldShowNodesWithoutDeps flag.
        if (!shouldShowNodesWithoutDeps) {
          return activeSearchConnectedNodeEdgeIndex.has(node.id);
        }

        return true;
      });

      // @ts-ignore
      getElkProcessedElements(filteredNodes, filteredEdges, opts).then(
        // @ts-ignore
        ({ nodes: processedNodes, edges: processedEdges }) => {
          setNodes(processedNodes);
          setEdges(processedEdges);

          window.requestAnimationFrame(() =>
            fitView({
              maxZoom: 50,
              duration: 1000,
            })
          );
        }
      );
    },
    [
      initialEdges,
      initialNodes,
      setEdges,
      setNodes,
      fitView,
      searchText,
      shouldShowNodesWithoutDeps,
    ]
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
