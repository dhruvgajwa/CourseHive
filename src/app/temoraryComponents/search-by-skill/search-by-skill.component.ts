import { Component, OnInit } from '@angular/core';
import { SKILLS } from 'src/app/Models/Profile';
import { SearchService} from  '../../services/search.service';
@Component({
  selector: 'app-search-by-skill',
  templateUrl: './search-by-skill.component.html',
  styleUrls: ['./search-by-skill.component.css']
})
export class SearchBySkillComponent implements OnInit {


  skillName: string = '';
  filteredSkills: SKILLS[] = [];
  lastKeypress: number = 0;
  
  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  SearchClicked(){
    // upomn search click redirect to new componenet
    // Which will be specific for a specific something!
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
