import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from './api';

interface EmployeeDetails {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  department: string;
  password: string;
}

export const registerEmployee = async (details: EmployeeDetails): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.post(`${BASE_URL}/organization/register_employee`, details);
    return response;
  } catch (error:any) {
    throw new Error(error);
  }
};
