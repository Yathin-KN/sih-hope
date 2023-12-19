"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchInitialConversations } from "../../api/getAllTickets";
import { useEffect, useState } from "react";
import clsx from "clsx";
import useUserStore from "../../store/userStore";
import { useAtom } from "jotai";
import { ticketDataIdInView } from "@/app/(pages)/dashboard/page";
import { refetchAtomTrigger } from "@/app/(pages)/layout";
type TicketStatus = "new" | "resolved" | "active";

const SkeletonCard = () => {
  return (
    <div className="flex w-full py-4 px-2 gap-2 my-3 rounded-md border h-[90px]  animate-pulse bg-gray-300">

    </div>
  );
};

type StatusType = "resolved" | "new" | "active";

export default function Chat() {
  const [refetchTrigger, setRefetchTrigger] = useAtom(refetchAtomTrigger);
  const [ticketStatus, setTicketStatus] = useState<StatusType>("resolved");
  const accessToken = useUserStore((state) => state.accessToken);
  console.log("---------------------", accessToken);
  const { data, refetch , isRefetching , isFetched} = useQuery({
    queryKey: ["all conversations"],
    enabled: true,
    queryFn: () =>
      fetchInitialConversations({
        status: ticketStatus,
        accessToken: accessToken || "",
      }),
  });

  useEffect(() => {
    refetch();
  }, [ticketStatus]);

  const [ticketID, setTicketId] = useAtom(ticketDataIdInView);
  function handleClick(_id: string): void {
    setTicketId(_id);
  }

  const handleStatusClick = (status: StatusType) => {
    setTicketStatus(status);
  };

  useEffect(() => {
      refetch();
  }, [refetchTrigger]);
  return (
    <>
      <div className="h-full  rounded-md">
        <div className="text-bold text-gray-800 font-semibold">
          Chat
          <div className="text-sm flex gap-2">
            <label htmlFor="ticketStatus">Select Ticket Status: </label>
            <div className="flex flex-row space-x-2">
              <button
                onClick={() => handleStatusClick("resolved")}
                className={clsx(
                  "bg-white shadow-sm border-md px-2 py-1 border-[1.8px]",
                  {
                    "border-green-500": ticketStatus === "resolved",
                  }
                )}
                style={{
                  borderRadius: "0.75rem",
                }}
              >
                resolved
              </button>
              <button
                onClick={() => handleStatusClick("active")}
                className={clsx(
                  "bg-white shadow-sm border-md px-2 py-1 border-[1.8px]",
                  {
                    "border-green-500": ticketStatus === "active",
                  }
                )}
                style={{
                  borderRadius: "0.75rem",
                }}
              >
                active
              </button>
              <button
                onClick={() => handleStatusClick("new")}
                className={clsx(
                  "bg-white shadow-sm border-md px-2 py-1 border-[1.8px]",
                  {
                    "border-green-500": ticketStatus === "new",
                  }
                )}
                style={{
                  borderRadius: "0.75rem",
                }}
              >
                new
              </button>
            </div>
          </div>
        </div>
        {isRefetching &&
          Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        {(data && !isRefetching) &&
          data.map((chat, index) => {
            return (
              //   <div
              //   key={chat._id}
              //   className={clsx(
              //     'flex cursor-pointer w-full rounded-md py-4 px-2 gap-2 bg-slate-100 h-[90px]',
              //     {
              //       'border-t-0': index !== 0,
              //     }
              //   )}
              //   onClick={() => handleClick(chat._id)}
              // >
              //   <div className="w-full">
              //     <div className="flex w-full justify-between">
              //       <div className="flex items-center justify-center w-10 h-10 my-2 bg-gray-300 rounded-full text-white text-sm">
              //         {chat.customer_phone_no.substring(0,3)}
              //       </div>

              //       <div className="w-full flex items-center">
              //       <div className="w-11/12 text-sm text-gray-600">
              //         {chat.last_conversation?.last_message?.sent_by === 'customer'
              //           : 'Customer:'}
              //         {chat.last_conversation?.last_message?.content}
              //       </div>
              //     </div>
              //     </div>

              //   </div>
              // </div>
              <div
                className={clsx("flex items-center cursor-pointer p-3 py-5  rounded-md w-full my-3",{
                  "bg-blue-200":chat._id===ticketID,
                  "bg-slate-100":!(chat._id===ticketID)
                })}
                onClick={() => handleClick(chat._id)}
              >
                <div className="h-10 w-10 aspect-square rounded-full bg-slate-400 items-center flex justify-center">
                  <span className="text-sm font-semibold text-white">
                    {chat.customer_phone_no.substring(0, 3)}
                  </span>
                </div>
                <div className="mx-2 min-w-max flex-1">
                  <p className="text-sm font-semibold text-gray-700 flex items-center justify-between">
                    <span>{chat.customer_phone_no}</span>
                    <span className="text-gray-600 text-xs">
                      {chat.last_conversation?.timestamp}
                    </span>
                  </p>
                  <p className="text-gray-600 text-sm">
                    {chat.last_conversation?.last_message.sent_by ===
                      "agent" && <span className="">You :</span>}
                    {chat.last_conversation?.last_message.content.substring(0,14)+" ..."}
                  </p>
                </div>
              </div>
            );
          })}
          {
            (isFetched &&  !data) && (
              <div className="w-full h-[90%] my-4 rounded-md bg-slate-100 flex justify-center items-center">
                  <div className="text-xl font-semibold text-gray-600 capitalize">
                    No chats here !!
                    </div>
              </div>
            )
          }
      </div>
    </>
  );
}
