'use client';

import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import { ReactSetState } from '@/features/app/types/react-types';

type GraphExplorerContext = {
  graphDirection: string;
  setGraphDirection: ReactSetState<string>;
  selectedNodeId: string | null;
  setSelectedNodeId: ReactSetState<string | null>;
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

// TODO -> Within the context ^^ we should handle the "generateShareLink", function that will create a queryParam style URL that will drive the initial configuration/filters for the page when the end user loads it.
export const GraphExplorerContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [graphDirection, setGraphDirection] =
    useState<GraphExplorerContext['graphDirection']>('LR');
  const [selectedNodeId, setSelectedNodeId] =
    useState<GraphExplorerContext['selectedNodeId']>(null);

  return (
    <GraphExplorerContext.Provider
      value={{
        graphDirection,
        setGraphDirection,
        selectedNodeId,
        setSelectedNodeId,
      }}
    >
      {children}
    </GraphExplorerContext.Provider>
  );
};
