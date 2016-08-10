import { RouterConfig }       from '@angular/router';
import { AuthGuard }          from '../shared/';
import { UserProfileComponent }     from './user-profile.component';
export const userProfileRoutes: RouterConfig = [
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] }
];
