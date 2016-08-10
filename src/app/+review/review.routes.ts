import { RouterConfig }       from '@angular/router';
import { AuthGuard }          from '../shared/';
import { ReviewComponent }     from './review.component';
export const reviewRoutes: RouterConfig = [
  { path: 'review/:id', component: ReviewComponent } //, canActivate: [AuthGuard] 
];