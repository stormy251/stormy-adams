'use client';

import { useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/solid';
import {
  AreaChart,
  Color,
  Flex,
  Icon,
  Tab,
  TabGroup,
  TabList,
  Title,
} from '@tremor/react';

const usNumberformatter = (number: number, decimals = 0) =>
  Intl.NumberFormat('us', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
    .format(Number(number))
    .toString();

const formatters: { [key: string]: any } = {
  Sales: (number: number) => `$ ${usNumberformatter(number)}`,
  Profit: (number: number) => `$ ${usNumberformatter(number)}`,
  Customers: (number: number) => `${usNumberformatter(number)}`,
  Delta: (number: number) => `${usNumberformatter(number, 2)}%`,
};

const Kpis = {
  Sales: 'Sales',
  Profit: 'Profit',
  Customers: 'Customers',
};

const kpiList = [Kpis.Sales, Kpis.Profit, Kpis.Customers];

export type DailyPerformance = {
  date: string;
  Sales: number;
  Profit: number;
  Customers: number;
};

export const performance: DailyPerformance[] = [
  {
    date: '2023-05-01',
    Sales: 900.73,
    Profit: 173,
    Customers: 73,
  },
  {
    date: '2023-05-02',
    Sales: 1000.74,
    Profit: 174.6,
    Customers: 74,
  },
  {
    date: '2023-05-03',
    Sales: 1100.93,
    Profit: 293.1,
    Customers: 293,
  },
  {
    date: '2023-05-04',
    Sales: 1200.9,
    Profit: 290.2,
    Customers: 29,
  },
];

export default function ChartView() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedKpi = kpiList[selectedIndex];

  const areaChartArgs = {
    className: 'mt-5 h-[25rem] sm:h-[45rem]',
    data: performance,
    index: 'date',
    categories: [selectedKpi],
    colors: ['blue'] as Color[],
    showLegend: false,
    valueFormatter: formatters[selectedKpi],
    yAxisWidth: 56,
  };

  return (
    <>
      <div className='justify-between md:flex'>
        <div>
          <Flex
            className='space-x-0.5'
            justifyContent='start'
            alignItems='center'
          >
            <Title> Tabbed chart </Title>
            <Icon
              icon={InformationCircleIcon}
              variant='simple'
              tooltip='This is a simple demo of a tabbed chart view.'
            />
          </Flex>
        </div>
        <div>
          <TabGroup index={selectedIndex} onIndexChange={setSelectedIndex}>
            <TabList color='gray' variant='solid'>
              <Tab>Tab 1</Tab>
              <Tab>Tab 2</Tab>
              <Tab>Tab 3</Tab>
            </TabList>
          </TabGroup>
        </div>
      </div>
      {/* web */}
      <div className='mt-8 hidden sm:block'>
        <AreaChart {...areaChartArgs} />
      </div>
      {/* mobile */}
      <div className='mt-8 sm:hidden'>
        <AreaChart
          {...areaChartArgs}
          startEndOnly={true}
          showGradient={false}
          showYAxis={false}
        />
      </div>
    </>
  );
}
