import { Injectable, Inject }  from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { UserStateService }    from '../state/user-state.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router : Router, private userState : UserStateService) { } 

  canActivate() {

    //http://stackoverflow.com/questions/38036113/canactivate-in-authguard-cant-read-observable-current-user-of-authserver
    return this.userState.loggedIn
    .do(
      isLoggedIn => { 
        console.log("We hit the subscription! : " + isLoggedIn); 
        if(!isLoggedIn) 
          this.router.navigate(['/login']); 
        },
      error => console.error(error),
      () =>{
        console.log("Subscription Complete"); 
      }
    );
  }
}
