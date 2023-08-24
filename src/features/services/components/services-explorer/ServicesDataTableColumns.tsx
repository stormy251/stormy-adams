'use client';

import { ColumnDef } from '@tanstack/react-table';

import { ServicesDataTableColumnHeader } from '@/features/services/components/services-explorer/ServicesDataTableColumnHeader';
import { ServicesDataTableRowActions } from '@/features/services/components/services-explorer/ServicesDataTableRowActions';
import { statuses } from '@/features/services/constants/services-data-table-constants';
import { Service } from '@/features/services/data/schema';

export const servicesDataTableColumns: ColumnDef<Service>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <ServicesDataTableColumnHeader column={column} title='Service' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('title')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'owner',
    header: ({ column }) => (
      <ServicesDataTableColumnHeader column={column} title='Owner' />
    ),
    cell: ({ row }) => <div>{row.getValue('owner')}</div>,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <ServicesDataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      );

      if (!status) {
        return null;
      }

      return (
        <div className='flex w-[100px] items-center'>
          {status.icon && (
            <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ServicesDataTableRowActions row={row} />,
  },
];
