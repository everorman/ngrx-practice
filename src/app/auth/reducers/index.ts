import { ActionReducerMap, MetaReducer, createReducer, on } from "@ngrx/store";
import { User } from "../model/user.model";
import { AuthActions } from "../actions-types";

export const authFeatureKey = "auth";

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: undefined,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginAction, (state, action) => {
    return {
      user: action.user,
    };
  }),
  on(AuthActions.logOutAction, (state, action) => {
    return {
      user: undefined,
    };
  })
);
