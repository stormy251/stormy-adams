import * as React from 'react';
import { FC } from 'react';
import { motion } from 'framer-motion';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/features/app/components/ui/tabs';
import DetailsTabView from '@/features/graph-playground/components/flow-graph/DetailsTabView';
import OptionsTabView from '@/features/graph-playground/components/flow-graph/OptionsTabView';
import {
  GraphSideTab,
  useGraphExplorerContext,
} from '@/features/graph-playground/contexts/GraphExplorerContext';
import {
  ANIMATE_VARIANT_BINDINGS,
  fadeVariants,
  SLOW_TIMING,
} from '@/lib/framer-motion/motion-variants';

const FlowDependencyGraphSidePanel: FC = () => {
  const { activeSideTab, setActiveSideTab } = useGraphExplorerContext();

  return (
    <motion.div
      variants={fadeVariants}
      transition={{ delay: SLOW_TIMING * 4 }}
      {...ANIMATE_VARIANT_BINDINGS}
      className='flex h-full flex-col rounded-lg border border-input'
    >
      <Tabs
        defaultValue='view-options'
        value={activeSideTab}
        onValueChange={(value) => setActiveSideTab(value as GraphSideTab)}
        className='flex h-full w-full flex-col rounded-lg'
      >
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value={GraphSideTab.Options}>View Options</TabsTrigger>
          <TabsTrigger value={GraphSideTab.Details}>Details</TabsTrigger>
        </TabsList>
        <TabsContent value={GraphSideTab.Options}>
          <OptionsTabView />
        </TabsContent>
        <TabsContent className='flex-1' value={GraphSideTab.Details}>
          <DetailsTabView />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default FlowDependencyGraphSidePanel;
