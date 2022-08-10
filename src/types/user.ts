export interface IUser {
  id: number;
  display_name: string;
  created_at: string;
  wallet: string;
  nonce: number;
  token: string;
  postCount?: number;
  followCount?: number;
}
