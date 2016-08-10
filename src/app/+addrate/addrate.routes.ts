import { RouterConfig }       from '@angular/router';
import { AuthGuard }          from '../shared/';
import { AddrateComponent }     from './addrate.component';
export const addrateRoutes: RouterConfig = [
  { path: 'addrate', component: AddrateComponent } //, canActivate: [AuthGuard] 
];