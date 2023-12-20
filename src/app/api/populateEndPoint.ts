import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from './api';

interface PostData {
  title: string;
  details: string;
}

export async function populateEndpoint(data: PostData): Promise<void> {
  const url = `${BASE_URL}/populate`; 

  try {
    const response: AxiosResponse = await axios.post(url, data);

    if (response.status === 200) {
      console.log('Data posted successfully:', response.data);
    } else {
      console.error('Failed to post data:', response.statusText);
    }
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
}
