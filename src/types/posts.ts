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

export interface IPostComment {
  id: number;
  created_at: string;
  thread_id: number;
  comment_id: number;
  thread_title: string;
  display_name: string;
  user_id: number;
  comment: string;
}

export interface IThread {
  id: number;
  created_at: string;
  display_name: string;
  comments?: IPostComment[];
  post: string;
  title: string;
  view_count: number;
  comment_count: number;
  vote_count: number;
  user_id: string;
}
