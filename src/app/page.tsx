'use client';

import PageWrapper from '@/components/app/PageWrapper';
import ExperienceCard from '@/components/profile/ExperienceCard';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  ANIMATE_VARIANT_BINDINGS,
  SLOW_TIMING,
  fadeSectionHeightVariants,
  fadeVariants,
} from '@/lib/framer-motion/motion-variants';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Image from 'next/image';

export default function ProfilePage() {
  return (
    <PageWrapper titleText='Profile'>
      <motion.section
        variants={fadeSectionHeightVariants}
        transition={{ delay: SLOW_TIMING }}
        {...ANIMATE_VARIANT_BINDINGS}
        data-purpose-id='banner-header'
        className='h-[10rem] w-full bg-accent transition-colors dark:bg-accent sm:h-[13rem]'
      />
      <motion.section
        variants={fadeVariants}
        transition={{ delay: SLOW_TIMING * 2 }}
        {...ANIMATE_VARIANT_BINDINGS}
        data-purpose-id='profile-content-header'
        className='flex w-full flex-col px-4 py-4 md:container'
      >
        <div
          data-purpose-id='profile-image-and-contact-container'
          className='-mt-[3rem] flex flex-col gap-4 sm:mt-0 sm:h-[4rem] sm:flex-row sm:items-center'
        >
          <Image
            className=' h-[8rem] w-[8rem] rounded-full border-[0.4rem] border-background shadow-md sm:h-[10rem] sm:w-[10rem]'
            src='/profile.jpg'
            width={1024}
            height={1024}
            alt='Stormy profile logo'
          />
          <div
            data-purpose-id='name-title-contact-header'
            className='flex h-auto grow flex-col gap-3 md:h-14 md:flex-row md:justify-between'
          >
            <div>
              <span className='flex items-center gap-2'>
                <h3 className='scroll-m-20 text-3xl font-bold tracking-tight'>
                  Stormy Adams
                </h3>
              </span>

              <p className='font-semibold leading-7 text-secondary-foreground'>
                {"I'm an explorer of knowledge and a creator of things!"}
              </p>
            </div>
            <div className='flex items-center gap-3'>
              <TooltipProvider>
                <Tooltip delayDuration={250}>
                  <TooltipTrigger asChild>
                    <Button
                      size='icon'
                      variant='outline'
                      onClick={() => {
                        window.open('https://twitter.com/stormos251', '_blank');
                      }}
                    >
                      <Twitter
                        color='#128fdc'
                        fill='#128fdc'
                        className='h-4 w-4'
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Twitter</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip delayDuration={250}>
                  <TooltipTrigger asChild>
                    <Button
                      size='icon'
                      variant='outline'
                      onClick={() => {
                        window.open('https://github.com/stormy251', '_blank');
                      }}
                    >
                      <Github className='h-4 w-4' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Github</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip delayDuration={250}>
                  <TooltipTrigger asChild>
                    <Button
                      size='icon'
                      variant='outline'
                      onClick={() => {
                        window.open(
                          'https://www.linkedin.com/in/stormy-adams-67a0b653/',
                          '_blank'
                        );
                      }}
                    >
                      <Linkedin
                        color='#0A66C2'
                        fill='#0A66C2'
                        className='h-4 w-4'
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip delayDuration={250}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={'secondary'}
                      onClick={() => {
                        const emailAddress = 'stormy251251@gmail.com';
                        const subject = encodeURIComponent(
                          'Regarding your profile'
                        ); // You can change the subject if you want
                        const body = encodeURIComponent('Dear Stormy,\n\n'); // You can add an initial email body here if you want

                        const mailtoLink = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
                        window.location.href = mailtoLink;
                      }}
                    >
                      <Mail className='mr-2 h-4 w-4' />{' '}
                      <span className='whitespace-nowrap'>Contact Me</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Send an email</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </motion.section>
      <motion.section
        variants={fadeVariants}
        transition={{ delay: SLOW_TIMING * 3 }}
        {...ANIMATE_VARIANT_BINDINGS}
        data-purpose-id='profile-content-body'
        className='mt-6 flex w-full grow flex-col px-4 py-4 md:container sm:mt-14 sm:flex-row'
      >
        <ExperienceCard />
      </motion.section>
    </PageWrapper>
  );
}
