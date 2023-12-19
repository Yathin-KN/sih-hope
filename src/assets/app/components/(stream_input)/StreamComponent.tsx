import { useEffect, useState } from "react"

export function StreamInputComponent({stream}:{stream:any}){
   const [input,setInput]=useState("")

   useEffect(()=>{
    setInput(prevInput => prevInput + " " + stream);
   },[stream])
   return (<div className="w-full h-full text-sm bg-slate-100" >
       <div className="text-gray-700">
         {
            input
         }
       </div>
   </div>)
}