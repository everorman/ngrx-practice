import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { AuthActions } from "./actions-types";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.loginAction),
        tap((action) => {
          localStorage.setItem("user", JSON.stringify(action.user));
        })
      );
    },
    { dispatch: false }
  );
  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logOutAction),
        tap((action) => {
          localStorage.removeItem("user");
          this.router.navigateByUrl("/login");
        })
      );
    },
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router) {}
}
