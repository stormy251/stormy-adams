import { promises as fs } from 'fs';
import path from 'path';

import { Metadata } from 'next';
import { z } from 'zod';

import PageWrapper from '@/components/app/PageWrapper';
import DetailsPageContent from '@/components/services/details-page/DetailsPageContent';
import DetailsPageHeader from '@/components/services/details-page/DetailsPageHeader';
import { Service, serviceSchema } from '@/features/services/data/schema';

export const metadata: Metadata = {
  title: 'Services Details',
  description: 'A dashboard showcasing the services profile page.',
};

// Simulate a database read for services.
async function getServiceById(id: string): Promise<Service> {
  const data = await fs.readFile(
    path.join(process.cwd(), 'src/features/services/data/services.json')
  );
  const services = JSON.parse(data.toString());

  return z
    .array(serviceSchema)
    .parse(services)
    .find((service) => service.id === id) as Service;
}

type ServiceDetailPageProps = { params: { serviceId: string } };

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const service = await getServiceById(params.serviceId);

  return (
    <PageWrapper
      withoutOverflow={true}
      titleText={`${service.title} Dashboard`}
    >
      <DetailsPageHeader service={service} />
      <DetailsPageContent service={service} />
    </PageWrapper>
  );
}
