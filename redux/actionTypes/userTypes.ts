import type { User } from "@/types/User";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const UPDATE_USER = "UPDATE_USER";

export interface LoginUserAction {
    type: typeof LOGIN_USER
    payload: {user: User}
}

export interface LogoutUserAction {
    type: typeof LOGOUT_USER
}

export interface UpdateUserAction {
    type: typeof UPDATE_USER
    payload: {user: User}
}



export type UserActionTypes = LoginUserAction | LogoutUserAction | UpdateUserAction