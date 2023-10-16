import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, ThumbsUp } from 'lucide-react';

import { Button } from '@/features/app/components/ui/button';
import { Input } from '@/features/app/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/features/app/components/ui/tooltip';
import { useToast } from '@/features/app/components/ui/use-toast';
import { useGraphExplorerContext } from '@/features/graph-playground/contexts/GraphExplorerContext';
import {
  ANIMATE_VARIANT_BINDINGS,
  fadeDownVariants,
  FAST_TIMING,
  SLOW_TIMING,
} from '@/lib/framer-motion/motion-variants';

const searchDebounceDelayMs = SLOW_TIMING;

const FlowDependencyGraphToolbar: FC = () => {
  const { toast } = useToast();
  const { searchText, setSearchText, generateShareLink } =
    useGraphExplorerContext();
  const [currentSearch, setCurrentSearch] = useState<string>(searchText);
  // resourceTypes is a list of all the unique resource types from the resourceTypes field on the nodes

  const handleShareClick = () => {
    const shareLink = generateShareLink();

    navigator.clipboard.writeText(shareLink);
    toast({
      title: 'Link Copied!',
      action: <ThumbsUp size={36} />,
    });
  };

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
      className='flex w-full items-center justify-between rounded-lg rounded-bl-none rounded-br-none border border-b-4 border-input px-4 py-2'
    >
      <div className='flex items-center gap-2'>
        <Input
          type='search'
          value={currentSearch}
          onChange={(e) => setCurrentSearch(e.target.value)}
          placeholder='Filter dependencies...'
          className='md:w-[100px] lg:w-[250px]'
        />
      </div>
      <div className='flex items-center gap-2'>
        <TooltipProvider>
          <Tooltip delayDuration={FAST_TIMING}>
            <TooltipTrigger asChild>
              <Button
                size='icon'
                variant='outline'
                onClick={() => handleShareClick()}
              >
                <Link className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy share link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.div>
  );
};

export default FlowDependencyGraphToolbar;
