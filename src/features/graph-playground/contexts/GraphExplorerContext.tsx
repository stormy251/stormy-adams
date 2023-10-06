'use client';

import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Edge, Node } from 'reactflow';

import { ReactSetState } from '@/features/app/types/react-types';
import {
  EDGES,
  NODES,
} from '@/features/graph-playground/data/dummyEdgesAndNodes';
import { ElkGraphExplorerDirection } from '@/features/graph-playground/utils/graph-layout-utils';

type GraphExplorerContext = {
  graphDirection: string;
  setGraphDirection: ReactSetState<string>;
  shouldShowNodesWithoutDeps: boolean;
  setShouldShowNodesWithoutDeps: ReactSetState<boolean>;
  searchText: string;
  setSearchText: ReactSetState<string>;
  isShowingIcons: boolean;
  setIsShowingIcons: ReactSetState<boolean>;
  selectedNodeId: string | null;
  setSelectedNodeId: ReactSetState<string | null>;
  generateShareLink: () => string;
  preProcessedNodes: Node<any>[];
  preProcessedEdges: Edge<any>[];
};

// NOTE: The use of as here, is because it really doesn't matter what you provide to this export, given the provider is used directly.
export const GraphExplorerContext = createContext<GraphExplorerContext>(
  {} as GraphExplorerContext
);

export const useGraphExplorerContext = () => {
  const context = useContext(GraphExplorerContext);

  if (!context) {
    throw new Error(
      'useGraphExplorerContext must be used within a GraphExplorerContext'
    );
  }

  return context;
};

export const GraphExplorerContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [shouldShowNodesWithoutDeps, setShouldShowNodesWithoutDeps] =
    useState<GraphExplorerContext['shouldShowNodesWithoutDeps']>(true);
  const [isShowingIcons, setIsShowingIcons] =
    useState<GraphExplorerContext['isShowingIcons']>(true);
  const [graphDirection, setGraphDirection] = useState<
    GraphExplorerContext['graphDirection']
  >(ElkGraphExplorerDirection.Vertical);
  const [searchText, setSearchText] =
    useState<GraphExplorerContext['searchText']>('');
  const [selectedNodeId, setSelectedNodeId] =
    useState<GraphExplorerContext['selectedNodeId']>(null);

  // NOTE: Today, these nodes and edges are driven by hard coded data, but in the future, we will want to use the data from the API.
  const [preProcessedNodes, preProcessedEdges] = useMemo(() => {
    // Step 1: Filter out nodes that don't contain a label with a substring of the searchText.
    // NOTE: If there is no search text, then we can just use the initial nodes.
    const searchFilteredNodes = !searchText
      ? NODES
      : NODES.filter((node) => {
          return node.data.label
            .toLowerCase()
            .includes(searchText.toLowerCase());
        });

    const searchFilteredNodesIds = searchFilteredNodes.map((node) => node.id);

    const activeSearchConnectedNodeEdgeIndex = new Map();
    const filteredEdges = EDGES.filter((edge) => {
      // Here we are building out a map index, to keep the time complexity a little lower.
      const isEdgeConnectingSearchFilteredNodes =
        searchFilteredNodesIds.includes(edge.source) &&
        searchFilteredNodesIds.includes(edge.target);
      if (isEdgeConnectingSearchFilteredNodes) {
        activeSearchConnectedNodeEdgeIndex.set(edge.source, true);
      }

      // If we don't have a search text, then we can just return true, since we want to show all edges.
      // NOTE: This helps prevent looping over the edges as many times...
      if (!searchText) {
        return true;
      }

      return isEdgeConnectingSearchFilteredNodes;
    });

    // Step 2: Filter out nodes that don't have any edges, depending on the shouldShowNodesWithoutDeps flag.
    const filteredNodes = searchFilteredNodes.filter((node) => {
      if (!shouldShowNodesWithoutDeps) {
        return activeSearchConnectedNodeEdgeIndex.has(node.id);
      }

      return true;
    });

    // TODO: Fill in this logic, and update it to also remove the edges associated with the bidirectional nodes, and replace with a bidirectional edge.
    // Step 3: Set the type of the node, given the nodes/edges filtered context above.
    // const filteredNodes = depsCheckedNodes.map((node) => {
    //   const hasIncomingEdges = filteredEdges.some(
    //     (edge) => edge.target === node.id
    //   );
    //   const hasOutgoingEdges = filteredEdges.some(
    //     (edge) => edge.source === node.id
    //   );
    //   console.log('node:', node);
    //   console.log('hasIncomingEdges:', hasIncomingEdges);
    //   console.log('hasOutgoingEdges:', hasOutgoingEdges);
    //
    //   if (hasIncomingEdges && hasOutgoingEdges) {
    //     return { ...node, type: 'bidirectional' };
    //   }
    //
    //   return node;
    // });

    return [filteredNodes, filteredEdges];
  }, [searchText, shouldShowNodesWithoutDeps]);

  // TODO -> Implement this functionality, by using the current context values, to determine the correct link + query params to generate.
  const generateShareLink = () => {
    return 'https://some-url.com';
  };

  return (
    <GraphExplorerContext.Provider
      value={{
        graphDirection,
        setGraphDirection,
        shouldShowNodesWithoutDeps,
        setShouldShowNodesWithoutDeps,
        searchText,
        setSearchText,
        selectedNodeId,
        setSelectedNodeId,
        isShowingIcons,
        setIsShowingIcons,
        generateShareLink,
        preProcessedNodes,
        preProcessedEdges,
      }}
    >
      {children}
    </GraphExplorerContext.Provider>
  );
};
