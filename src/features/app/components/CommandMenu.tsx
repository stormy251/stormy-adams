'use client';

import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/features/app/components/ui/command';
import { useAppContext } from '@/features/app/contexts/AppContext';

const CommandMenu: FC = () => {
  const router = useRouter();
  const { setTheme } = useTheme();
  const { isCommandOpen, setIsCommandOpen } = useAppContext();

  const handleCommandSelect = (command: string) => {
    switch (command) {
      case 'profile':
        router.push('/');
        break;
      case 'services':
        router.push('/services');
        break;
      case 'playground':
        router.push('/chart-playground');
        break;
      case 'light':
        setTheme('light');
        break;
      case 'dark':
        setTheme('dark');
        break;
      case 'system':
        setTheme('system');
        break;
      default:
        break;
    }
    setIsCommandOpen(false);
  };

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
  }, [setIsCommandOpen]);

  return (
    <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
      <CommandInput placeholder='Type a command or search...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Go to Page'>
          <CommandItem
            onSelect={() => {
              handleCommandSelect('profile');
            }}
          >
            Profile
          </CommandItem>
          <CommandItem
            onSelect={() => {
              handleCommandSelect('services');
            }}
          >
            Services
          </CommandItem>
          <CommandItem
            onSelect={() => {
              handleCommandSelect('playground');
            }}
          >
            Chart Playground
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading='Set Active Theme'>
          <CommandItem
            onSelect={() => {
              handleCommandSelect('light');
            }}
          >
            Light
          </CommandItem>
          <CommandItem
            onSelect={() => {
              handleCommandSelect('dark');
            }}
          >
            Dark
          </CommandItem>
          <CommandItem
            onSelect={() => {
              handleCommandSelect('system');
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
