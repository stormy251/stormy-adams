'use client';

import { Row } from '@tanstack/react-table';

import { serviceSchema } from '@/features/services/data/schema';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function ServicesDataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const service = serviceSchema.parse(row.original);

  const handleDetailsNavigation = () => {
    router.push(`/services/${service.id}`);
  };

  return (
    <Button
      variant='outline'
      className='flex data-[state=open]:bg-muted'
      onClick={handleDetailsNavigation}
    >
      Details
    </Button>
  );
}
