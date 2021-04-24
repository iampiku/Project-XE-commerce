export default interface SignupResponseInterface {
  token: string;
  statusCode: number;
  status: boolean;
  userId: string;
  isLoggedIn: boolean;
  message?: string | null;
  error?: string | null;
}
