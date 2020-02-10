import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { Profile, MyPinnedCourses, StudentsInPinnedCourse, MySkills } from 'src/app/Models/Profile';
import { Content, Review, Course } from 'src/app/Models/Course';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  profile: Profile = new Profile();
  myFId: string = '';
  karmaPoints: number = 0;
  reviews: number = 0;
  uploads: number = 0;
  constructor(private authService: AuthService,
              private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.myFId =  this.authService.getMyFId();
    this.firebaseService.getMyProfileData(this.myFId).subscribe( (_doc) => {

        this.profile = _doc;
        
        let pinnedCourse = new MyPinnedCourses();
        pinnedCourse.name = 'Signal And System';
        pinnedCourse.id = 'EE11040';
        pinnedCourse.pinnedAtDate = new Date().toUTCString();
        this.profile.myPinnedCourses = [ pinnedCourse, pinnedCourse, pinnedCourse, pinnedCourse, pinnedCourse, 
          pinnedCourse, pinnedCourse, pinnedCourse, pinnedCourse, pinnedCourse]



        let mySkill = new MySkills();  
        mySkill.name = 'Angular';
        mySkill.id = 'SomeID';
        mySkill.description = ' I am noob in angular, and I am typing this piece of shit so that I can ' +
          ' make this description look bigger! ';
        mySkill.expertiseLevel = ' Intermediate';
        mySkill.addedOnDate = new Date().getTime();


        this.profile.mySkills = [ mySkill, mySkill, mySkill, mySkill, mySkill, mySkill]
        if (_doc !== undefined) {
          this.firebaseService.getUploadsById(this.myFId).subscribe( (data: Content[]) => {
            if (data === undefined) {
              this.profile.myUploads = [];
            } else {

              this.profile.myUploads = data;
              this.calculate();
            }
          });
          this.firebaseService.getReviewsById(this.myFId).subscribe( (data: Review[]) => {
            if (data === undefined) {
              this.profile.myReviews = [];
            } else {

            this.profile.myReviews = data;
            this.calculate();
            }
          });
        }
      } );
  }
  isMyUploadsDefined() {
    if (this.profile.myUploads !== undefined) {
      if ( this.profile.myUploads.length > 0 ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isMyReviewsDefined() {
    if (this.profile.myReviews !== undefined) {
      if ( this.profile.myReviews.length > 0 ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getDate(n: number) {
    let s: string = new Date(n).toDateString();
    return s;
  }

  DeleteReview(review: Review) {
    this.firebaseService.deleteReview( review, this.myFId).then( _ => {
      this.profile.myReviews.splice(this.profile.myReviews.indexOf(review), 1);
    });
  }

  DeleteContent(content: Content) {
    this.firebaseService.deleteContent( content, this.myFId).then( _ => {
      this.profile.myUploads.splice(this.profile.myUploads.indexOf(content), 1);
    });
  }


  calculate() {
    this.uploads = this.profile.myUploads.length;
    this.reviews = this.profile.myReviews.length;

    this.profile.myUploads.forEach((element: Content) => {
      this.karmaPoints = (element.upVotedBy.length * 5) + this.karmaPoints;
      this.karmaPoints =   this.karmaPoints - (element.downVotedBy.length * 5);

    });

    this.profile.myReviews.forEach((element: Review) => {
      this.karmaPoints = (element.upVotedBy.length * 5) + this.karmaPoints;
      this.karmaPoints =   this.karmaPoints - (element.downVotedBy.length * 5);

    });
  }
    // For Reviews
    IUpvoted(upvotedBy: string[]) {
      if (upvotedBy.includes(this.myFId)) {
        return true;
      } else {
        return false;
      }
    }
    IDownVoted(downVotedBy: string[]) {
      if (downVotedBy.includes(this.myFId)) {
        return true;
      } else {
        return false;
      }
    }
    // For Course Content
    IUpvotedContent(upvotedBy: string[]) {
      if (upvotedBy.includes(this.myFId)) {
        return true;
      } else {
        return false;
      }
    }
    IDownVotedContent(downVotedBy: string[]) {
      if (downVotedBy.includes(this.myFId)) {
        return true;
      } else {
        return false;
      }
    }

    DownloadClicked(link: string) {
      window.open(link, '_blank');
    }

    myPinnedCoursesEditClicked(){
      console.log('clicked');
      document.getElementById('myPinnedCoursesSearch').style.display = 'block';
      document.getElementById('myPinnedCoursesSave').style.display ='inline-block';
      document.getElementById('myPinnedCoursesEdit').style.display = 'none';
    }



    addCourseToMyPinnedCourses(course: Course) {
      console.log(course);
      let pc = new MyPinnedCourses();
      pc.id = course.id;
      pc.name = course.name;
      let flag = true;

        // Check if already contain this course
      this.profile.myPinnedCourses.forEach((element: MyPinnedCourses )=> {
      if(pc.id === element.id){
          flag = false;
        }        
      });
    
      if(flag) {
        pc.pinnedAtDate = new Date().toUTCString();
        // Send this pinned course querry to backend
        // Also add the student in pinned course wala part
  
        let studentInPinnedCourse = new StudentsInPinnedCourse();
        studentInPinnedCourse.name = this.profile.name;
        studentInPinnedCourse.rollNo = this.profile.rollNo;
        studentInPinnedCourse.studentFID = this.profile.fId;
        studentInPinnedCourse.addedOn = new Date().getTime();
        // Now Add this studentInPinnedCOurse to backed
        this.profile.myPinnedCourses.unshift(pc);

        // aso set the newly Added course background to some different color
      }

    }
    SaveMyPinnedCourses(){
      document.getElementById('myPinnedCoursesSearch').style.display = 'none';
      document.getElementById('myPinnedCoursesSave').style.display ='none';
      document.getElementById('myPinnedCoursesEdit').style.display = 'inline';
      // SAve the pinned courses
    }


    mySkillsEditClicked(){
      document.getElementById('mySkillsSearch').style.display = 'block';
      document.getElementById('mySkillsEdit').style.display = 'none';
    }

    SaveMySkills(){
      let mySkill = new MySkills();
      mySkill.description = (document.getElementById('newSkillDescription') as HTMLInputElement).value;
      mySkill.name = (document.getElementById('newSkillName') as HTMLInputElement).value;
      var AllLevelRadioButtons = document.getElementsByName('newSkillExpertiseLevel');
     
      for(var i = 0; i < AllLevelRadioButtons.length; i++){
          if((AllLevelRadioButtons[i] as HTMLInputElement).checked){
            mySkill.expertiseLevel = (AllLevelRadioButtons[i] as HTMLInputElement).value;
          }
      }
      mySkill.addedOnDate = new Date().getMilliseconds();
      mySkill.id = ' Some I';
      console.log(mySkill.expertiseLevel);;
      document.getElementById('mySkillsSearch').style.display = 'block';
      document.getElementById('mySkillsEdit').style.display = 'none';


      this.profile.mySkills.unshift(mySkill);
      document.getElementById('mySkillsSearch').style.display = 'none';
      document.getElementById('mySkillsEdit').style.display = 'inline';
    }

    // My Skills
}
