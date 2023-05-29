import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

/**
 * Esto es una buena practica, pues permite a typescript conocer el tipo del state con
 * el que se esta trabajando. createFeatureSelector recibe el nombre de la propiedad del state
 * y recibe el tipo del state que en nuestro caso el tipo es AuthState y la propiedad es user
 */
export const selectAuthState = createFeatureSelector<AuthState>("auth");

export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => !!auth.user
);

export const isLoggedOut = createSelector(
  selectAuthState,
  (auth) => !auth.user
);
