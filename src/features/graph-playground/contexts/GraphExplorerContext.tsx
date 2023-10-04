'use client';

import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import { ReactSetState } from '@/features/app/types/react-types';
import { ElkGraphExplorerDirection } from '@/features/graph-playground/utils/graph-config-utils';

type GraphExplorerContext = {
  graphDirection: string;
  setGraphDirection: ReactSetState<string>;
  shouldShowNodesWithoutDeps: boolean;
  setShouldShowNodesWithoutDeps: ReactSetState<boolean>;
  searchText: string;
  setSearchText: ReactSetState<string>;
  selectedNodeId: string | null;
  setSelectedNodeId: ReactSetState<string | null>;
  generateShareLink: () => string;
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
  const [graphDirection, setGraphDirection] = useState<
    GraphExplorerContext['graphDirection']
  >(ElkGraphExplorerDirection.Vertical);
  const [searchText, setSearchText] =
    useState<GraphExplorerContext['searchText']>('');
  const [selectedNodeId, setSelectedNodeId] =
    useState<GraphExplorerContext['selectedNodeId']>(null);

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
        generateShareLink,
      }}
    >
      {children}
    </GraphExplorerContext.Provider>
  );
};
