export type Status = 'active' | 'inactive' | 'pending';

export type BaseEntity = {
  id: string | number;
  createdAt: string;
  updatedAt: string;
};

export type User = BaseEntity & {
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'moderator';
};

export type ApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
  total?: number;
  page?: number;
  limit?: number;
};

export type PaginationParams = {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};
