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

import { useGraphExplorerContext } from '@/features/graph-playground/contexts/GraphExplorerContext';
import {
  EDGES,
  NODES,
} from '@/features/graph-playground/data/dummyEdgesAndNodes';
import { getDagreProcessedElements } from '@/features/graph-playground/utils/graph-config-utils';

import 'reactflow/dist/style.css';

const FlowDependencyGraph: FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(EDGES);
  const { fitView } = useReactFlow();
  const { setSelectedNodeId, graphDirection, setGraphDirection } =
    useGraphExplorerContext();

  type onLayoutProps = {
    direction: string;
    useInitialNodes?: boolean;
  };

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // ELK based onLayout function.
  // const onLayout = useCallback(
  //   ({ direction, useInitialNodes = false }: onLayoutProps) => {
  //     const opts = { 'elk.direction': direction, ...elkOptions };
  //     const ns = useInitialNodes ? NODES : nodes;
  //     const es = useInitialNodes ? EDGES : edges;
  //
  //     // @ts-ignore
  //     processNodeEdgeLayout(ns, es, opts).then(
  //       // @ts-ignore
  //       ({ nodes: processedNodes, edges: processedEdges }) => {
  //         setNodes(processedNodes);
  //         setEdges(processedEdges);
  //
  //         window.requestAnimationFrame(() => fitView());
  //       }
  //     );
  //   },
  //   [nodes, edges, graphDirection]
  // );

  // Dagre based onLayout function.
  const onLayout = useCallback(
    ({ direction }: onLayoutProps) => {
      const processedElements = getDagreProcessedElements(nodes, edges, {
        direction,
      });

      setNodes([...processedElements.nodes]);
      setEdges([...processedElements.edges]);
    },
    [nodes, edges]
  );

  const handleSelectionChange = useCallback(
    (selection: OnSelectionChangeParams) => {
      if (selection?.nodes?.length) {
        const [selectedNode] = selection.nodes;
        setSelectedNodeId(selectedNode.id);
      }
    },
    []
  );

  // Rerender when the graph direction changes.
  useEffect(() => {
    onLayout({ direction: graphDirection });
    fitView();
  }, [graphDirection, fitView]);

  // Calculate the initial layout on mount.
  useEffect(() => {
    onLayout({ direction: graphDirection, useInitialNodes: true });
  }, []);

  // TODO -> Build out a header that exposes the a dropdown to select the algorithm, as well as a button to toggle vertical or horizontal orientation.
  // TODO -> Create a react context, and a custom hook to use said context. Then Wrap this component in that context, to consolidate the logic for the graph, and configuration.
  // TODO -> Within the context ^^ we should handle the "generateShareLink", function that will create a queryParam style URL that will drive the initial configuration/filters for the page when the end user loads it.
  return (
    <div className='flex h-full w-full grow rounded-lg rounded-tl-none rounded-tr-none border border-input'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        maxZoom={50}
        fitView
        onSelectionChange={handleSelectionChange}
        proOptions={{ hideAttribution: true }}
      >
        <Controls />
        <MiniMap zoomable pannable />
        <Background variant={BackgroundVariant.Dots} gap={36} size={1} />
      </ReactFlow>
    </div>
  );
};

export default function WrappedFlowDependencyGraph() {
  return (
    <ReactFlowProvider>
      <FlowDependencyGraph />
    </ReactFlowProvider>
  );
}
