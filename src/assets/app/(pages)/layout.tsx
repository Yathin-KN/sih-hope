"use client"
import NavBar from "../components/(nav_components)/navbar"
import Profile from "../components/(nav_components)/profile"
import "../globals.css"
import Provider from "../utils/Provider"
import { useEffect } from "react"
import {io} from "socket.io-client"
import useUserStore from "../store/userStore"
import { atom, useAtom } from "jotai"
import { NewTicket } from "../types"
import { BASE_URL } from "../api/api"

export const new_notification=atom<NewTicket | null>(null)
export const notifications_=atom<NewTicket[]>([])
export const refetchAtom = atom<() => void>(() => {
});

export const refetchAtomTrigger=atom<boolean>(false);
export const newChatAtomTrigger=atom<boolean>(false);
export const notificationTrigger=atom<boolean>(false);
export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  const accessToken=useUserStore.getState().accessToken;
  const [_,setNewNotification]=useAtom(new_notification)
  const [__,setRefetchTrigger]=useAtom(refetchAtomTrigger)
  const [___,setNewChatTrigger]=useAtom(newChatAtomTrigger)
  const [_____,setNewNotificationTrigger]=useAtom(notificationTrigger)

  useEffect(()=>{
    const socket=io(BASE_URL,{
      extraHeaders:{
          'Authorization-Access': `${accessToken}`,
          "ngrok-skip-browser-warning": "true"
      }
    })
    socket.on('connect',()=>{
       console.log("sucessfully connected !!!")
    })

    socket.on('new_ticket', (data) => {
      console.log("New ticket received:", data);
      setNewNotification(data)
      setNewNotificationTrigger(prev=>!prev);
    });
  
    socket.on('ticket_accepted', (data) => {
      console.log("Ticket accepted:", data);
      setRefetchTrigger(prev=>!prev)
    });
  
    socket.on('ticket_reassigned', (data) => {
      console.log("Ticket reassigned:", data);
      setRefetchTrigger(prev=>!prev)
    });
  
    socket.on('new_chat', (data) => {
      console.log("New chat message received:", data);
      setNewChatTrigger(true)
    });
 },[])
 
  return (
    <html lang="en">
      <body className="flex" >
    <Provider>
      <NavBar/>
      <div className='w-full h-screen'>
         <Profile/>
         <div className='w-full p-4 '>
          {children}
         </div>
      </div>
      </Provider>
        </body>
    </html>
  )
}