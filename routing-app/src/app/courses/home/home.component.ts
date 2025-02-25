import { Component } from '@angular/core';
import {CoursesService} from "../services/courses.service";
import {LoadingService} from "../../shared/Loading/loading.service";
import {Course} from "../model/course";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  beginnerCourses$: Observable<Course[]> = new Observable<Course[]>();

  advancedCourses$: Observable<Course[]> = new Observable<Course[]>();
  constructor(private coursesService : CoursesService , private  loading: LoadingService) {
  }

  reloadCourse(){
    // const courses$ = this.coursesService
  }

}
