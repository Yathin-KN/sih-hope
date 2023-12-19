"use client";

import { useEffect, useState } from "react";
import { NewTicket } from "../../types";
import { useAtom } from "jotai";
import { new_notification, notifications_, refetchAtomTrigger } from "../../(pages)/layout";
import { acceptTicket } from "@/app/api/acceptTicket";
import useUserStore from "@/app/store/userStore";

interface NotificationCardInterface {
  name: string;
  ticketId: string;
  type: "new" | "forwarded";
}

const IconMap = {
  new: (
    <span className="text-xs py-1 px-2 rounded-md border border-white bg-green-400 ">
      NEW
    </span>
  ),
  forwarded: (
    <span className="text-xs py-1 px-2 rounded-md border border-white ">
      FORWARDED
    </span>
  ),
};

// const dummy_data: NewTicket[] = [
//   {
//     id: "657c53c9cc335968466b4c5d",
//     customer_phone_no: "+919148668330",
//     priority: "Medium",
//   },
// ];

function LabelValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-sm">
      <span className="text-slate-600 font-semibold">{label} :</span>
      {label !== "type" ? (
        <span className="text-slate-800 font-light">{value}</span>
      ) : (
        IconMap["new"]
      )}
    </div>
  );
}
function NotificationCard({ id, customer_phone_no, priority , setIsOpen}: NewTicket) {
  const accessToken = useUserStore().accessToken;
  const [_,setRefetchTrigger]=useAtom(refetchAtomTrigger)
  const handleClick = async (id: string) => {
    try {
      if (!accessToken) return;
      const status = await acceptTicket(id, accessToken);
      console.log("Status code:", status);
    } catch (error: any) {
      console.error("Error accepting ticket:", error.message);
    }finally{
      setRefetchTrigger((prev)=>!prev)
      setIsOpen(false)
    }
  };
  return (
    <div className="w-[300px] rounded-md">
      <LabelValue label={"Customer"} value={customer_phone_no} />
      <LabelValue label={"Ticket Id"} value={id} />
      <LabelValue label={"Type"} value={priority} />
      <div className="flex py-1 justify-between text-xs w-full ">
        <button
          className="py-1 px-2 rounded-md text-white font-semibold bg-blue-500 "
          onClick={() => handleClick(id)}
        >
          Accept
        </button>
        <button className="py-1 px-2  text-white font-semibold bg-blue-500 rounded-lg">
          Forward
        </button>
      </div>
    </div>
  );
}
const Notification = ({setIsOpen}:{setIsOpen:any}) => {
  const [notifications, setNotifications] = useAtom(notifications_);

  const [new_notification_val, set_new_notification_val] =
    useAtom(new_notification);
    
  useEffect(() => {
    if (new_notification_val) {
      const existingNotification = notifications.find(
        (notification) => notification.id === new_notification_val.id
      );

      if (!existingNotification) {
        setNotifications((prev: NewTicket[]) => [
          ...prev,
          new_notification_val,
        ]);
      }

    }
  }, [new_notification_val]);

  if(notifications.length===0){
    return (<div className="absolute top-10 right-0 p-2 bg-white border rounded-md text-sm min-w-max hidden">
        No Notifications ! 
    </div>)
  }
  return (
    <div className="absolute top-10 left-[-260px] p-2 bg-white border rounded-md">
    <div className="text-sm text-slate-700 w-full justify-between flex items-center">
      <span className="text-sm mx-3">Notifications</span>
      <span className="flex justify-between items-center space-x-2">
        <span className="w-5 h-5 rounded-full bg-green-500 text-xs aspect-square text-white flex justify-center items-center">
          <span>{notifications.length}</span>
        </span>
        <h3 className="text-xs text-slate-400">messages</h3>
      </span>
    </div>
    <div className="p-1 space-y-3">
      {notifications.length > 0 ? (
        notifications.map(({ id, customer_phone_no, priority }: NewTicket) => (
          <NotificationCard
            key={id}
            id={id}
            customer_phone_no={customer_phone_no}
            priority={priority} setIsOpen={setIsOpen}          />
        ))
      ) : (
        <div className="relative text-sm py-2 px-3 rounded-sm bg-white text-slate-700">
          No notifications yet!
        </div>
      )}
    </div>
  </div>
  );
};

export default Notification;
