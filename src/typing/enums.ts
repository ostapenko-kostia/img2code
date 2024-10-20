export enum Storage {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
  REFRESH_COMPLETED = "refresh_completed",
  USER = "user",
}

export enum api {
  CONVERT = "/convert",
  LOGIN = '/api/auth/authenticate',
  REGISTER = '/api/auth/register',
  REFRESH = '/api/auth/refreshtoken',
  GET_REMAIN_CONVERSATIONS='/getRemainingConversions',
  GET_LINKS = '/getStripeLinks',
}
