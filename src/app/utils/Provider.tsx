"use client"
import { ReactNode, useState } from "react"
import { QueryClientProvider , QueryClient } from "react-query"

export default function Provider({children}:{children:ReactNode}){
   const [queryClient]=useState<any>(()=>new QueryClient());
   return(
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
   )
}