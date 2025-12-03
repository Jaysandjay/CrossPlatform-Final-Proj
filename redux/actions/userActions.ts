import type { User } from "@/types/User";
import { LOGIN_USER, LOGOUT_USER, UPDATE_USER } from "../actionTypes/userTypes";



export const loginUser = (user: User) => ({
	type: LOGIN_USER,
	payload: {user}
});

export const logoutUser = () => ({
	type: LOGOUT_USER,
});

export const updateUser = (user: User) => ({
	type: UPDATE_USER,
	payload: {user},
});

