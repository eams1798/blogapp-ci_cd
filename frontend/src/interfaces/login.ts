export interface loginCredentials {
  username: string;
  password: string;
}

export interface signUpCredentials {
  name: string;
  username: string;
  password: string;
}

export interface loginResponse {
  username: string;
  name: string;
  id?: string;
  token: string;
}

export interface ErrorResponse {
  error: string;
}
