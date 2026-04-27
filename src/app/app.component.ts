import { Component, OnInit } from '@angular/core';

declare var pendo: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CourseHive';

  ngOnInit() {
    pendo.initialize({
      visitor: {
        id: ''
      }
    });
  }
}
