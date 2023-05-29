import { Component, OnInit } from "@angular/core";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "./reducers";
import { isLoggedIn, isLoggedOut } from "./auth/auth.selectors";
import { AuthActions } from "./auth/actions-types";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loading = true;
  isUserLoggedIn$: Observable<boolean>;
  isUserLoggedOut$: Observable<boolean>;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    /*
      This implementation 
      this.isUserLoggedIn$ = this.store.pipe(map((state) => !!state["auth"].user));
      is going to send multiple times the same value, we could use the rxjs operator distinctUntilChanged()
      but ngrx provide us the operator select() that do the same but replace the map() operator. 
    */
    this.isUserLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.isUserLoggedOut$ = this.store.pipe(select(isLoggedOut));
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  logout() {
    this.store.dispatch(AuthActions.logOutAction());
  }
}
