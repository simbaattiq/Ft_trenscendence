export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
  createdAt?: Date;
  updatedAt?: Date;
  profile?: Profile;
}

export interface Profile {
  id: string;
  userId: string;
  displayName: string;
  avatarUrl: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
}
