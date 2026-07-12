export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type User = {
  id: number;
  email: string;
  username: string;
  createdAt?: string;
};

export type AuthPayload = {
  user: User;
  token: string;
};
