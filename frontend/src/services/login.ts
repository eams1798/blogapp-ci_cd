import axios from "axios";
import { loginCredentials, loginResponse } from "../interfaces/login";
const baseUrl = "/api/login";

const login = async (credentials: loginCredentials): Promise<loginResponse> => {
  const { data }: { data: loginResponse } = await axios.post(
    baseUrl,
    credentials,
  );
  return data;
};

export default { login };
