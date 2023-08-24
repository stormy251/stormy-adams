'use client';

import { FC } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/features/app/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/features/app/components/ui/tooltip';

const BackToServicesButton: FC = () => {
  const router = useRouter();

  const handleBackButton = () => {
    router.push('/services');
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>
          <Button
            variant='outline'
            className='border-2'
            onClick={handleBackButton}
          >
            <ArrowLeft />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Back To Services</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BackToServicesButton;
