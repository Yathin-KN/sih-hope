'use client'

export function Card(){
    const pathname="/Hello";
    if(pathname==="/Hello") return <></>
    return <div className="w-full p-4 flex-col gap-6">
       <h1 className="text-4xl font-extrabold text-gray-700 py-2">
          {pathname}
       </h1>
       <div className="flex-row  space-x-1 capitalize text-sm">
          <a className="text-gray-500 " href={"/Hello"}>
            Home 
          </a>
          <span className="text-gray-900">
            {"/ " + pathname}
          </span>
       </div>
    </div>
}