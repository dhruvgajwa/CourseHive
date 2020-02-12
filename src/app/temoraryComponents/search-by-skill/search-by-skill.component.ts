import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SKILLS } from 'src/app/Models/Profile';
import { Router} from  '@angular/router';
import { SearchService} from  '../../services/search.service';

@Component({
  selector: 'app-search-by-skill',
  templateUrl: './search-by-skill.component.html',
  styleUrls: ['./search-by-skill.component.css']
})
export class SearchBySkillComponent implements OnInit {
  @Output() returnSkill = new EventEmitter();

  // make this input output only
  // means on Click it should emit the clicked course Only

 
  skillName: string = '';
  filteredSkills: SKILLS[] = [];
  lastKeypress: number = 0;
  
  constructor(private searchService: SearchService, private router: Router) { }

  ngOnInit() {
  }

  SearchClicked(){
    // add handle code here!
    let skill = new SKILLS();
    skill.name = this.skillName;
    skill.id = this.searchService.getRealtimeDBid();
    skill.createdOn = new Date().getTime();
    skill.icon = '';

    this.returnSkill.emit(skill);

  }
  MatOptionClicked(skill: SKILLS){
    this.returnSkill.emit(skill);
  }
  // Create a script to copy data from profile data in firestore to realtime database

  KeyDown($event) {

   // als here we are initiating the autoocomplete
    console.log($event);
    if ($event.key === 'Enter') {
     // this.SearchClicked();
      return;
    }

    if($event.keyCode < 65 || $event.keyCode > 105) {
      return;
    }

    if ($event.timeStamp - this.lastKeypress > 100) {
      let q =  this.setFirstLetterCapital($event.target.value);
    
    this.searchService.searchSkill(q).subscribe( res => {
      res.forEach((m: SKILLS) => {
        console.log(m['name'])

        
        this.filteredSkills.push(m);
        if(this.filteredSkills.length  >5){
          // also check if alredat present
          this.filteredSkills.shift();
        }
        
      });

      
    });

  }
   
  this.lastKeypress = $event.timeStamp;

  }
  setFirstLetterCapital(s: string): string {
    let p : string;
  
    console.log(s);
    let f =  s.substr(0, 1);
    p = f.toUpperCase() + s.substr(1,s.length);
    console.log(p);
    return p;
  
  }

}
  