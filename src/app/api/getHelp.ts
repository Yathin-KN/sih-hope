import axios, { AxiosResponse } from 'axios';

export async function getHelp(inputType: string, inputQuery: string, accessToken: string): Promise<any> {
  const baseURL = 'https://3a92-112-196-37-184.ngrok-free.app';
  const url = `${baseURL}/get-h?input_type=${inputType}&input_query=${encodeURIComponent(inputQuery)}`;

  const config = {
    headers: {
        "ngrok-skip-browser-warning": "true",
        "Authorization-Access": accessToken
    },
  };

  try {
    const response: AxiosResponse = await axios.get(url, config);
    return response.data;
  } catch (error:any) {
    console.error('Error fetching help:', error.message);
    throw error;
  }
}
