'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { ServicesDataTableFacetedFilter } from '@/features/services/components/services-explorer/ServicesDataTableFacetedFilter';
import { ServicesDataTableViewOptions } from '@/features/services/components/services-explorer/ServicesDataTableViewOptions';
import { Button } from '@/features/app/components/ui/button';
import { Input } from '@/features/app/components/ui/input';
import { statuses } from '@/features/services/constants/services-data-table-constants';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function ServicesDataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Filter by service'
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className='h-12 w-[250px] lg:w-[250px]'
        />
        {table.getColumn('status') && (
          <ServicesDataTableFacetedFilter
            column={table.getColumn('status')}
            title='Status'
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <ServicesDataTableViewOptions table={table} />
    </div>
  );
}
