'use client';

import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Edge, Node } from 'reactflow';
import { useSearchParams } from 'next/navigation';

import { ReactSetState } from '@/features/app/types/react-types';
import {
  EDGES,
  NODES,
} from '@/features/graph-playground/data/dummyEdgesAndNodes';
import { ElkGraphExplorerDirection } from '@/features/graph-playground/utils/graph-layout-utils';

export enum GraphSideTab {
  Options = 'options-view',
  Details = 'details-view',
}

type GraphExplorerContext = {
  activeSideTab: GraphSideTab;
  setActiveSideTab: ReactSetState<GraphSideTab>;
  graphDirection: string;
  setGraphDirection: ReactSetState<string>;
  shouldShowNodesWithoutDeps: boolean;
  setShouldShowNodesWithoutDeps: ReactSetState<boolean>;
  searchText: string;
  setSearchText: ReactSetState<string>;
  sourceTypeFilterVal: string;
  setSourceTypeFilterVal: ReactSetState<string>;
  resourceTypeFilterVal: string;
  setResourceTypeFilterVal: ReactSetState<string>;
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
  // Search Params explained:
  // We use the search params to store the state of the graph explorer, so that we can share the link with others, and they will see the same state.
  const searchParams = useSearchParams();
  const shouldShowNodesWithoutDepsQueryParam = searchParams.get(
    'shouldShowNodesWithoutDeps'
  );
  const sourceTypeFilterValQueryParam = searchParams.get('sourceTypeFilterVal');
  const resourceTypeFilterValQueryParam = searchParams.get(
    'resourceTypeFilterVal'
  );
  const isShowingIconsQueryParam = searchParams.get('isShowingIcons');
  const searchTextQueryParam = searchParams.get('searchText');
  const selectedNodeIdQueryParam = searchParams.get('selectedNodeId');
  const activeSideTabQueryParam = searchParams.get('activeSideTab');

  const [activeSideTab, setActiveSideTab] = useState<
    GraphExplorerContext['activeSideTab']
  >((activeSideTabQueryParam as GraphSideTab) ?? GraphSideTab.Options);
  const [shouldShowNodesWithoutDeps, setShouldShowNodesWithoutDeps] = useState<
    GraphExplorerContext['shouldShowNodesWithoutDeps']
  >(shouldShowNodesWithoutDepsQueryParam !== 'false');
  const [isShowingIcons, setIsShowingIcons] = useState<
    GraphExplorerContext['isShowingIcons']
  >(isShowingIconsQueryParam !== 'false');
  const [graphDirection, setGraphDirection] = useState<
    GraphExplorerContext['graphDirection']
  >(ElkGraphExplorerDirection.Vertical);
  const [searchText, setSearchText] = useState<
    GraphExplorerContext['searchText']
  >(searchTextQueryParam ?? '');
  const [sourceTypeFilterVal, setSourceTypeFilterVal] = useState<
    GraphExplorerContext['searchText']
  >(sourceTypeFilterValQueryParam ?? '');
  const [resourceTypeFilterVal, setResourceTypeFilterVal] = useState<
    GraphExplorerContext['searchText']
  >(resourceTypeFilterValQueryParam ?? '');
  const [selectedNodeId, setSelectedNodeId] = useState<
    GraphExplorerContext['selectedNodeId']
  >(selectedNodeIdQueryParam);

  // NOTE 1: Today, these nodes and edges are driven by hard coded data, but in the future, we will want to use the data from the API.
  // TODO(potential-enhancement): We may benefit from using some of the helper functions from this page: https://reactflow.dev/docs/api/graph-util-functions/
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

    // Step 2: Filter out nodes such that the resourceTypeFilterVal is not empty, and the node's resourceType matches the resourceTypeFilterVal.
    const resourceTypeFilteredNodes = searchFilteredNodes.filter((node) => {
      if (!resourceTypeFilterVal) {
        return true;
      }

      return node.data.resourceType === resourceTypeFilterVal;
    });

    // Step 3: Filter out nodes such that the sour is not empty, and the node's resourceType matches the resourceTypeFilterVal.
    const sourceTypeFilteredNodes = resourceTypeFilteredNodes.filter((node) => {
      if (!sourceTypeFilterVal) {
        return true;
      }

      return node.data.sourceType === sourceTypeFilterVal;
    });

    // Step 4: Process the edges, and build out a map index of the edges that are connecting the filtered nodes.
    const initialProcessedNodeIds = sourceTypeFilteredNodes.map(
      (node) => node.id
    );
    const filteredConnectedNodeEdgeIndex = new Map();
    const connectedToSelectedNodeEdgeIndex = new Map();
    let filteredEdges = EDGES.filter((edge) => {
      // Here we are building out a map index, to keep the time complexity a little lower.
      const isEdgeConnectingSearchFilteredNodes =
        initialProcessedNodeIds.includes(edge.source) &&
        initialProcessedNodeIds.includes(edge.target);
      if (isEdgeConnectingSearchFilteredNodes) {
        filteredConnectedNodeEdgeIndex.set(edge.source, true);
      }

      if (selectedNodeId) {
        edge.target === selectedNodeId &&
          connectedToSelectedNodeEdgeIndex.set(edge.source, true);
        edge.source === selectedNodeId &&
          connectedToSelectedNodeEdgeIndex.set(edge.target, true);
      }

      return isEdgeConnectingSearchFilteredNodes;
    });

    // Step 5: Filter out nodes that don't have any edges, depending on the shouldShowNodesWithoutDeps flag.
    const depsFilteredNodes = sourceTypeFilteredNodes.filter((node) => {
      if (!shouldShowNodesWithoutDeps) {
        return filteredConnectedNodeEdgeIndex.has(node.id);
      }

      return true;
    });

    // Step 6: Filter out nodes depending on the currently selected node
    const filteredNodes = depsFilteredNodes.filter((node) => {
      if (!selectedNodeId || selectedNodeId === node.id) {
        return true;
      }
      // if the node has an edge that points it to the selected node, then we want to keep it.
      return connectedToSelectedNodeEdgeIndex.has(node.id);
    });

    // Step 7: Updated the filtered Edges based on the filteredNodes.
    const filteredProcessedNodeIds = filteredNodes.map((node) => node.id);
    filteredEdges = filteredEdges.filter((edge) => {
      // Here we are building out a map index, to keep the time complexity a little lower.
      const isEdgeConnectingFilteredNodes =
        filteredProcessedNodeIds.includes(edge.source) &&
        filteredProcessedNodeIds.includes(edge.target);

      return isEdgeConnectingFilteredNodes;
    });
    // TODO: Fill in this logic, and update it to also remove the edges associated with the bidirectional nodes, and replace with a bidirectional edge.
    // Step #: Set the type of the node, given the nodes/edges filtered context above.
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
  }, [
    searchText,
    resourceTypeFilterVal,
    sourceTypeFilterVal,
    shouldShowNodesWithoutDeps,
    selectedNodeId,
  ]);

  // generateShareLink should return a string representing the URL with the current baseURL, and a query param for the value of searchText, resourceTypeFilterVal, sourceTypeFilterVal, and shouldShowNodesWithoutDeps.
  const generateShareLink = () => {
    const queryParams = new URLSearchParams({
      searchText,
      activeSideTab,
      resourceTypeFilterVal,
      sourceTypeFilterVal,
      shouldShowNodesWithoutDeps: String(shouldShowNodesWithoutDeps),
      isShowingIcons: String(isShowingIcons),
      selectedNodeId: selectedNodeId ?? '',
    });

    return `${window.location.origin}/${window.location.pathname}?${queryParams}`;
  };

  useEffect(() => {
    if (selectedNodeId) {
      setActiveSideTab(GraphSideTab.Details);
    }
  }, [selectedNodeId]);

  return (
    <GraphExplorerContext.Provider
      value={{
        activeSideTab,
        setActiveSideTab,
        graphDirection,
        setGraphDirection,
        shouldShowNodesWithoutDeps,
        setShouldShowNodesWithoutDeps,
        searchText,
        setSearchText,
        sourceTypeFilterVal,
        setSourceTypeFilterVal,
        resourceTypeFilterVal,
        setResourceTypeFilterVal,
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
