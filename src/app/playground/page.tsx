import { promises as fs } from 'fs';
import path from 'path';
import { Metadata } from 'next';
import { z } from 'zod';

import { ServicesDataTable } from '@/components/services/ServicesDataTable';
import PageWrapper from '@/components/app/PageWrapper';
import { serviceSchema } from '@/features/services/data/schema';
import { servicesDataTableColumns } from '@/components/services/ServicesDataTableColumns';

export const metadata: Metadata = {
  title: 'Services Playground',
  description: 'A services tracker built using Tanstack Table.',
};

// Simulate a database read for services.
async function getServices() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'src/features/services/data/services.json')
  );

  const services = JSON.parse(data.toString());

  return z.array(serviceSchema).parse(services);
}

export default async function ServicesPlaygroundPage() {
  const services = await getServices();

  return (
    <PageWrapper titleText='Service Playground'>
      <section
        data-purpose-id='banner-header'
        className='h-[10rem] min-h-[10rem] w-full bg-slate-200 transition-colors dark:bg-slate-800 sm:h-[13rem] sm:min-h-[13rem]'
      />
      <section
        data-purpose-id='services-content'
        className='flex w-full grow flex-col px-4 py-4 md:container'
      >
        <ServicesDataTable data={services} columns={servicesDataTableColumns} />
      </section>
    </PageWrapper>
  );
}
