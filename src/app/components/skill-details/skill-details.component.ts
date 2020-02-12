import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FirebaseService} from '../../services/firebase.service';
import { SKILLS } from 'src/app/Models/Profile';
import { LoadingBarService } from '@ngx-loading-bar/core';
@Component({
  selector: 'app-skill-details',
  templateUrl: './skill-details.component.html',
  styleUrls: ['./skill-details.component.css']
})
export class SkillDetailsComponent implements OnInit {
   skill: SKILLS = new SKILLS();
   allStudents: any[] = [];
  constructor( private activatedRoutes: ActivatedRoute, private firebaseServie: FirebaseService,
                private router: Router,private loadingBar: LoadingBarService) { }

  ngOnInit() {
    this.loadingBar.start();
    this.activatedRoutes.params.subscribe( (params:Params) => {
      let skillName = params.name;
      // now get add the data from skillname
      this.firebaseServie.getSkillByName(skillName).subscribe( (res: SKILLS) => {
        // this response is an object
        this.skill = res;
        this.allStudents = Object.values(res['students']);
        console.log(this.allStudents);
        console.log(res);
        this.loadingBar.stop();
      })
    })
  }

  getImage(roll: string) {
    return `https://photos.iitm.ac.in/byroll.php?roll=${roll.toUpperCase()}`
  }
  contactMe(fID: string ){
    this.router.navigate(['profile/'+ fID]);
  }

}
