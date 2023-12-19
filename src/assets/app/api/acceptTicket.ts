import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from './api';

export async function acceptTicket(ticketId: string, accessToken: string): Promise<number | undefined> {
  const url = `${BASE_URL}/employee/ticket/${ticketId}/accept`;
  const config = {
    headers: {
        "Authorization-Access": accessToken,
        'Content-Type': 'application/json',
       "ngrok-skip-browser-warning": "true",
    },
  };
  try {
    const response: AxiosResponse = await axios.post(url, {}, config);
    console.log(`Ticket ${ticketId} accepted successfully.`);
    return response.status;
  } catch (error:any) {
    console.error('Error accepting ticket:', error.message);
  }
}