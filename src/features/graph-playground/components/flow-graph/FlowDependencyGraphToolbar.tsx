import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, ArrowUpDown } from 'lucide-react';

import { Button } from '@/features/app/components/ui/button';
import { Checkbox } from '@/features/app/components/ui/checkbox';
import { Input } from '@/features/app/components/ui/input';
import { useGraphExplorerContext } from '@/features/graph-playground/contexts/GraphExplorerContext';
import { ElkGraphExplorerDirection } from '@/features/graph-playground/utils/graph-config-utils';
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
        <Button
          size='icon'
          variant='secondary'
          onClick={() => {
            setGraphDirection(ElkGraphExplorerDirection.Vertical);
          }}
          className={'scale-75'}
        >
          <ArrowUpDown />
        </Button>
        <Button
          size='icon'
          variant='secondary'
          onClick={() => {
            setGraphDirection(ElkGraphExplorerDirection.Horizontal);
          }}
          className={'scale-75'}
        >
          <ArrowLeftRight />
        </Button>
        <div className='flex items-center space-x-2'>
          <Checkbox
            id='without-deps-toggle'
            checked={shouldShowNodesWithoutDeps}
            onCheckedChange={(checked) =>
              setShouldShowNodesWithoutDeps(checked as boolean)
            }
          />
          <label
            htmlFor='without-deps-toggle'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Show nodes without dependencies
          </label>
        </div>
      </div>
    </motion.div>
  );
};

export default FlowDependencyGraphToolbar;
