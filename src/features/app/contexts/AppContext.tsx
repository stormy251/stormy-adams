'use client';

import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import { ReactSetState } from '@/features/app/types/react-types';

type AppContext = {
  isCommandOpen: boolean;
  setIsCommandOpen: ReactSetState<boolean>;
};

// NOTE: The use of as here, is because it really doesn't matter what you provide to this export, given the provider is used directly.
export const AppContext = createContext<AppContext>({} as AppContext);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within a AppContext');
  }

  return context;
};

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isCommandOpen,
        setIsCommandOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
