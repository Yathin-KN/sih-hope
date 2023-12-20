import { useEffect, useState } from "react";

export default function Transcript(){

    const [transcriptStream,setTranscriptStream]=useState("")

    useEffect(() => {
        const socket = new WebSocket('wss://d1f9-2401-4900-1cbd-e791-7cdb-85fb-f937-f739.ngrok-free.app');
    
        socket.onopen = () => {
          console.log('WebSocket connection established');
        };
    
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message && message.inputName === 'transcript') {
              const transcriptValue = message.inputValue;
              console.log('Transcript:', transcriptValue);

              setTranscriptStream(transcriptValue)
            }
        };
    
        socket.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
    
        socket.onclose = () => {
          console.log('WebSocket connection closed');
        };
    
        // return () => {
        //   if (socket.readyState === WebSocket.OPEN) {
        //     socket.close();
        //   }
        // };
      }, []);
    return <div>
        hello 
        {transcriptStream}
    </div>
}