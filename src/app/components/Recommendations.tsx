"use client";
import { atom, useAtom } from "jotai";
import { Edit, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { textInputField } from "../(pages)/dashboard/page";
import { useQuery } from "react-query";
import { recommendationText } from "./(conversations_components)/coversation";
import { getHelp } from "../api/getHelp";
import useUserStore from "../store/userStore";
import clsx from "clsx";
import { postEmployeeRanking } from "../api/ranking";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const apiData = atom("String");

type Data = {
  [key: string]: {
    recommendations: Recommendation[];
  };
};

type Recommendation = {
  id: number;
  text: string;
  score: number;
};

interface Output {
  dt_response: string;
  score: number;
  llm_response: string;
}


export const wasItARecommendedAnswer=atom<boolean>(false)
interface QueryResponse {
  input_query: string;
  intent: string;
  outputs: Output[];
}


export const queryResponseAtom=atom<QueryResponse | null>({
  input_query: "Sample query",
  intent: "Sample intent",
  outputs: [
    {
      dt_response: "Yes",
      score: 0.8,
      llm_response: "Sample response for 'Yes'",
    },
    {
      dt_response: "No",
      score: 0.3,
      llm_response: "Sample response for 'No'",
    },
    {
      dt_response: "Maybe",
      score: 0.5,
      llm_response: "Sample response for 'Maybe'",
    },
  ],
})

const SatisfiedPopup=({query,response,index}:{query:string,response:any,index:number})=>{
   
   const [likeState,setLikeState]=useState(false)
   const accessToken=useUserStore.getState().accessToken;
   const handleClick=()=>{
     setLikeState((prev)=>!prev)
   }

   const handleApiCall=async()=>{
       const payload={
        "input_query":query,
        "correct_ans_idx":index,
        "outputs":response
       }
       try {
        const result = await postEmployeeRanking(payload,accessToken || "");
        console.log('API call successful! Payload:', payload);
        console.log('API Response:', result);
        toast.success("Response recorded!!")
      } catch (error) {
        console.error('API call failed:', error);
        toast.error("Error !!")
      }
   }

   useEffect(()=>{
      if(likeState){
        handleApiCall()
      }
   },[likeState])

   return (
    <div onClick={()=>handleClick()}>
      <ThumbsUp className={clsx({
        "text-yellow-500 fill-yellow-500":likeState,
        "text-gray-400":!likeState,
      })} size={20}/>
    </div>
   )
}
export default function Recommendations() {
  const [reccomendationText, setRecommendationText] =
    useAtom(recommendationText);
  const accessToken = useUserStore.getState().accessToken;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [queryresponse, setQueryResponse] = useAtom(queryResponseAtom)

  const [_, setValue] = useAtom(textInputField);

  const callGetHelp = async (
    inputType: string,
    inputQuery: string,
    accessToken: string
  ): Promise<any> => {
    try {
      setIsLoading(true);
      if(inputQuery==="") return;
      const response: QueryResponse = await getHelp(
        inputType,
        inputQuery,
        accessToken
      );
      setQueryResponse(response);
    } catch (error: any) {
      console.error("Error calling getHelp function:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    callGetHelp("text", reccomendationText, accessToken || "");
  }, [reccomendationText]);

  return (
    <>
      <div className="w-full container">
        <ToastContainer/>
        <h1 className="text-md  font-semibold">Recommendations</h1>
        {
          <div className="py-4 text-sm flex flex-col pl-1">
            <div className="">
              <div className="text-slate-500 h-full ">Text :</div>
              <div className="flex h-auto break-words  text-black">
                {reccomendationText}
              </div>
            </div>
            <div className="py-2">
              <div className="text-slate-500 h-full ">
                <span>Reccomendations :</span>
              </div>
              <div className=" rounded-md overflow-y-scroll h-[50vh]">
                {/* {data[messages.id].recommendations.map(
                  (recommendation, index) => {
                    return (
                      <>
                        <div className="bg-gray-100 p-3 my-2 rounded-md">
                          <div className="flex justify-between items-center">
                            <div className="w-5 h-5 text-center text-xs bg-gray-200 aspect-square rounded-full flex justify-center items-center">
                              <span className="font-semibold text-gray-600">
                                {recommendation.id}
                              </span>
                            </div>
                            <div className="flex justify-center items-center">
                              <h3 className="text-xs">Score :</h3>
                              <span className="text-sm">
                                {recommendation.score}
                              </span>
                            </div>
                          </div>
                          <div className="py-2">{recommendation.text}</div>
                          <div className="flex justify-between">
                            <button className="bg-gray-500 text-white py-1 px-3 text-xs rounded-md font-semibold" onClick={()=>setValue(recommendation.text)}>Accept</button>
                            <button className="bg-slate-50 border text-gray-700 hidden py-1 px-3 text-xs rounded-md  justify-center items-center gap-2 "><Edit size={16} className=""/><>Edit</></button>
                          </div>
                        </div>
                      </>
                    );
                  }
                )} */}
                {queryresponse && !isLoading ? (
                  <div>
                    <div>{queryresponse.intent}</div>
                    <div>
                      {queryresponse.outputs.map((output, index) => {
                        return (
                          <div className="bg-gray-100 p-3 my-2 rounded-md">
                            <div className="flex justify-between items-center">
                              <div className="w-5 h-5 text-center text-xs bg-gray-200 aspect-square rounded-full flex justify-center items-center">
                                <span className="font-semibold text-gray-600">
                                  {index}
                                </span>
                              </div>
                              <div className="flex justify-center items-center">
                                <h3 className="text-xs">Score :</h3>
                                {/* <span className="text-sm px-[3px] py-[1.2px] aspect-square rounded-full bg-green-500 flex justify-center items-center">
                                  <span className="text-white text-xs font-semibold">{output.score}</span>
                                </span> */}
                              </div>
                            </div>
                            <div className="py-2">{output.llm_response}</div>

                            <div className="flex justify-between">
                              <button
                                className="bg-gray-500 text-white py-1 px-3 text-xs rounded-md font-semibold"
                                onClick={() => setValue(output.llm_response)}
                              >
                                Accept
                              </button>
                             <SatisfiedPopup query={reccomendationText} response={queryresponse.outputs} index={index}/>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className={clsx("bg-gray-100 p-3 my-2 rounded-md animate-pulse ")}>
                    <div className="flex justify-between items-center">
                      <div className="w-7 h-7 text-center text-xs bg-gray-200 aspect-square rounded-full flex justify-center items-center"></div>
                      <div className="flex justify-center items-center">
                        <span className="text-sm ml-2 bg-gray-200 rounded-md h-6 w-10"></span>
                      </div>
                    </div>
                    <div className="py-2 bg-gray-200 rounded-md h-4 my-2"></div>
                    <div className="py-2 bg-gray-200 rounded-md h-4 w-11/12 my-2"></div>
                    <div className="py-2 bg-gray-200 rounded-md h-4 my-2"></div>
                    <div className="flex justify-between">
                      <button className="bg-gray-500 h-6 text-white py-1 px-3 text-xs rounded-md w-16"></button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        }
        {/* <div className="w-full">
            <div className="text-md text-gray-800 font-semibold">Summary :</div>
            <div className="w-full text-sm h-full  bg-slate-100 min-h-[30vh] rounded-md p-4 flex flex-col justify justify-between">
                <p>  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea necessitatibus aspernatur quos cumque facere ratione error, provident culpa accusantium minus blanditiis saepe quo tenetur qui exercitationem. Numquam quas illo amet a quia?</p>
                <div className="w-full">
                <button className=" py-2 px-3 text-slate-50 bg-blue-500 rounded-md">Load Audio</button>
                </div>
            </div>
        </div> */}
      </div>
    </>
  );
}
