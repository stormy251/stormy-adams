import { promises as fs } from 'fs';
import path from 'path';

import { Metadata } from 'next';
import { z } from 'zod';

import PageWrapper from '@/components/app/PageWrapper';
import { ServicesDataTable } from '@/components/services/services-explorer/ServicesDataTable';
import { servicesDataTableColumns } from '@/components/services/services-explorer/ServicesDataTableColumns';
import ServicesExplorerHeader from '@/components/services/services-explorer/ServicesExplorerHeader';
import { serviceSchema } from '@/features/services/data/schema';

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
        data-purpose-id='services-explorer-content'
        className='flex w-full grow flex-col px-4 py-4 md:container'
      >
        <ServicesExplorerHeader />
        <ServicesDataTable data={services} columns={servicesDataTableColumns} />
      </section>
    </PageWrapper>
  );
}
