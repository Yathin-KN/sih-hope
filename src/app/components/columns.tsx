"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AllTickets, TicketData } from "../types";

export type Ticket={
    requests:string;
    createdAt:string;
    description:string;
    createdBy:string;
    priority:"low"|"medium"|"high",
    dueDate:string;
    status:"new"|"active"|"done"
}

export const ticketColumns: ColumnDef<Ticket>[] = [
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "requests",
      header: "Requests",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "createdBy",
      header: "Created By",
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell:()=>{return <div>j</div>}
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
    },
  ];