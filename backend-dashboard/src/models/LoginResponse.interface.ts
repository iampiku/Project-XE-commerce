export default interface LoginResponseInterface {
  token: string;
  statusCode: number;
  status: boolean;
  isLoggedIn: boolean;
  userId: string;
  error?: string | null;
}
