import { createAction, props } from "@ngrx/store";
import { Course } from "./model/course";
import { Update } from "@ngrx/entity";

export const loadAllCourses = createAction(
  "[Courses resolver] Load all courses"
);

export const allCoursesLoaded = createAction(
  "[Load courses effect] All courses loaded",
  props<{ courses: Course[] }>()
);
export const courseUpdated = createAction(
  "[Edit course dialog] Course updated",
  props<{ update: Update<Course> }>()
);
