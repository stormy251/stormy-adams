'use client';

import PageWrapper from '@/components/app/PageWrapper';
import { Button } from '@/components/ui/button';
import { Hand, Linkedin, Mail, Twitter } from 'lucide-react';
import Image from 'next/image';

export default function ProfilePage() {
  return (
    <PageWrapper titleText='Profile'>
      <section
        data-purpose-id='banner-header'
        className='h-[13rem] w-full bg-slate-100 transition-colors dark:bg-slate-800'
      />
      <section
        data-purpose-id='profile-content'
        className='flex w-full grow flex-col overflow-y-auto px-4 py-4 md:container'
      >
        <div
          data-purpose-id='profile-image-and-contact-container'
          className='flex flex-col px-3 sm:flex-row sm:items-center sm:px-5'
        >
          <div
            data-purpose-id='name-title-contact-header'
            className='flex h-auto grow flex-col gap-3 md:h-14 md:flex-row md:justify-between'
          >
            <div>
              <span className='flex items-center gap-2'>
                <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
                  Stormy Adams
                </h3>
                <Hand />
              </span>

              <p className='leading-7'>
                {"I'm a Software Engineer based in San Francisco."}
              </p>
            </div>
            <div className='flex items-center gap-3'>
              <Button
                size='icon'
                variant='outline'
                onClick={() => {
                  window.open('https://twitter.com/stormos251', '_blank');
                }}
              >
                <Twitter color='#128fdc' fill='#128fdc' className='h-4 w-4' />
              </Button>
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
                <Linkedin color='#0A66C2' fill='#0A66C2' className='h-4 w-4' />
              </Button>
              <Button
                variant='default'
                onClick={() => {
                  const emailAddress = 'stormy251251@gmail.com';
                  const subject = encodeURIComponent('Regarding your profile'); // You can change the subject if you want
                  const body = encodeURIComponent('Dear Stormy,\n\n'); // You can add an initial email body here if you want

                  const mailtoLink = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
                  window.location.href = mailtoLink;
                }}
              >
                <Mail className='mr-2 h-4 w-4' /> Contact Me
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
