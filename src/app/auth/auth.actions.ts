import { createAction, props } from "@ngrx/store";
import { User } from "./model/user.model";

//Se definen las acciones de cada modulo, por conveccion se sigue la siguiente estructura
// [Nombre de la vista] descripcion, Este estring debe ser unico
// login is a fuction
export const loginAction = createAction(
  "[Login page] User login",
  props<{ user: User }>()
);

export const logOutAction = createAction("[Top menu] Logout");
