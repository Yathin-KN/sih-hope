import axios, { AxiosResponse } from 'axios';
import { AssignmentRequest } from '../types';
import useUserStore from '../store/userStore';
import { BASE_URL } from './api';


export async function sendAssignmentRequest({requestData,ticket_id, accessToken}:{requestData: AssignmentRequest,ticket_id:string, accessToken:string}): Promise<void> {
    try {
      const response: AxiosResponse = await axios.post<AssignmentRequest>(
        `${BASE_URL}/employee/ticket/${ticket_id}/assign`,
        requestData,
        {
            headers:{
                "Authorization-Access":accessToken
            }
        }
      );
  
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
}