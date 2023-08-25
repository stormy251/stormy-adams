'use client';

import { FC } from 'react';
import * as React from 'react';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/features/app/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/features/app/components/ui/card';
import { Separator } from '@/features/app/components/ui/separator';
import { useAppContext } from '@/features/app/contexts/AppContext';
import { SideNavGroupLabel } from '@/features/app/types/side-nav-types';

const ExperienceCard: FC = () => {
  const { setSideNavLabelPing, setIsMobileSideNavOpen } = useAppContext();

  return (
    <Card className='h-min w-full sm:w-[550px]'>
      <CardContent>
        <h2 className='mb-2 mt-4 text-2xl font-bold text-muted-foreground'>
          Experience
        </h2>
        <p>
          I specialize in creating rich web experiences, and taking ideas from
          inception to creation.
        </p>
        <Separator orientation='horizontal' className='mb-3 mt-2 h-[1px]' />
        <h4 className=' text-lg font-bold text-muted-foreground'>About me</h4>
        <CardDescription>
          <span>{"I'm a Full-Stack"}</span>
          <small className='mx-1'>
            <b>(Leaning Frontend)</b>
          </small>
          <span>
            {
              "Software Developer based in San Francisco. I specialize in React, and Nextjs. I'm always striving to grow and learn something new and I don't take myself too seriously."
            }
          </span>
        </CardDescription>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button
          className='inline-flex sm:hidden'
          variant='outline'
          onClick={() => {
            setIsMobileSideNavOpen(true);
            setTimeout(() => {
              setSideNavLabelPing(SideNavGroupLabel.SideProjects);
            }, 500);
          }}
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Check-out side projects
        </Button>
        <Button
          className='hidden sm:inline-flex'
          variant='outline'
          onClick={() => setSideNavLabelPing(SideNavGroupLabel.SideProjects)}
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Check-out side projects
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExperienceCard;
