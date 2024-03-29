import { Injectable} from '@angular/core';
import { CanActivate } from '@angular/router';
import {Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { AuthService} from '../services/auth.service';
import { FirebaseService} from '../services/firebase.service';
import { map } from 'rxjs/operators';
import { DataSharingService} from '../services/DataService/data-sharing.service';










@Injectable()
export class AuthGaurd implements CanActivate {
    constructor(private router: Router,
                public afAuth: AngularFireAuth,
                public authServive: AuthService,
                private firebaseS: FirebaseService,
                private dataSharingService: DataSharingService
                ) {

    }

    canActivate(): Observable<boolean> {
        return this.afAuth.authState.pipe(map(auth => {
            if (!auth ) {
                    this.router.navigate(['']);
                    return false;
            }
            else {
                console.log('1');
                if(this.dataSharingService.getProfileData() === undefined) {
                    console.log('2');
                    // get the profile data here!
                    this.firebaseS.getMyProfileData(auth.uid).subscribe( res => {
                        console.log('3', res);
                        if(res !== undefined) {
                            console.log('4');
                            this.dataSharingService.setProfileData(res);
                        }
                    })
                }
                return true;
            }
        }));
    }
}
