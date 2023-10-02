import { Edge, Node } from 'reactflow';
import Dagre from '@dagrejs/dagre';
import ELK, { ElkExtendedEdge } from 'elkjs/lib/elk.bundled';
import { LayoutOptions } from 'elkjs/lib/elk-api';

export enum ElkGraphExplorerDirection {
  Horizontal = 'HORIZONTAL',
  Vertical = 'VERTICAL',
}

export type dagreProcessGraphOptions = {
  direction: string; // NOTE: This type sucks, but its just not coming strictly defined within the lib... Link to docs: https://github.com/dagrejs/dagre/wiki#configuring-the-layout
};

// ----------------------------
// ---- Dagre algo section ----
// ----------------------------
const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

export const getDagreProcessedElements = (
  nodes: Node<any, string | undefined>[],
  edges: Edge<any>[],
  options: dagreProcessGraphOptions
) => {
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  // @ts-ignore - dagre fails if I adhere to the types here, I believe it is an incorrect typing within the lib.
  nodes.forEach((node) => g.setNode(node.id, node));

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

// --------------------------
// ---- Elk algo section ----
// --------------------------
const elk = new ELK();

// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
// QUICK REFERENCE: elk.algorithm = [ 'layered', 'stress', 'mrtree', 'radial', 'force', 'disco', 'box', 'fixed', 'random' ]
export const elkOptions = {
  'elk.algorithm': 'force',
  'elk.spacing.nodeNode': '20',
};

export const getElkProcessedElements = async (
  nodes: Node[],
  edges: ElkExtendedEdge[],
  options?: LayoutOptions
) => {
  const isHorizontal =
    options?.['elk.direction'] === ElkGraphExplorerDirection.Horizontal;
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
