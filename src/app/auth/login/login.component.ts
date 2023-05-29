import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";

import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { loginAction } from "../auth.actions";
import { AuthService } from "../auth.service";
import { User } from "../model/user.model";
import { AuthState } from "../reducers";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AuthState>
  ) {
    this.form = fb.group({
      email: ["test@angular-university.io", [Validators.required]],
      password: ["test", [Validators.required]],
    });
  }

  ngOnInit() {}

  login() {
    const formValue = this.form.value;
    this.auth
      .login(formValue.email, formValue.password)
      .pipe(
        tap((user: User) => {
          console.log(user);
          this.store.dispatch(loginAction({ user }));

          this.router.navigateByUrl("/courses");
        })
      )
      .subscribe();
  }
}
