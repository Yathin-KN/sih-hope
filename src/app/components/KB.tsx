import {  useState } from "react";
export function AddToKB() {

    const [intent,setIntent]=useState("")
    const [text,setText]=useState("")
  return (
    <div>
      <div className="max-w-fit bg-blue-100 p-4 rounded-md m-3 w-1/2">
        <div className="my-2">
          <p className="text-sm font-semibold text-gray-700">Query :</p>
          <p>Who is yathin ?</p>
        </div>
        <div className="my-2">
          <p className="text-sm font-semibold text-gray-700">Custom answer :</p>
          <textarea className="bg-white rounded-sm p-2" onChange={(e)=>setText(e.target.value)} value={text}>
            {text}
          </textarea>
        </div>
        <div>
          <button className="px-2 py-1 rounded-md bg-blue-500 my-2 tex-white text-sm font-semibold text-white">
            Add to RAG
          </button>
        </div>
      </div>
    </div>
  );
}


