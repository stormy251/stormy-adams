'use client';

import React, { FC, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sparkles, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/features/app/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/features/app/components/ui/dropdown-menu';
import {
  ANIMATE_VARIANT_BINDINGS,
  fadeUpVariants,
} from '@/lib/framer-motion/motion-variants';

const LightDarkModeToggle: FC = function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [showThemeIcon, setShowThemeIcon] = useState(false);

  useEffect(() => {
    setShowThemeIcon(true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='outline'>
          {showThemeIcon && (
            <AnimatePresence mode='wait'>
              {theme === 'dark' && (
                <motion.span
                  key='dark'
                  variants={fadeUpVariants}
                  {...ANIMATE_VARIANT_BINDINGS}
                >
                  <Moon />
                </motion.span>
              )}
              {theme === 'light' && (
                <motion.span
                  key='light'
                  variants={fadeUpVariants}
                  {...ANIMATE_VARIANT_BINDINGS}
                >
                  <Sun />
                </motion.span>
              )}
              {theme === 'system' && (
                <motion.span
                  key='system'
                  variants={fadeUpVariants}
                  {...ANIMATE_VARIANT_BINDINGS}
                >
                  <Sparkles />
                </motion.span>
              )}
            </AnimatePresence>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LightDarkModeToggle;
