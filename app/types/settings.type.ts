export type PostResponse = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};
export type PostsResponse = Array<PostResponse>;
