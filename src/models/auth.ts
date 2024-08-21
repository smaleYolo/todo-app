export interface ILoginValues {
  username: string;
  password: string;
}

export interface IRegisterValues {
  username: string;
  password: string;
  name: string;
}

export interface ISuccessAuthResponse {
  token: string;
}