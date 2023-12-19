import axios, { AxiosResponse } from "axios";
import { TicketData } from "../types";
import { BASE_URL } from "./api";

export async function fetchTicketData({ticket_id,accessToken}:{ticket_id:string,accessToken:string}): Promise<TicketData> {
    try {
        const response: AxiosResponse<TicketData> = await axios.get<TicketData>(
            `${BASE_URL}/employee/ticket/${ticket_id}`
        ,{
            headers:{
                "Authorization-Access":accessToken,
                "ngrok-skip-browser-warning": "true",
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching ticket data:', error);
        throw error;
    }
}
