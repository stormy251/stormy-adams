import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Github,
  Group,
  Link,
  PersonStanding,
  Slack,
  Users,
} from 'lucide-react';

export function ServiceOwners() {
  return (
    <div className='space-y-8'>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarFallback>
            <Github />
          </AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Repository</p>
          <p className='text-sm text-muted-foreground'>zortex/backend</p>
        </div>
        <div className='ml-auto font-medium'>
          <Button
            size='icon'
            className='scale-[0.6] border-blue-600'
            variant='outline'
          >
            <Link className='text-blue-600' color='currentColor' />
          </Button>
        </div>
      </div>
      <div className='flex items-center'>
        <Avatar className='flex h-9 w-9 items-center justify-center space-y-0 border'>
          <AvatarFallback>
            <PersonStanding />
          </AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Zortex Engineers</p>
          <ul>
            <li className='text-sm text-muted-foreground'>Stormy Adams</li>
            <li className='text-sm text-muted-foreground'>Jon doe</li>
          </ul>
        </div>
        <div className='ml-auto pr-3 text-2xl font-medium'>2</div>
      </div>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9 self-start'>
          <AvatarFallback>
            <Slack />
          </AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Slack Channels</p>
          <p className='text-sm text-muted-foreground'>#backend</p>
        </div>
        <div className='ml-auto font-medium'>
          <Button
            size='icon'
            className='scale-[0.6] border-blue-600'
            variant='outline'
          >
            <Link className='text-blue-600' color='currentColor' />
          </Button>
        </div>
      </div>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarFallback>
            <Users />
          </AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Groups</p>
          <p className='text-sm text-muted-foreground'>Tier 1</p>
          <p className='text-sm text-muted-foreground'>Typescript</p>
        </div>
        <div className='ml-auto pr-3 text-2xl font-medium'>2</div>
      </div>
    </div>
  );
}
