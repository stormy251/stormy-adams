'use client';

import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format } from 'date-fns';

import { Button } from '@/features/app/components/ui/button';
import { Calendar } from '@/features/app/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/features/app/components/ui/popover';
import { cn } from '@/lib/shadcn-ui/utils';

export function DateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 20),
  });

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-auto justify-start text-left font-normal sm:w-[260px]',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-0 h-4 w-4 sm:mr-2' />
            <span className='hidden sm:inline'>
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y')} -{' '}
                    {format(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y')
                )
              ) : (
                <span>Pick a date</span>
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='end'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
