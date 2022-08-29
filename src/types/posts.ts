import { Dispatch } from "react";

export interface IProfileComment {
  thread_title: string;
  thread_id: number;
  id: number;
}

export interface IThreadProfile {
  id: number;
  created_at: string;
  post: string;
  title: string;
  view_count: number;
  comment_count: number;
  vote_count: number;
  user: string;
}

export interface IPost {
  created_at: string;
  id: number;
  post: string;
  title: string;
  user_id: string;
  view_count: number;
  avatar_image_url: string;
  vote_count: number;
  comment_count: number;
  display_name: string;
}

export interface IPostComment {
  id: number;
  created_at: string;
  thread_id: number;
  thread_title: string;
  display_name: string;
  user_id: number;
  avatar_image_url: string | null;
  comment: string;
}

export interface IUpvotePost {
  post: IThread;
  setPost: Dispatch<IThread>;
  dir: "up" | "down";
  didUserVote: IThread["thread"]["didUserVote"];
}

export interface IVote {
  id: number;
  created_at: string;
  thread_id: number;
  user_id: number;
  dir: number;
}

export interface INewComment {
  input: string;
  thread_id: number;
  thread_title: string;
  display_name: string;
  user_id: number;
  post: IThread | null;
  setPost: Dispatch<IThread>;
}

export interface IThread {
  comments: IPostComment[];
  thread: {
    post: string;
    title: string;
    view_count: number;
    comment_count: number;
    vote_count: number;
    avatar_image_url: string | null;
    didUserVote: {
      dir: number;
      id: number;
    };
    user_id: number;
    id: number;
    created_at: string;
    display_name: string;
  };
}
