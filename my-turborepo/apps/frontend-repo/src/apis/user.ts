export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
    updateStatus: {
        loading: boolean;
        success: boolean;
        error: string | null;
    };
}

export interface UserResponse {
    message: string;
    token: string;
    data: User[];
    error: string
}

export interface UpdateUserPayload {
    userId: string;
    userData: Partial<User>;
}

export interface UpdateUserResponse {
    success: boolean;
    data: User;
    message: string;
}

export interface UpdateUserData {
  email?: string;
  name?: string;
  password?: string;
}