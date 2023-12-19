'use client'
import { ArrowUpRightFromCircle, Bell } from "lucide-react";
import SevaConnect from "./SevaConnect";
import Notification from "./notification";
import { useEffect, useState } from "react";
import Profile_tab from "./profile_tab";
import TicketRedirect from "./TicketRedirect";
import { useAtom } from "jotai";
import { ticketDataIdInView } from "../../(pages)/dashboard/page";
import { new_notification, notificationTrigger } from "../../(pages)/layout";
import Link from "next/link";


// interfaces.ts
interface Employee {
    email: string;
    employeeId: string;
    profilePicture: string;
  }

  
const employeeData: Employee = {
    email: 'johndoe@example.com',
    employeeId: 'EMP1234',
    profilePicture: 'https://via.placeholder.com/150', 
  };
  

const status:boolean = true; 
export default function Profile(){
    const [isOpen,setIsOpen]=useState<boolean>(false);
    const [isOpenProfile,setIsOpenProfile]=useState<boolean>(false);
    const [isOpenTicketRedirect,setIsOpenTicketRedirect]=useState<boolean>(false)
    const [ticket_id,__]=useAtom(ticketDataIdInView)
    const [new_notification_val,_]=useAtom(new_notification)
    const [new_notification_trigger_val,___]=useAtom(notificationTrigger);


    useEffect(()=>{
       console.log("check ------------------------")
       setIsOpen(true);
    },[new_notification_trigger_val])

    return <div className="w-full bg-[#1b373b] p-3 flex justify-between items-center gap-3">
        <div className="flex justify-center items-center mr-10">
         <SevaConnect/>
         <div className="text-white flex items-center mx-3">
         <p className="capitalize text-white text-sm mx-3">ticket redirect</p>
           <span className="cursor-pointer relative">
             <span onClick={()=>setIsOpenTicketRedirect(prev=>!prev)}>
             <ArrowUpRightFromCircle  size={15}/>
             </span>
             {isOpenTicketRedirect && <div className="absolute top-8">
                {<TicketRedirect ticket_id={ticket_id}/>}
             </div>}
           </span>
            </div>
        </div>
        <div className="inline-flex items-center gap-3">
          <Link href={"/"} className="bg-white border px-2 py-1 text-gray-700 rounded-md mx-2 text-sm">Login</Link>
        <div className="relative">
            
            <Bell fill="white" stroke="white" size={22}  onClick={()=>setIsOpen((prev)=>!prev)} className="cursor-pointer"/>
           {status && <div className="w-[10px] h-[10px] aspect-square rounded-full bg-red-500 flex justify-center items-center absolute top-0 right-0 brightness-110">
            </div>}
            {isOpen && <Notification setIsOpen={setIsOpen}/>}
        </div>
    
        <div className="w-8 h-8 aspect-square rounded-full bg-slate-300 float-right relative cursor-pointer" onClick={()=>setIsOpenProfile(prev=>!prev)}>
            {isOpenProfile && <Profile_tab  />}
        </div>
        </div>
       
    </div>
}