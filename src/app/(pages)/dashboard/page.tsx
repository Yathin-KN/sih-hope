import { atom } from "jotai";
import Chat from "../../components/(chat_componenets)/chat";
import Conversation from "../../components/(conversations_components)/coversation";
import Recommendations from "../../components/Recommendations";
import DashBoardLayout from "../layout";

export const Countatom = atom(0);
export const textInputField = atom("");
export const ticketDataIdInView = atom("");
export default function Dashboard() {
  return (
    <DashBoardLayout>
         <div className="flex h-[calc(100vh-6rem)]">
      <div className="w-1/3 h-full">
        <Chat />
      </div>
      <div className="w-1/3">
        <Conversation />
      </div>
      <div className="w-1/3 h-full">
        <Recommendations />
      </div>
    </div>
    </DashBoardLayout>
   
  );
}
