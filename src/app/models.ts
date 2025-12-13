export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Comment {
  id: number;
  text: string;
  user_id: number;
  timestamp: string;
}

export interface News {
  id: number;
  title: string;
  body: string;
  author_id: number;
  comments: Comment[];
}