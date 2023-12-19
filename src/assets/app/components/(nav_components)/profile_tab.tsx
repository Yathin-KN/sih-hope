// import {
//     Tooltip,
//     TooltipContent,
//     TooltipProvider,
//     TooltipTrigger,

import useUserStore from "@/app/store/userStore";

//   } from "@/components/ui/tooltip" 
interface Employee {
    email: string;
    employeeId: string;
    profilePicture: string;
  }

  // const Badge: React.FC<{ label: string; value: number }> = ({ label, value }) => {
  //   return (
  //       <TooltipProvider>
  //       <Tooltip>
  //         <TooltipTrigger>
  //           <p className="py-1 px-4 border rounded-md text-xs font-semibold text-slate-600" style={{
  //               borderRadius:'1rem'
  //           }}>{value}</p>
  //         </TooltipTrigger>
  //         <TooltipContent>
  //           <p className="bg-white p-0 opacity-100" style={{
  //               borderRadius:'1.2rem'
  //           }}>{label}</p>
  //         </TooltipContent>
  //       </Tooltip>
  //     </TooltipProvider>
  //   );
  // };
  const Profile_tab = () => {
    const email=useUserStore.getState().userEmail;
    return (
      <div className=" max-w-fit bg-white absolute top-11 right-4 rounded-md">
        <div className="">
          <div className="text-md text-center px-3 py-1 bg-gray-800 mb-2  text-white">Executive Information</div>
        <div className="px-6">
          <div className="flex gap-4 justify-center items-center">
            <div className="w-12 h-12 bg-slate-400 aspect-square rounded-full">
            
          </div>
          <div>
            <div className="flex text-sm"><p className="text-gray-500">Name :</p><p className="text-gray-800">John Doe</p></div>
            <div className="flex text-sm"><p className="text-gray-500">Email :</p><p className="text-gray-800">johndoe@gmail.com</p></div>
            <div className="flex text-sm"><p className="text-gray-500">E-ID :</p><p className="text-gray-800">#12345</p></div>
          </div>
          </div>  
          <div>
            <p className="p-2 text-left">Ticket stats</p>
            <div className="flex gap-4 w-full  justify-between">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 aspect-square rounded-full flex justify-center items-center text-white font-semibold text-md bg-gray-800">
                  <span>12</span>
                </div>
                <div className="text-center text-xs my-1">Resolved</div>
              </div>
               <div className="flex flex-col items-center">
                <div className="w-10 h-10  aspect-square rounded-full flex justify-center items-center text-white font-semibold text-md bg-gray-800">
                  <span>12</span>
                </div>
                <div className="text-center text-xs my-1">Resolved</div>
              </div>
                 <div className="flex flex-col items-center">
                <div className="w-10 h-10  aspect-square rounded-full flex justify-center items-center text-white font-semibold text-md bg-gray-800">
                  <span>12</span>
                </div>
                <div className="text-center text-xs my-1">Resolved</div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  };
  
  

export default Profile_tab