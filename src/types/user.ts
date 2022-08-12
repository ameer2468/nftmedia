import { IProfileComment, IThreadProfile } from "./posts";

export interface IUserProfile {
  threads: IThreadProfile[];
  comments: IProfileComment[];
  user: {
    id: number;
    display_name: string;
    created_at: string;
    wallet: string;
    nonce?: number;
    token?: string;
    postCount?: number;
    followerCount?: number;
  };
}

export type IUser = IUserProfile["user"];
export type IProfileComments = IUserProfile["comments"];
export type IProfileThreads = IUserProfile["threads"];
