export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthUser {
  username: string;
  email: string;
}

export interface ApiErrorResponse {
  errors: string[];
}