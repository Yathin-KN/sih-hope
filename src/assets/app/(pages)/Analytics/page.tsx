import React, { Suspense } from "react";
import generateAnalyticsData from "../../utils/card_dummy";
import { DataTable } from "../../components/datatable";
import { ticketColumns } from "../../components/columns";

interface AnalyticsData {
  title: string;
  value: string | number;
  description: string;
}

interface Ticket {
  requests: string;
  createdAt: string;
  description: string;
  createdBy: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
  status: "new" | "active" | "done";
}

export const TicketData: Ticket[] = [
  {
    requests: "Request 1",
    createdAt: "2023-01-15",
    description: "Description for Ticket 1",
    createdBy: "User A",
    priority: "high",
    dueDate: "2023-02-28",
    status: "new",
  },
  {
    requests: "Request 2",
    createdAt: "2023-03-20",
    description: "Description for Ticket 2",
    createdBy: "User B",
    priority: "medium",
    dueDate: "2023-04-15",
    status: "active",
  },
  {
    requests: "Request 3",
    createdAt: "2023-05-10",
    description: "Description for Ticket 3",
    createdBy: "User C",
    priority: "low",
    dueDate: "2023-06-30",
    status: "done",
  },
  {
    requests: "Request 4",
    createdAt: "2023-07-02",
    description: "Description for Ticket 4",
    createdBy: "User D",
    priority: "high",
    dueDate: "2023-08-18",
    status: "new",
  },
  {
    requests: "Request 5",
    createdAt: "2023-09-12",
    description: "Description for Ticket 5",
    createdBy: "User E",
    priority: "medium",
    dueDate: "2023-10-25",
    status: "active",
  },
];

const AnalyticsCard = ({ title, value, description }: AnalyticsData) => {
  return (
    <div className="border rounded-sm shadow-sm p-4 py-6  bg-white flex-grow">
      <h3 className="text-md font-semibold mb-2">{title}</h3>
      <p className="text-3xl text-blue-700 font-extrabold mb-2">{value}</p>
      <p className="text-gray-600 text-xs">{`${description}`}</p>
    </div>
  );
};

const AnalyticsCards = async () => {
  const analyticsData: AnalyticsData[] = await generateAnalyticsData();

  return (
    <div className="w-full h-fit">
      <div className="flex justify-even gap-4">
        {analyticsData.map((data, index) => (
          <Suspense fallback={<Skeleton />}>
            <AnalyticsCard key={index} {...data} />
          </Suspense>
        ))}
      </div>
      <div className="w-full my-4">
        {/* <DataTable columns={ticketColumns} data={TicketData}/> */}
      </div>
    </div>
  );
};

const AnalyticsWithSuspense = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <AnalyticsCards />
    </Suspense>
  );
};

const Skeleton = () => {
  return (
    <div className="border p-4 my-4 animate-pulse">
      <h3 className="bg-gray-300 w-3/4 h-4 mb-2 rounded"></h3>
      <p className="bg-gray-200 w-1/2 h-4 rounded"></p>
      <p className="bg-gray-200 w-3/4 h-4 rounded"></p>
    </div>
  );
};

export default AnalyticsWithSuspense;
