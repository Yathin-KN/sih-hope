import {faker} from '@faker-js/faker';

interface AnalyticsData {
  title: string;
  value: string | number;
  description: string;
}

const generateAnalyticsData = (): Promise<AnalyticsData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const analytics: AnalyticsData[] = [
        {
          title: 'Ticket Volume',
          value: faker.datatype.number({ min: 1, max: 500 }),
          description: 'Total Tickets',
        },
        {
          title: 'Average Resolution Time',
          value: `${faker.datatype.number({ min: 2, max: 24 })}h ${faker.datatype.number({ min: 0, max: 60 })}m`,
          description: 'Avg. Time (hh:mm)',
        },
        {
          title: 'Customer Satisfaction',
          value: `${faker.datatype.number({ min: 0, max: 100 })}%`,
          description: 'Satisfaction Rate',
        },
        {
          title: 'Open Tickets',
          value: faker.datatype.number({ min: 1, max: 50 }),
          description: 'Currently Open',
        },
      ];

      resolve(analytics);
    }, 1000);
  });
};

export default generateAnalyticsData;
