'use client'
import Link from "next/link";
import { usePathname } from "next/navigation"

export function Card(){
    const pathname=usePathname();
    if(pathname==="/Hello") return <></>
    return <div className="w-full p-4 flex-col gap-6">
       <h1 className="text-4xl font-extrabold text-gray-700 py-2">
          {pathname.slice(1)}
       </h1>
       <div className="flex-row  space-x-1 capitalize text-sm">
          <Link className="text-gray-500 " href={"/Hello"}>
            Home 
          </Link>
          <span className="text-gray-900">
            {"/ " + pathname.slice(1)}
          </span>
       </div>
    </div>
}