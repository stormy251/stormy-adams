import { FC } from 'react';
import { Info, Lightbulb } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

type ServiceDescriptionHoverCardProps = {
  description: string;
};

const ServiceDescriptionHoverCard: FC<ServiceDescriptionHoverCardProps> = ({
  description,
}) => {
  return (
    <HoverCard openDelay={250}>
      <HoverCardTrigger asChild>
        <Button
          size='icon'
          className='scale-[0.8] border-amber-400'
          variant='outline'
        >
          <Lightbulb className='text-amber-600' color='currentColor' />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className='w-80'>
        <div className='flex justify-between space-x-4'>
          <Avatar>
            <AvatarFallback>
              <Info />
            </AvatarFallback>
          </Avatar>
          <div className='space-y-1'>
            <u>
              <h3 className='text-sm font-semibold tracking-wide'>
                Description:
              </h3>
            </u>

            <p className='text-sm'>{description}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ServiceDescriptionHoverCard;
