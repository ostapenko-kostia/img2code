export interface IAIResponse {
  language: string;
  output: string;
  commentsOn: boolean;
}

export interface IAuthResponse {
  access_token: string;
  refresh_token: string;
  user_details: IUser;
}

export interface IUser {
  id: string;
  email: string;
  credits: number;
  role: string;
  tier: string;
}
