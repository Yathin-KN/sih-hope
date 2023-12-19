import axios, { AxiosResponse } from 'axios';

export interface TranslateRequest {
  text: string;
  targetLanguage: string;
}

export async function translateText(request: TranslateRequest): Promise<string> {
  const url = 'https://4e9c-2401-4900-1cbd-e791-7cdb-85fb-f937-f739.ngrok-free.app/translate';

  try {
    const response: AxiosResponse<{ translatedText: string }> = await axios.post(url, request,{
        headers:{
            "ngrok-skip-browser-warning": "true",
        }
    });
    const translatedText = response.data.translatedText;
    return translatedText;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}