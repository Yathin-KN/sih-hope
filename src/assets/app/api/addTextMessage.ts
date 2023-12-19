import axios from 'axios';
import { BASE_URL } from './api';

interface AddTextMessageParams {
  ticketId: string;
  accessToken: string;
  messageBody: string;
}

export async function addTextMessageToTicket({
  ticketId,
  accessToken,
  messageBody,
}: AddTextMessageParams): Promise<void> {
  try {
    const apiUrl = `${BASE_URL}/employee/ticket/${ticketId}/add_text_message`;
    const requestBody = {
      message_body: messageBody,
    };

    const headers = {
      "Authorization-Access": `${accessToken}`,
      'Content-Type': 'application/json',
      "ngrok-skip-browser-warning": "true",
    };

    const response = await axios.post(apiUrl, requestBody, { headers });

    console.log('Message added:', response.data);
  } catch (error) {
    console.error('Error adding message:', error);
    throw error; 
  }
}
