import axios, { AxiosResponse } from 'axios';

export async function getHelp(inputType: string, inputQuery: string, accessToken: string): Promise<any> {
  const baseURL = 'https://42e5-104-198-247-123.ngrok-free.app';
  const url = `${baseURL}/get-help?input_type=${inputType}&input_query=${encodeURIComponent(inputQuery)}`;

  const config = {
    headers: {
        "ngrok-skip-browser-warning": "true",
        "Authorization-Access": accessToken
    },
  };

  try {
    const response: AxiosResponse = await axios.post(url, config);
    return response.data;
  } catch (error:any) {
    console.error('Error fetching help:', error.message);
    throw error;
  }
}
