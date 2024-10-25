export enum Storage {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
  REFRESH_COMPLETED = "refresh_completed",
  USER = "user",
}

export enum api {
  CONVERT = "/convert",
  LOGIN = "/login",
  REGISTER = "/register",
  GOOGLE_REGISTER = "/google",
  REFRESH = "/refresh-token",
  DELETE = "/self-delete",
  GET_REMAIN_CONVERSATIONS = "/remaining-conversions",
  GET_LINKS = "/stripe-links",
  GET_SUBSCRIPTION = "/subscription-details",
  CANCEL_SUBSCRIPTION = "/cancel-subscription",
  HISTORY = "/history",
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
