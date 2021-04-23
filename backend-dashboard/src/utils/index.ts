type Event = React.FormEvent<HTMLFormElement> | any;

export function stopEventBubbling(e: Event) {
  e.preventDefault();
  e.stopPropagation();
}

/** LocalStorage SettingKeys for Future Ref. */
export function setAuthTokenLs(token: string) {
  localStorage.setItem("token", `Bearer ${token}`);
}

export function getAuthTokenLs(): string {
  return localStorage.getItem("token") as string;
}

export function setIsLoggedInLs(isLoggedIn: boolean) {
  localStorage.setItem("isLoggedIn", `${isLoggedIn}`);
}

export function getIsLoggedInLs(): boolean {
  return (localStorage.getItem("isLoggedIn") as any) as boolean;
}

export function setUserIdLs(userId: string) {
  localStorage.setItem("userId", `${userId}`);
}

export function getUserIdLs(): string {
  return localStorage.getItem("userId") as string;
}

export function clearLocalStorage() {
  localStorage.clear();
}
