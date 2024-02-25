'use client';

import { FC } from 'react';

import { Button } from '@/features/app/components/ui/button';
import { useAppContext } from '@/features/app/contexts/AppContext';
import { isMacBased } from '@/features/app/helpers/os-helpers';
import { cn } from '@/lib/shadcn-ui/utils';

const SearchCommandButton: FC = () => {
  const { setIsCommandOpen } = useAppContext();

  return (
    <Button
      variant='ghost'
      className={cn(
        'relative my-3 w-full justify-start rounded-full bg-gray-200 text-sm hover:outline hover:outline-1 hover:outline-offset-2 hover:outline-primary dark:bg-muted'
      )}
      onClick={() => setIsCommandOpen(true)}
    >
      <span className='inline-flex font-bold tracking-wide text-gray-400 dark:text-gray-400'>
        Search
      </span>
      <span
        suppressHydrationWarning={true}
        className='pointer-events-none absolute right-3 top-[50%] flex h-5 translate-y-[-50%] flex-row gap-1 text-xs '
      >
        <kbd className='hidden select-none items-center gap-1 rounded bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
          {isMacBased() ? '⌘' : 'Ctrl'}
        </kbd>
        <kbd className='hidden h-5 select-none items-center gap-1 rounded bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
          K
        </kbd>
      </span>
    </Button>
  );
};

export default SearchCommandButton;
