'use client';

import React, { useEffect } from 'react';
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

const CommandMenu = () => {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);

  // This handles the key handler for trigger on meta, or ctrl keys with k.
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        setOpen((open) => !open);
        e.stopPropagation();
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder='Type a command or search...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Pages'>
          <CommandItem
            onSelect={() => {
              router.push('/');
              setOpen(false);
            }}
          >
            Profile
          </CommandItem>
          <CommandItem
            onSelect={() => {
              router.push('/dashboard');
              setOpen(false);
            }}
          >
            Dashboard
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading='Set Active Theme'>
          <CommandItem
            onSelect={() => {
              setTheme('light');
              setOpen(false);
            }}
          >
            Light
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setTheme('dark');
              setOpen(false);
            }}
          >
            Dark
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setTheme('system');
              setOpen(false);
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
