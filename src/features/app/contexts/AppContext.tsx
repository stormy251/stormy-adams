'use client';

import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import { ReactSetState } from '@/features/app/types/react-types';
import { SideNavGroupLabel } from '@/features/app/types/side-nav-types';

type AppContext = {
  isCommandOpen: boolean;
  setIsCommandOpen: ReactSetState<boolean>;
  isMobileSideNavOpen: boolean;
  setIsMobileSideNavOpen: ReactSetState<boolean>;
  sideNavLabelPing: SideNavGroupLabel | null;
  setSideNavLabelPing: ReactSetState<SideNavGroupLabel | null>;
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
  const [isMobileSideNavOpen, setIsMobileSideNavOpen] = useState(false);
  const [sideNavLabelPing, setSideNavLabelPing] =
    useState<SideNavGroupLabel | null>(null);

  return (
    <AppContext.Provider
      value={{
        isCommandOpen,
        setIsCommandOpen,
        sideNavLabelPing,
        setSideNavLabelPing,
        isMobileSideNavOpen,
        setIsMobileSideNavOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
