import { Component, OnInit } from "@angular/core";
import { compareCourses, Course } from "../model/course";
import { Observable } from "rxjs";
import { defaultDialogConfig } from "../shared/default-dialog-config";
import { EditCourseDialogComponent } from "../edit-course-dialog/edit-course-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { map, shareReplay } from "rxjs/operators";
import { CoursesHttpService } from "../services/courses-http.service";
import { Store, select } from "@ngrx/store";
import {
  selectAdvancedCourses,
  selectBeginnerCourses,
  selectPromoTotal,
} from "../courses.selectors";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number>;

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private coursesHttpService: CoursesHttpService
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses));
    this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));
    this.promoTotal$ = this.store.pipe(select(selectPromoTotal));
    // const courses$ = this.coursesHttpService.findAllCourses()
    //   .pipe(
    //     map(courses => courses.sort(compareCourses)),
    //     shareReplay()
    //   );

    // this.loading$ = courses$.pipe(map(courses => !!courses));

    // this.beginnerCourses$ = courses$
    //   .pipe(
    //     map(courses => courses.filter(course => course.category == 'BEGINNER'))
    //   );

    // this.advancedCourses$ = courses$
    //   .pipe(
    //     map(courses => courses.filter(course => course.category == 'ADVANCED'))
    //   );

    // this.promoTotal$ = courses$
    //     .pipe(
    //         map(courses => courses.filter(course => course.promo).length)
    //     );
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "Create Course",
      mode: "create",
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
