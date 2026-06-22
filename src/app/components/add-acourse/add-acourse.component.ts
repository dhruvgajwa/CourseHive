import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/Models/Course';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

declare var pendo: any;

@Component({
  selector: 'app-add-acourse',
  templateUrl: './add-acourse.component.html',
  styleUrls: ['./add-acourse.component.css']
})
export class AddACourseComponent implements OnInit {
  course: Course = new Course();
  constructor(private firebaseService: FirebaseService,
              private router: Router) {

               }

  ngOnInit() {
    
  }

  Submit() {
    if (this.course.id.length !== 6 ) {
      alert('Course Number Should be of 6 length');
      return;
    }
    this.course.id = this.makeCourseIdSuitable(this.course.id);

    if (this.course.instructerName === '') {
      alert(' put a valid instructers name');
      return;
    }

    if (this.course.name === '') {
      alert(' put a valid course name');
      return;
    }

    this.firebaseService.AddACourse(this.course).then( _ => {
      pendo.track('course_added', {
        courseId: this.course.id,
        courseName: this.course.name,
        instructorName: this.course.instructerName,
        credits: this.course.credits,
        slot: this.course.slot
      });
      this.router.navigate(['course/' + this.course.id]);
    });
  }

  makeCourseIdSuitable(CourseId: string): string {
    let s1 = CourseId.slice(0, 2).toUpperCase();
    let s2 = CourseId.slice(2, 6);
    return s1 + s2;
  }

}
