import axios from 'axios';
import { BASE_URL } from './api';
export async function closeTicket(ticketId: string, resolutionComment: string , accessToken:string): Promise<void> {
  const url = `${BASE_URL}/employee/ticket/${ticketId}/close`;
  try {
    const response = await axios.post(url, {
      resolution_comment: resolutionComment,
    },{
        headers:{
            "Authorization-Access":accessToken
        }
    });
    console.log('Ticket closed successfully:', response.data);
  } catch (error) {
    console.error('Error closing ticket:', error);
  }
}