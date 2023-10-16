import { FC, useMemo } from 'react';
import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Filter, RotateCcw, Settings2 } from 'lucide-react';

import { Button } from '@/features/app/components/ui/button';
import { Checkbox } from '@/features/app/components/ui/checkbox';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/features/app/components/ui/tooltip';
import { useGraphExplorerContext } from '@/features/graph-playground/contexts/GraphExplorerContext';
import { SourceType } from '@/features/graph-playground/utils/nodes-and-edges-utils';
import {
  ANIMATE_VARIANT_BINDINGS,
  fadeDownVariants,
  fadeRightVariants,
  fadeVariants,
  SLOW_TIMING,
} from '@/lib/framer-motion/motion-variants';

const OptionsTabView: FC = () => {
  const {
    isShowingIcons,
    setIsShowingIcons,
    shouldShowNodesWithoutDeps,
    setShouldShowNodesWithoutDeps,
    sourceTypeFilterVal,
    setSourceTypeFilterVal,
    resourceTypeFilterVal,
    preProcessedNodes,
    setResourceTypeFilterVal,
  } = useGraphExplorerContext();

  const hasActiveFilter = useMemo(() => {
    return (
      Boolean(sourceTypeFilterVal) ||
      Boolean(resourceTypeFilterVal) ||
      !shouldShowNodesWithoutDeps
    );
  }, [sourceTypeFilterVal, resourceTypeFilterVal, shouldShowNodesWithoutDeps]);

  const hasChangedGraphOptions = useMemo(() => {
    return !isShowingIcons;
  }, [isShowingIcons]);

  const handleClearFilters = () => {
    setResourceTypeFilterVal('');
    setSourceTypeFilterVal('');
    setShouldShowNodesWithoutDeps(true);
  };

  const handleResetGraphOptions = () => {
    setIsShowingIcons(true);
  };

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

  return (
    <motion.div
      variants={fadeDownVariants}
      {...ANIMATE_VARIANT_BINDINGS}
      className='flex flex-col gap-6 p-4'
    >
      <div className='flex flex-col rounded-lg bg-accent'>
        <div className='flex h-10 items-center justify-between border-b border-input px-2'>
          <h4 className='mb-0 flex items-center gap-1 text-lg'>
            <Filter className='h-3 w-3' />
            <span>Filters</span>
          </h4>
          <AnimatePresence mode='wait'>
            {hasActiveFilter && (
              <motion.div
                variants={fadeRightVariants}
                transition={{ duration: SLOW_TIMING }}
                {...ANIMATE_VARIANT_BINDINGS}
              >
                <TooltipProvider>
                  <Tooltip delayDuration={150}>
                    <TooltipTrigger asChild>
                      <Button
                        size='icon'
                        variant='outline'
                        onClick={handleClearFilters}
                        className='scale-75'
                      >
                        <RotateCcw className='h-4 w-4' />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Reset Filters</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className='flex flex-col gap-4 p-2'>
          <div className='flex flex-col gap-1'>
            <p className='text-sm'>Resource types</p>
            <Select
              value={resourceTypeFilterVal}
              defaultValue={resourceTypeFilterVal}
              onValueChange={(val) => setResourceTypeFilterVal(val)}
            >
              <SelectTrigger className='w-full bg-background'>
                <div className='flex items-center gap-2'>
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
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-sm'>Source types</p>
            <Select
              defaultValue={sourceTypeFilterVal}
              value={sourceTypeFilterVal}
              onValueChange={(val) => setSourceTypeFilterVal(val)}
            >
              <SelectTrigger className='w-full bg-background'>
                <div className='flex items-center gap-2'>
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
                  <SelectItem value={SourceType.API}>
                    {SourceType.API}
                  </SelectItem>
                  <SelectItem value={SourceType.APM}>
                    {SourceType.APM}
                  </SelectItem>
                  <SelectItem value={SourceType.AWS}>
                    {SourceType.AWS}
                  </SelectItem>
                  <SelectItem value={SourceType.YAML}>
                    {SourceType.YAML}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
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
              Show disconnected
            </label>
          </div>
        </div>
      </div>
      <div className='flex flex-col rounded-lg bg-accent'>
        <div className='flex h-10 items-center justify-between px-2'>
          <h4 className='mb-0 flex items-center gap-1 text-lg'>
            <Settings2 className='h-3 w-3' />
            <span>Graph Options</span>
          </h4>
          <AnimatePresence mode='wait'>
            {hasChangedGraphOptions && (
              <motion.div
                variants={fadeRightVariants}
                transition={{ duration: SLOW_TIMING }}
                {...ANIMATE_VARIANT_BINDINGS}
                className='flex items-center gap-2'
              >
                <TooltipProvider>
                  <Tooltip delayDuration={150}>
                    <TooltipTrigger asChild>
                      <Button
                        size='icon'
                        className='scale-75'
                        variant='outline'
                        onClick={handleResetGraphOptions}
                      >
                        <RotateCcw className='h-4 w-4' />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Reset Options</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Separator orientation='horizontal' className='mb-3 w-full' />
        <div className='flex flex-col gap-4 p-2'>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='show-icons-toggle'
              checked={isShowingIcons}
              onCheckedChange={(checked) =>
                setIsShowingIcons(checked as boolean)
              }
            />
            <label
              htmlFor='show-icons-toggle'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Show icons
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OptionsTabView;
