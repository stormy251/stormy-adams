import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { Input } from '@/features/app/components/ui/input';
import { useGraphExplorerContext } from '@/features/graph-playground/contexts/GraphExplorerContext';
import {
  ANIMATE_VARIANT_BINDINGS,
  fadeDownVariants,
  SLOW_TIMING,
} from '@/lib/framer-motion/motion-variants';

const searchDebounceDelayMs = SLOW_TIMING;

const FlowDependencyGraphToolbar: FC = () => {
  const [currentSearch, setCurrentSearch] = useState<string>('');
  const {
    setGraphDirection,
    setSearchText,
    shouldShowNodesWithoutDeps,
    setShouldShowNodesWithoutDeps,
    isShowingIcons,
    setIsShowingIcons,
  } = useGraphExplorerContext();

  // NOTE: This allows the UI to feel snappy without triggering requests on every keystroke
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setSearchText(currentSearch);
    }, searchDebounceDelayMs);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [setSearchText, currentSearch]);

  return (
    <motion.div
      variants={fadeDownVariants}
      transition={{ delay: SLOW_TIMING * 2 }}
      {...ANIMATE_VARIANT_BINDINGS}
      className='flex w-full items-center rounded-lg rounded-bl-none rounded-br-none border border-b-4 border-input px-4 py-2'
    >
      <div className='flex items-center gap-2'>
        <Input
          type='search'
          value={currentSearch}
          onChange={(e) => setCurrentSearch(e.target.value)}
          placeholder='Search Dependencies...'
          className='md:w-[100px] lg:w-[250px]'
        />
      </div>
    </motion.div>
  );
};

export default FlowDependencyGraphToolbar;
