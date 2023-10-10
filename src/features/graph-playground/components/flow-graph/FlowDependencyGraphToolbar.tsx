import * as React from 'react';
import { FC, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Filter, XCircle } from 'lucide-react';

import { Button } from '@/features/app/components/ui/button';
import { Input } from '@/features/app/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/features/app/components/ui/select';
import { Separator } from '@/features/app/components/ui/separator';
import { useGraphExplorerContext } from '@/features/graph-playground/contexts/GraphExplorerContext';
import { SourceType } from '@/features/graph-playground/utils/nodes-and-edges-utils';
import {
  ANIMATE_VARIANT_BINDINGS,
  fadeDownVariants,
  fadeRightVariants,
  fadeVariants,
  SLOW_TIMING,
} from '@/lib/framer-motion/motion-variants';

const searchDebounceDelayMs = SLOW_TIMING;

const FlowDependencyGraphToolbar: FC = () => {
  const [currentSearch, setCurrentSearch] = useState<string>('');
  const {
    setSearchText,
    preProcessedNodes,
    sourceTypeFilterVal,
    setSourceTypeFilterVal,
    resourceTypeFilterVal,
    setResourceTypeFilterVal,
  } = useGraphExplorerContext();
  // resourceTypes is a list of all the unique resource types from the resourceTypes field on the nodes
  const resourceTypes: { label: string; value: string }[] = useMemo(() => {
    const resourceTypesSet = new Set<string>();

    preProcessedNodes.forEach((node) => {
      resourceTypesSet.add(node.data.resourceType);
    });

    return Array.from(resourceTypesSet).map((resourceType) => {
      return {
        label: resourceType,
        value: resourceType,
      };
    });
  }, [preProcessedNodes]);
  const hasActiveFilter = useMemo(() => {
    return (
      Boolean(sourceTypeFilterVal) ||
      Boolean(resourceTypeFilterVal) ||
      Boolean(currentSearch)
    );
  }, [sourceTypeFilterVal, resourceTypeFilterVal, currentSearch]);

  const handleClearFilters = () => {
    setResourceTypeFilterVal('');
    setSourceTypeFilterVal('');
    setCurrentSearch('');
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
      className='flex w-full items-center rounded-lg rounded-bl-none rounded-br-none border border-b-4 border-input px-4 py-2'
    >
      <div className='flex items-center gap-2'>
        <Input
          type='search'
          value={currentSearch}
          onChange={(e) => setCurrentSearch(e.target.value)}
          placeholder='Filter dependencies...'
          className='md:w-[100px] lg:w-[250px]'
        />
        <Separator orientation='vertical' className='h-7' />
        <Select
          value={resourceTypeFilterVal}
          defaultValue={resourceTypeFilterVal}
          onValueChange={(val) => setResourceTypeFilterVal(val)}
        >
          <SelectTrigger className='w-[180px]'>
            <div className='flex items-center gap-2'>
              <Filter className='h-3 w-3' />
              <AnimatePresence mode='wait'>
                {resourceTypeFilterVal === '' ? (
                  <motion.p
                    {...ANIMATE_VARIANT_BINDINGS}
                    variants={fadeVariants}
                  >
                    Resource type
                  </motion.p>
                ) : (
                  <motion.div
                    {...ANIMATE_VARIANT_BINDINGS}
                    variants={fadeVariants}
                  >
                    <SelectValue />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Resource types</SelectLabel>
              {resourceTypes.map((resourceType) => {
                return (
                  <SelectItem
                    key={resourceType.value}
                    value={resourceType.value}
                  >
                    {resourceType.label}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={sourceTypeFilterVal}
          onValueChange={(val) => setSourceTypeFilterVal(val)}
        >
          <SelectTrigger className='w-[180px]'>
            <div className='flex items-center gap-2'>
              <Filter className='h-3 w-3' />
              <AnimatePresence mode='wait'>
                {sourceTypeFilterVal === '' ? (
                  <motion.p
                    {...ANIMATE_VARIANT_BINDINGS}
                    variants={fadeVariants}
                  >
                    Source type
                  </motion.p>
                ) : (
                  <motion.div
                    {...ANIMATE_VARIANT_BINDINGS}
                    variants={fadeVariants}
                  >
                    <SelectValue />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sources</SelectLabel>
              <SelectItem value={SourceType.API}>{SourceType.API}</SelectItem>
              <SelectItem value={SourceType.APM}>{SourceType.APM}</SelectItem>
              <SelectItem value={SourceType.AWS}>{SourceType.AWS}</SelectItem>
              <SelectItem value={SourceType.YAML}>{SourceType.YAML}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Separator orientation='vertical' className='h-7' />
        <AnimatePresence mode='wait'>
          {hasActiveFilter && (
            <motion.div
              variants={fadeRightVariants}
              transition={{ delay: SLOW_TIMING }}
              {...ANIMATE_VARIANT_BINDINGS}
              className='flex items-center gap-2'
            >
              <Button variant={'secondary'} onClick={handleClearFilters}>
                <XCircle className='mr-2 h-4 w-4' />{' '}
                <span className='whitespace-nowrap'>clear</span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FlowDependencyGraphToolbar;
