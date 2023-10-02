import React, { FC, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  MiniMap,
  Node,
  OnSelectionChangeParams,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from 'reactflow';
import ELK, { ElkExtendedEdge } from 'elkjs/lib/elk.bundled.js';
import { LayoutOptions } from 'elkjs/lib/elk-api';

import { useGraphExplorerContext } from '@/features/graph-playground/contexts/GraphExplorerContext';
import {
  EDGES,
  NODES,
} from '@/features/graph-playground/data/dummyEdgesAndNodes';
import { GraphExplorerDirection } from '@/features/graph-playground/utils/graph-config-utils';

import 'reactflow/dist/style.css';

const elk = new ELK();

// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
// QUICK REFERENCE: elk.algorithm = [ 'layered', 'stress', 'mrtree', 'radial', 'force', 'disco', 'box', 'fixed', 'random' ]
const elkOptions = {
  'elk.algorithm': 'force',
  'elk.spacing.nodeNode': '20',
};

const processNodeEdgeLayout = async (
  nodes: Node[],
  edges: ElkExtendedEdge[],
  options?: LayoutOptions
) => {
  const isHorizontal =
    options?.['elk.direction'] === GraphExplorerDirection.Horizontal;
  const graph = {
    id: 'root',
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',

      // Hardcode a width and height for elk to use when processing the layout.
      width: 150,
      height: 50,
    })),
    edges: edges,
  };

  try {
    const processedGraph = await elk.layout(graph);
    return {
      nodes: processedGraph.children?.map((node_1) => ({
        ...node_1,
        // React Flow expects a position property on the node instead of `x`
        // and `y` fields.
        position: { x: node_1.x, y: node_1.y },
      })),

      edges: processedGraph.edges,
    };
  } catch (message) {
    return console.error(message);
  }
};

const FlowDependencyGraph: FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(EDGES);
  const { fitView } = useReactFlow();
  const { setSelectedNodeId, graphDirection, setGraphDirection } =
    useGraphExplorerContext();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  type onLayoutProps = {
    direction: GraphExplorerDirection;
    useInitialNodes?: boolean;
  };

  const onLayout = useCallback(
    ({ direction, useInitialNodes = false }: onLayoutProps) => {
      const opts = { 'elk.direction': direction, ...elkOptions };
      const ns = useInitialNodes ? NODES : nodes;
      const es = useInitialNodes ? EDGES : edges;

      // @ts-ignore
      processNodeEdgeLayout(ns, es, opts).then(
        // @ts-ignore
        ({ nodes: processedNodes, edges: processedEdges }) => {
          setNodes(processedNodes);
          setEdges(processedEdges);

          window.requestAnimationFrame(() => fitView());
        }
      );
    },
    [nodes, edges, graphDirection]
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
