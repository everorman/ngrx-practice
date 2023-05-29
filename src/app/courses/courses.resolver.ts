import { Injectable, inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, first, tap } from "rxjs/operators";
import { loadAllCourses } from "./course.actions";
import { areAllCoursesLoader } from "./courses.selectors";

@Injectable()
export class CoursesResolver implements Resolve<any> {
  private readonly store$ = inject(Store);
  loading = false;
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store$.pipe(
      select(areAllCoursesLoader),
      tap((coursesLoaded) => {
        if (!this.loading && !coursesLoaded) {
          this.loading = true;
          this.store$.dispatch(loadAllCourses());
        }
      }),
      filter((coursesLoaded) => coursesLoaded),
      first()
    );
  }
}
