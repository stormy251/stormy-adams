import { Card, Title, DonutChart } from '@tremor/react';
import { FC } from 'react';

const cities = [
  {
    name: 'New York',
    sales: 9800,
  },
  {
    name: 'London',
    sales: 4567,
  },
  {
    name: 'Hong Kong',
    sales: 3908,
  },
  {
    name: 'San Francisco',
    sales: 2400,
  },
  {
    name: 'Singapore',
    sales: 1908,
  },
  {
    name: 'Zurich',
    sales: 1398,
  },
];

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;

const PieChart: FC = () => (
  <>
    <Title>Pie/Donut Chart</Title>
    <DonutChart
      className='mt-6'
      data={cities}
      category='sales'
      index='name'
      valueFormatter={valueFormatter}
      colors={['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber']}
    />
  </>
);

export default PieChart;
