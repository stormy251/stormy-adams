'use client';

import PageWrapper from '@/components/app/PageWrapper';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Github, Hand, Linkedin, Mail, Twitter } from 'lucide-react';
import Image from 'next/image';

export default function ProfilePage() {
  return (
    <PageWrapper titleText='Profile'>
      <section
        data-purpose-id='banner-header'
        className='h-[10rem] w-full bg-gradient-to-r from-orange-200 via-violet-300 to-purple-300 transition-colors dark:from-yellow-800 dark:via-violet-900 dark:to-purple-800 sm:h-[13rem]'
      />
      <section
        data-purpose-id='profile-content'
        className='flex w-full grow flex-col px-4 py-4 md:container'
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
                <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
                  Stormy Adams
                </h3>
              </span>

              <p className='font-semibold leading-7'>
                {"I'm a Software Engineer based in San Francisco."}
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
                      variant='secondary'
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
      </section>
    </PageWrapper>
  );
}
