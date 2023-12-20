import { Slider } from "@radix-ui/react-slider"
import Layout from "../../../assets/app/(pages)/layout"
import { Input } from "@/components/ui/input"
import { SetStateAction, useState } from "react"
import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { BASE_URL } from "@/app/api/api";
interface AnswerInfo {
  answer: string;
  id: string;
  score: number;
}

interface AnswerCardsProps {
  data: AnswerInfo[];
}

const data= [
  {
      "answer": "To create an account on SevaAI online store, please follow these steps:\n\n1. Visit the SevaAI online store website.\n2. Look for the \"Sign Up\" or \"Create Account\" option, usually located at the top right corner of the page.\n3. Click on that option, and you will be directed to the account creation page.\n4. Fill in the required information such as your name, email address, and password.\n5. Review and accept the terms and conditions, which are the rules and guidelines that govern the use of the online store.\n6. Once you have completed all the necessary fields, click on the \"Create Account\" or \"Sign Up\" button to finalize the process.\n\nRegarding the terms and conditions, it is important to carefully read and understand them before creating an account. These terms and conditions outline the rights and responsibilities of both the user (you) and the online store (SevaAI). They typically cover aspects such as privacy policies, payment terms, return policies, and more. It is advisable to review them thoroughly to ensure you are aware of the rules and regulations associated with using the online store.\n\nIf you have any specific questions or concerns about the terms and conditions, I recommend reaching out to SevaAI's customer support for further assistance.",
      "id": "168f9bf3-832e-4e96-a7ed-017b3d121748",
      "score": 0.019636456
  },
  {
      "answer": "To create an account on SevaAI online store, please follow these steps:\n\n1. Visit the SevaAI online store website.\n2. Look for the \"Sign Up\" or \"Create Account\" option, usually located at the top right corner of the page.\n3. Click on the option and you will be directed to the account creation page.\n4. Fill in the required information such as your name, email address, and password.\n5. Review and accept the terms and conditions, if prompted.\n6. Click on the \"Create Account\" or \"Sign Up\" button to complete the process.\n\nAs for the terms and conditions, they may vary depending on the specific policies of SevaAI online store. To access and review the terms and conditions, you can usually find a link at the bottom of the website's homepage or during the account creation process. It is important to read and understand the terms and conditions before creating an account to ensure compliance with the store's policies.\n\nIf you have any further questions or need assistance with the account creation process, please let me know.",
      "id": "f55a708a-ee73-4674-9c46-85c79b047ab5",
      "score": 0.018575093
  },
  {
      "answer": "To create an account with Seva AI, please follow these steps:\n\n1. Visit our website SevaAI.com.\n2. Click on the \"Register\" option.\n3. Fill in the mandatory details, including your full name, email address, secure password, contact number, and delivery address.\n4. Make sure to read and agree to the stated terms and conditions and privacy policy before proceeding.\n5. After completing the registration, you will receive an OTP (One-Time Password) on your registered phone number and email ID for email verification.\n6. Use the OTP to activate your account.\n7. When creating a new password, please ensure it adheres to the strong credential guidelines listed in our policy.\n\nIf you encounter any difficulties during the sign-up process or face common registration errors preventing account activation, please let us know. We can assist you by resending verification links or resetting your password.",
      "id": "b0181220-80bf-4a20-8650-5e3bd8d6c719",
      "score": 0.016393442
  }
]
const AnswerCards: React.FC<AnswerCardsProps> = ({ data }) => {
  const [selectedItem, setSelectedItem] = useState<AnswerInfo | null>(null);

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="container mx-auto ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 ">
        {data.map((item,) => (
          <div key={item.id} className="border border-gray-300 p-4 cursor-pointer rounded-md shadow-sm hover:bg-slate-100" style={{
            borderRadius:"0.5rem"
          }} onClick={() => setSelectedItem(item)}>
             <div className="w-full flex items-center justify-between">
             <p className="text-xs font-semibold text-gray-600">ID: {item.id}</p>
            <p className=" text-white font-semibold px-2 py-1 border-[1.2px] rounded-md bg-green-500 text-xs" style={{
              borderRadius:"0.3rem"
            }}>{item.score.toFixed(2)}</p>
            </div>
            <h3 className="text-lg font-bold truncate font-mono">Answer :</h3>
            <p className="truncate">{item.answer.substring(0, 60)}...</p>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8  w-[80vw]">
            <button className="float-right text-gray-500" onClick={closeModal}>
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4 flex justify-between items-center ">
              <p className="font-md">Full Answer</p>
              <div className="text-sm mr-4">
              <p>ID: {selectedItem.id}</p>
            <p>Score: {selectedItem.score}</p>
              </div>
          
            </h3>
            <p>{selectedItem.answer}</p>
           
          </div>
        </div>
      )}
    </div>
  );
};

const intents = ['cancel_order', 'change_order', 'change_shipping_address',
'check_cancellation_fee', 'check_invoice', 'check_payment_methods',
'check_refund_policy', 'complaint', 'contact_customer_service',
'contact_human_agent', 'create_account', 'delete_account',
'delivery_options', 'delivery_period', 'edit_account',
'get_invoice', 'get_refund', 'newsletter_subscription',
'payment_issue', 'place_order', 'recover_password',
'registration_problems', 'review', 'set_up_shipping_address',
'switch_account', 'track_order', 'track_refund']
const fetchData = async (query: string, intent: string, topK: number): Promise<void> => {
  try {
    const response: AxiosResponse<Response> = await axios.post(`${BASE_URL}/per-intent-search`, {
      params: {
        query,
        intent,
        topK,
      },
      headers:{
        "ngrok-skip-browser-warning": "true", 
      }
    });

    console.log(response.data); 
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const Knowledge = () => {
  const [query,setQuery]=useState<string>("")
  const [intent,setIntent]=useState<string>("")
  const [topK,setTopK]=useState<any>(0)
  const { data, isLoading, isError } = useQuery(['perIntentSearch'], () =>
    fetchData(query, intent, topK), 
    
  );


  return (
    <Layout>
       <div className="w-full">
         <div className=" w-full">
           <div className="w-full flex justify-around">
           <div className="">
            <p>Input Query :</p>
           <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search through the KB" className="border border-slate-200 px-3 py-2 rounded-sm w-[1/2] "  style={{
            borderRadius:"1.0rem"
           }}/>
           </div>
           <div>
            <p className="py-2 ">(Top K options)</p>
           <input type="number py-2 px-3 rounded-md border focus:outline-none" value={topK} onChange={(e)=>setTopK(e.target.value)}></input>
           </div>
           <div>
             <button className="text-md text-white font-semibold px-2 py-1 rounded-md bg-blue-500 " style={{
              borderRadius:"0.2rem"
             }}>Search</button>
           </div>
           {/* <div className="flex flex-col gap-2 max-h-[10vh]">
             <p>(Select intent)</p>
             {
              intents.map((intent,index)=>{
                return <p key={index} onClick={()=>setIntent(intent)} className="px-2 py-1 text-xs text-gray-700">{intent}</p>
              })
             }
           </div> */}
           </div>
           <div className="w-1/4">
           {/* <Slider defaultValue={[33]} max={100} step={1} /> */}
           </div>
         </div>

         <div>
             <AnswerCards data={data || []}/>
         </div>
       </div>
    </Layout>
  )
}

export default Knowledge