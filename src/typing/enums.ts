export enum Storage {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
  REFRESH_COMPLETED = "refresh_completed",
  USER = "user",
}

export enum api {
  CONVERT = "/convert",
  LOGIN = "/api/auth/authenticate",
  REGISTER = "/api/auth/register",
  GOOGLE_REGISTER = "/api/auth/google",
  REFRESH = "/api/auth/refreshtoken",
  DELETE = "/api/auth/delete",
  GET_REMAIN_CONVERSATIONS = "/getRemainingConversions",
  GET_LINKS = "/getStripeLinks",
  GET_SUBSCRIPTION = "/getSubscriptionInfo",
  CANCEL_SUBSCRIPTION = "/cancelSubscription",
}

export enum ROLE {
  USER = "ROLE_USER",
  ADMIN = "ROLE_ADMIN",
}

export enum TIER {
  FREE = "FREE",
  PREMIUM = "PREMIUM",
  PRO = "PRO",
}
