import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from './api';

interface Tokens {
  accessToken: string | null;
  refreshToken: string | null;
}

export async function loginToEmployeeAPI(email: string, password: string): Promise<Tokens> {
  const url = `${BASE_URL}/employee/auth`;

  try {
    const response: AxiosResponse = await axios.post(url, {
      email,
      password
    });

  
      console.log(response.headers)
      const accessToken = response.headers['authorization-access'];
      const refreshToken = response.headers['authorization-refresh'];

      return { accessToken, refreshToken };
    
  } catch (error:any) {
    console.error('Error logging in:', error.message);
    return { accessToken: null, refreshToken: null };
  }
}