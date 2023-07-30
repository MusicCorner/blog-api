export interface GetPostRaw {
  post_id: string;
  post_createdAt: string;
  post_updatedAt: string;
  post_title: string;
  post_content: string;
  post_likes: number;
  post_dislikes: number;
  post_userId: string;
  postUser_id: string;
  postUser_createdAt: string;
  postUser_updatedAt: string;
  postUser_firstName: string;
  postUser_lastName: string;
  postUser_email: string;
  comment_content: string;
  postId: string;
  comment_id: string;
  userId: string;
  comment_user_firstName: string;
  comment_user_lastName: string;
  comment_user_id: string;
  comment_user_email: string;
  comment_user_createdAt: string;
}

export interface GetPostFormatted {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  dislikes: number;
  user: User;
  comments: Comment[];
}

export interface User {
  firstName: string;
  lastName: string;
  id: string;
  email: string;
  createdAt: string;
}

export interface Comment {
  content: string;
  id: string;
  user: User;
}
