export interface IChat {
    id: number;
    created_at: string;
    users: string[];
}

export interface IChatMessage {
    id: number;
    chat_id: number;
    message: string;
    user: string;
    avatar_image_url: string | null;
    created_at: Date;
}