import { User } from "./lista.interfaces";

export interface UserResponse {
    message: string;
    token:   string;
    user:    User;
}