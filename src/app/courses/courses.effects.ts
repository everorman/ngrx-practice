import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CoursesHttpService } from "./services/courses-http.service";
import { CoursesActions } from "./action-types";
import { concatMap, map } from "rxjs/operators";
import { allCoursesLoaded } from "./course.actions";

@Injectable()
export class CoursesEffects {
  private readonly actions$ = inject(Actions);
  private readonly coursesHttpService = inject(CoursesHttpService);

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.loadAllCourses),
      concatMap((action) => this.coursesHttpService.findAllCourses()),
      map((courses) => allCoursesLoaded({ courses }))
    )
  );
  updateCourse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CoursesActions.courseUpdated),
        concatMap((action) =>
          this.coursesHttpService.saveCourse(
            action.update.id,
            action.update.changes
          )
        )
      ),
    /**
     * Esto es para cuando se desea que no se dispare una accion
     * en el caso anterior, se requiere disparar la accion allCoursesLoaded
     * En este caso, no es necesario pues ya la data en el store ha sido actualizada.
     * Solo se esta actualizando en el banckend
     */
    { dispatch: false }
  );
}
