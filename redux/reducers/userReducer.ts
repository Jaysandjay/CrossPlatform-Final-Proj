import type { User } from "@/types/User";
import {
    LOGIN_USER,
    LOGOUT_USER,
    UPDATE_USER,
    UserActionTypes,
} from "../actionTypes/userTypes";

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export default function userReducer(state: UserState = initialState,action: UserActionTypes): UserState {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload.user,   
      };

    case LOGOUT_USER:
      return {
        ...state,
        user: null,
      };

    case UPDATE_USER:
      return {
        ...state,
        user: action.payload.user,   
      };

    default:
      return state;
  }
}
