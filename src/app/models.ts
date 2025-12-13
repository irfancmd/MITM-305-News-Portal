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
  id: string;
  title: string;
  body: string;
  author_id: number;
  comments: Comment[];
}

export interface PaginatedNews {
  data: News[];
  pages?: number;
}