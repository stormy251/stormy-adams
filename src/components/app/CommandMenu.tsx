'use client';

import React, { FC, useEffect } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useAppContext } from '@/contexts/AppContext';

const CommandMenu: FC = () => {
  const router = useRouter();
  const { setTheme } = useTheme();
  const { isCommandOpen, setIsCommandOpen } = useAppContext();

  // This handles the key handler for trigger on meta, or ctrl keys with k.
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        setIsCommandOpen((open) => !open);
        e.stopPropagation();
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, []);

  return (
    <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
      <CommandInput placeholder='Type a command or search...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Pages'>
          <CommandItem
            onSelect={() => {
              router.push('/');
              setIsCommandOpen(false);
            }}
          >
            Profile
          </CommandItem>
          <CommandItem
            onSelect={() => {
              router.push('/playground');
              setIsCommandOpen(false);
            }}
          >
            Playground
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading='Set Active Theme'>
          <CommandItem
            onSelect={() => {
              setTheme('light');
              setIsCommandOpen(false);
            }}
          >
            Light
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setTheme('dark');
              setIsCommandOpen(false);
            }}
          >
            Dark
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setTheme('system');
              setIsCommandOpen(false);
            }}
          >
            System
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandMenu;
