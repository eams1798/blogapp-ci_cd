import axios from "axios";
import { IUser } from "../interfaces/user";
const baseUrl = "/api/users";

const getAll = async (): Promise<IUser[]> => {
  try {
    const response = await axios.get<IUser[]>(baseUrl);
    return response.data.reverse();
  } catch {
    console.error;
    return [];
  }
};

const get = async (userId: string): Promise<IUser | null> => {
  try {
    const response = await axios.get<IUser>(`${baseUrl}/${userId}`);
    return response.data;
  } catch {
    console.error;
    return null;
  }
};

export default { getAll, get };
