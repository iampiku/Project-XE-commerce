import Cookies from "js-cookie";
import React from "react";

type Event = React.FormEvent<HTMLFormElement> | any;

export function stopEventBubbling(e: Event) {
  e.preventDefault();
  e.stopPropagation();
}

/** LocalStorage SettingKeys for Future Ref. */
export function setAuthTokenCookie(token: string) {
  Cookies.set("token", `Bearer ${token}`);
}

export function getAuthTokenCookie(): string {
  return Cookies.get("token") as string;
}

export function setIsLoggedInCookie(isLoggedIn: boolean) {
  Cookies.set("isLoggedIn", `${isLoggedIn}`);
}

export function getIsLoggedInCookie(): boolean {
  return (Cookies.get("isLoggedIn") as any) as boolean;
}

export function setUserIdCookie(userId: string) {
  Cookies.set("userId", `${userId}`);
}

export function getUserIdCookie(): string {
  return Cookies.get("userId") as string;
}

export function setAuthStateOfCurrentUser(payload: any) {
  if (payload.message) {
    delete payload.message;
  }
  Cookies.set("currentUser", JSON.stringify(payload));
}

export function getAuthStateOfCuurentUser() {
  return JSON.parse(Cookies.get("currentUser") as any);
}

export function clearAllCookieStorage() {
  localStorage.clear();
  Cookies.remove("token");
  Cookies.remove("isLoggedIn");
  Cookies.remove("userId");
  Cookies.remove("currentUser");
}

// AppState Contexts + Reducers

export interface AppStateInterface {
  state: any;
  dispatch: React.Dispatch<any>;
}

export const appStateInitial = {
  categories: [],
  products: [],
  currentCategory: null,
  dispatch: (action: any) => {},
};

export const AppStateContext = React.createContext(appStateInitial);
