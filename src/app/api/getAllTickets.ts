import { AllTickets } from '../types';
import axios from 'axios';
import { BASE_URL } from './api';

export async function fetchInitialConversations({ status , accessToken }: { status: string , accessToken:string }): Promise<AllTickets[]> {
  try {
    const response = await axios.get(`${BASE_URL}/employee/ticket/`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Authorization-Access": accessToken
      },
      params: {
        "status": status
      }
    });

    const initialConversations: AllTickets[] = response.data.tickets;

    console.log('API call successful:', initialConversations);
    return initialConversations;
  } catch (error) {
    console.error('Error fetching initial data:', error);
    return [];
  }
}
