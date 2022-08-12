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
