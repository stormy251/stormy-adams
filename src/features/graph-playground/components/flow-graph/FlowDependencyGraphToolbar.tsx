import * as React from 'react';
import { FC } from 'react';
import { ArrowLeftRight, ArrowUpDown } from 'lucide-react';

import { Button } from '@/features/app/components/ui/button';
import { Input } from '@/features/app/components/ui/input';
import { useGraphExplorerContext } from '@/features/graph-playground/contexts/GraphExplorerContext';

const FlowDependencyGraphToolbar: FC = () => {
  const { setGraphDirection } = useGraphExplorerContext();

  return (
    <div className='flex w-full items-center rounded-lg rounded-bl-none rounded-br-none border border-b-4 border-input px-4 py-2'>
      <div className='flex items-center gap-2'>
        <Input
          type='search'
          placeholder='Search Dependencies...'
          className='md:w-[100px] lg:w-[250px]'
        />
        <Button
          size='icon'
          variant='secondary'
          onClick={() => {
            setGraphDirection('TB');
          }}
          className={'scale-75'}
        >
          <ArrowUpDown />
        </Button>
        <Button
          size='icon'
          variant='secondary'
          onClick={() => {
            setGraphDirection('LR');
          }}
          className={'scale-75'}
        >
          <ArrowLeftRight />
        </Button>
      </div>
    </div>
  );
};

export default FlowDependencyGraphToolbar;
