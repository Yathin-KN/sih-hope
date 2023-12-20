"use client";
import clsx from "clsx";
import {
  ChevronUpCircle,
  Info,
  Loader2,
  MoreVertical,
  PhoneIncoming,
} from "lucide-react";
import { BiSupport } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { atom, useAtom  } from "jotai";
import { Countatom, textInputField, ticketDataIdInView } from "../../(pages)/dashboard/page";
import { useQuery } from "react-query";
import { CallMessage, TicketData } from "../../types";
import { fetchTicketData } from "../../api/getTicketData";
import TicketPopupCard from "./ticketInfoCard";
import ResolutionForm from "../(chat_componenets)/ResolutionModal";
import useUserStore from "../../store/userStore";
import { addTextMessageToTicket } from "../../api/addTextMessage";
import { newChatAtomTrigger } from "../../(pages)/layout";
import { queryResponseAtom } from "../Recommendations";
import { TranslateRequest, translateText } from "../../api/translation";

type UserType = "Customer" | "Agent";

interface Options {
  user: UserType;
  type: "Text" | "Call";
}

interface ChatBubble {
  name: string;
  text: string;
  options: Options;
  time:string;
}

function Modal({ setIsOpen , text }: { setIsOpen: any , text:string }) {

  const [_,setRecommendationText]=useAtom(recommendationText)
  const handleClick=async()=>{
    //  if(text){
    //   const translatedResult = await translateText(translationRequest);
    //  }
     setRecommendationText(text)
  }
  return (
    <div className="text-xs bg-green-500 min-w-max text-white absolute top-[-0.2rem] right-[0.45rem] p-2 rounded-md flex flex-row-reverse">
      <button className="uppercase font-semibold   px-2" onClick={() => {
        setIsOpen(false)
        handleClick()
        }}>
        recommend text
      </button>
    </div>
  );
}

interface CallBubbleProps {
  callData: CallMessage;
}



const CallBubble: React.FC<CallBubbleProps> = ({ callData }) => {
  const { date, time, transcript } = callData;
  const [showTranscript, setShowTranscript] = useState<boolean>(false);

  return (
    <div className="w-full flex">
      <div className="flex gap-3 pl-2 py-1  flex-grow border-l-4 border-purple-500">
        
        <div className="flex-grow">
          <div className="flex justify-between ">
            <div className="text-sm text-gray-800 font-semibold">Incoming Call</div>
            <div className="flex justify-center items-center">
              <div className="text-xs text-slate-500">{time}</div>
              <span className="relative">
                <MoreVertical size={16} className="text-slate-500 cursor-pointer" onClick={() => setShowTranscript(!showTranscript)} />
              </span>
            </div>
          </div>
          {!showTranscript ? (
            <div className="font-light text-sm w-8/9">
              <div className="p-4 rounded-sm my-2 flex-grow">
                <audio src={callData.audio_file} controls className="w-full"></audio>
              </div>
            </div>
          ) : (
            <div className="bg-white  border-gray-200  rounded-sm my-2">
              <p className="text-gray-800 text-sm font-semibold mb-2">Transcript:</p>
              <div className="">
                {transcript.result.conv.map((sentence, index) => {
                  const isHelpdeskMessage = sentence.startsWith("helpdesk");
                  const identifier = isHelpdeskMessage ? "helpdesk" : "customer";
                  const messageClass = isHelpdeskMessage ? "bg-slate-100 text-gray-800" : "bg-blue-500 text-white";
                  const messageContent = sentence.substring(identifier.length + 2);
                  return (
                    <div key={index} className={`p-2 rounded-lg text-sm mb-2 max-w-full ${messageClass}`}>
                      <p className="w-full text-sm">{isHelpdeskMessage ? "Helpdesk " : "Customer "}</p>
                    <p>{messageContent}</p>
                   </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


function ConversationBubble({ name, text, options , time }: ChatBubble) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className={clsx("w-full flex ")}>
      <div
        className={clsx("flex gap-3 pl-2 py-1  flex-grow", {
          "border-l-4 border-orange-400": options.user === "Customer",
          "border-l-4 border-purple-500": options.user === "Agent",
        })}
      >
        <div className="w-10 h-10 aspect-square rounded-full text-white uppercase bg-gray-600 justify-center items-center flex relative">
          <span>{`${name[0]}${name[1]}`}</span>
          {options.user === "Agent" && (
            <span className="w-5 aspect-square flex justify-center items-center h-5 rounded-full absolute bottom-[-8px] right-[-8px] bg-gray-400 m-1 p-1">
              <BiSupport />
            </span>
          )}
          
        </div>
        <div className="flex-grow">
          <div className="flex justify-between ">
            <span className="flex items-center gap-2">
              <div className="text-sm text-gray-800 font-semibold">{name}</div>
              {options.type === "Call" && (
                <PhoneIncoming size={16} className="text-slate-400" />
              )}
            </span>
            <div className="flex justify-center items-center">
              <div className="text-xs text-slate-500">{time}</div>
              <span className="relative">
                <MoreVertical
                  size={16}
                  className="text-slate-500 cursor-pointer"
                  onClick={() => setIsOpen(true)}
                />
                {isOpen && <Modal setIsOpen={setIsOpen} text={text}/>}
              </span>
            </div>
          </div>
          <div className="font-light text-sm w-8/9 ">
            {options.type === "Text" ? (
              text
            ) : (
              <div className="p-4 border border-slate-300 rounded-md my-2 flex-grow">
                <audio src="./audio" controls className="w-full"></audio>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// const md: ChatBubble[] = [
//   {
//     name: "Yathin",
//     text: "How do I reserve a meeting room for our annual meeting?",
//     options: {
//       user: "Agent",
//       type: "Call",
//     },
//   },
// ];

interface AssignmentHistory {
  assigned_at: string;
  assigned_by: string;
  assignee: string;
  assignment_type: string;
  comments: string;
}

const ticket: AssignmentHistory[] = [
  {
    assigned_at: "12-12-2023 10:56:18",
    assigned_by: "None",
    assignee: "Employee object",
    assignment_type: "Reassignment",
    comments: "Ticket accepted by employee MOC1",
  },
  {
    assigned_at: "12-12-2023 10:56:18",
    assigned_by: "None",
    assignee: "Employee object",
    assignment_type: "Reassignment",
    comments: "Ticket accepted by employee MOC1",
  },
  {
    assigned_at: "12-12-2023 10:56:18",
    assigned_by: "None",
    assignee: "Employee object",
    assignment_type: "Reassignment",
    comments: "Ticket accepted by employee MOC1",
  },
];

// function TicketPopup({
//   assignment_history,
// }: {
//   assignment_history: AssignmentHistory[];
// }) {
//   const [open, setOpen] = useState<boolean>(false);
//   const [showCard, setShowCard] = useState<boolean>(false);

//   const handleMouseEnter = () => {
//     setOpen(true);
//     setShowCard(true);
//   };

//   const handleMouseLeave = () => {
//     setOpen(false);
//     setShowCard(false);
//   };

//   return (
//     <div
//       className="p-3 text-sm flex flex-col gap-2 bg-white text-slate-500 min-w-max border shadow-sm"
//       style={{ borderRadius: "0.5rem" }}
//     >
//       <div className="flex items-center gap-2">
//         <p onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//           Ticket Info
//         </p>
//         <span className="text-blue-400 relative">
//           <Info size={13} />
//           {showCard && (
//             <TicketInfoCard ticketAssignmentHistory={assignment_history} />
//           )}
//         </span>
//       </div>
//       <p>Auto add to RAG</p>
//     </div>
//   );
// }


export const recommendationText = atom("");

interface AddMessageToTicketParams {
  ticketId: string;
  accessToken: string;
  text: string;
  refetch: () => void;
  recommendationText: string;
}

export const satisfiedPopupTriggerAtom=atom(false)

export const addMessageToTicket = async ({
  ticketId,
  accessToken,
  text,
  refetch,
  recommendationText,
}: AddMessageToTicketParams): Promise<void> => {


  const [_,setSatisfiedTrigger]=useAtom(satisfiedPopupTriggerAtom)
  try {
    if (!ticketId || !accessToken || !text) {
      throw new Error('Incomplete information provided');
    }

    await addTextMessageToTicket({
      ticketId,
      accessToken,
      messageBody: text,
    });


    console.log({ "query": recommendationText, "accepted_answer": text });
    console.log('Message added successfully!');
    setSatisfiedTrigger(true)
    refetch();
  } catch (error) {
    console.error('Failed to add message:', error);
    throw error;
  }
};
const Conversation = () => {
  const [_, setCount] = useAtom(Countatom);
  const [value] = useAtom(textInputField);
  const [text, setText] = useState<string>("");
  const [messages, setMessage] = useState<ChatBubble[]>();
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [ticketId, setTicketID] = useAtom(ticketDataIdInView);
  const [newChatTrigger,setNewChatTrigger]=useAtom(newChatAtomTrigger)
  useEffect(() => {
    setText(() => value);
  }, [value]);


  const [queryresponse, setQueryResponse] = useAtom(queryResponseAtom)
  

  const accessToken=useUserStore.getState().accessToken;
  const { data , refetch } = useQuery<TicketData>({
    queryKey: ["Ticket_Data"],
    queryFn: () =>
      fetchTicketData({
        ticket_id: ticketId ? ticketId : "",
        accessToken:accessToken ||""
      }),
      enabled: !!ticketId
  });


  useEffect(()=>{
    if(newChatTrigger){
       refetch()
       setNewChatTrigger(false)
    }
  },[newChatTrigger])

  useEffect(()=>{
       if(ticketId !=="") refetch()
  },[ticketId])


  const handleChange = (text: string) => {
    setText(() => {
      return text;
    });
  };
  
  const [isLoading,setIsLoading]=useState(false)
  const handleClick = async () => {
    if (!ticketId || !accessToken || text==="") {
      return;
    }
  
    setIsLoading(true);
    
    try {
      await addTextMessageToTicket({
        ticketId,
        accessToken,
        messageBody: text,
      });

      console.log({"query":recommendationText,"accepted_answer":text})
      console.log('Message added successfully!');



      refetch();
    } catch (error) {
      console.error('Failed to add message:', error);
    } finally {
      setIsLoading(false);
      setText("");

    }
  };
  
  const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Chinese', value: 'zh' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Russian', value: 'ru' },
    { label: 'Hindi', value: 'hi' },
    { label: 'Bengali', value: 'bn' },
    { label: 'Telugu', value: 'te' },
    { label: 'Marathi', value: 'mr' },
    { label: 'Tamil', value: 'ta' },
    { label: 'Urdu', value: 'ur' },
    { label: 'Gujarati', value: 'gu' },
    { label: 'Kannada', value: 'kn' },
    { label: 'Malayalam', value: 'ml' },
    { label: 'Punjabi', value: 'pa' },
    { label: 'Oriya (Odia)', value: 'or' },
  ];
  

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  const [isTicketOpen, setIsTicketOpen] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  
  const handleSubmitAsSolved = () => {
    setIsModalOpen(true);
  };
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const handleLanguageChange = async (e:any) => {
    setSelectedLanguage(e.target.value);
    const translationRequest: TranslateRequest = {
      text: text,
      targetLanguage: e.target.value,
    };
  
    try {
      const translatedText = await translateText(translationRequest);
      setText(translatedText);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  return (
    <div className="h-full mx-4">
      <div className="text-md text-gray-800 font-semibold flex justify-between items-center">
        <span>Conversation</span>
        <p className="text-sm text-slate-400">{ticketId && `Ticket Id :${ticketId}`}</p>
      </div>
      <div className="rounded-sm w-full h-full relative">
        <div className="text-sm py-1 w-full flex justify-between flex-row-reverse ">
          <div
            onClick={() => setIsTicketOpen((prev) => !prev)}
            className="cursor-pointer relative"
          >
            <MoreVertical size={16} />
            {isTicketOpen && (
              <span className="absolute left-4 top-[-0.5rem]">
                <TicketPopupCard ticketAssignmentHistory={ticket} />
              </span>
            )}
          </div>
        </div>

        <div className="space-y-6 py-2  h-[50vh] overflow-y-auto bg-slate-100 rounded-md mb-3">
          {data?.ticket.map((ticket, _index) => {
            return ticket.conversation_history?.conversations.map(
              (conversation, _) => {
                return conversation.messages.map((messages, index) => {
                  if(messages.type==="Text"){
                    return (
                      <div
                        key={index.toString()}
                        ref={
                          index === conversation.messages.length - 1
                            ? lastMessageRef
                            : null
                        }
                      >
                        <ConversationBubble
                          name={messages.text_message?.sent_by || ""}
                          text={messages.text_message?.message || ""}
                          options={{
                            user: messages.text_message?.sent_by as UserType,
                            type: messages.type as "Text" | "Call",
                          }} time={messages.time} />
                      </div>
                    );
                  }else{
                     if(messages.call_message){
                        return <CallBubble callData={messages.call_message}/>
                     }
                  }
                });
              }
            );
          })}
        </div>
        <div className="w-full">
          <div className="border border-x-0 border-t-0 relative items-center">
            <textarea
              placeholder="chat"
              className="w-full h-[150px] bg-slate-100 py-6 px-3 rounded-sm focus:outline-none relative "
              value={text || ""}
              onChange={(e) => handleChange(e.target.value)}
            ></textarea>
             <select className="absolute top-1 right-3 text-sm" value={selectedLanguage} onChange={(e) => handleLanguageChange(e)}>
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value} className="text-sm">
            {option.label}
          </option>
        ))}
      </select>
            <div
              className={clsx("text-white bg-blue-500 absolute right-2 bottom-4 text-sm cursor-pointer py-1 px-3 rounded-md flex justify-center items-center hover:bg-white hover:text-blue-500",{
                "bg-white":isLoading,
                "text-blue-500":isLoading,
              })}
              onClick={() => handleClick()}
            >
              {isLoading && <Loader2 className="animate-spin text-xs mx-2"/>} {isLoading ? "sending ...." :"send"}
            </div>
          </div>
          <div className="w-full flex flex-row-reverse my-2">
            <button
              className="capitalize py-2 px-3  text-white bg-gray-700 text-sm "
              style={{
                borderRadius: "0.5rem",
              }}
              onClick={handleSubmitAsSolved}
            >
              submit as solved
            </button>
          </div>
          <ResolutionForm isOpen={isModalOpen} onClose={handleModalClose} />
        </div>
      </div>
    </div>
  );
};

export default Conversation;
