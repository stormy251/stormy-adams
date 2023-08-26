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
      variant='outline'
      className={cn(
        'relative my-3 w-full justify-start text-sm text-muted-foreground'
      )}
      onClick={() => setIsCommandOpen(true)}
    >
      <span className='inline-flex'>Search</span>
      <kbd className='pointer-events-none absolute right-3 top-[50%] hidden h-5 translate-y-[-50%] select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
        <span suppressHydrationWarning={true} className='text-xs'>
          {isMacBased() ? '⌘ + K' : 'Ctrl + K'}
        </span>
      </kbd>
    </Button>
  );
};

export default SearchCommandButton;
