import { BASE_URL } from "./api";

interface Output {
    dt_response: string;
    llm_response: string;
    score?: number;
  }
  
  interface PostBody {
    input_query: string;
    correct_ans_idx: number;
    outputs: Output[];
  }
  
 export  const postEmployeeRanking = async (payload: PostBody, accessToken:string): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/employee/ranking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization-Access":accessToken,
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await response.json();
      console.log('API response:', data);
      // Handle the API response data here as needed
    } catch (error) {
      console.error('Error occurred while fetching:', error);
      throw error;
    }
  };