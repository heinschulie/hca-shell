import { RouterConfig }       from '@angular/router';
import { UserStateService }        from '../shared/';
import { AuthGuard }          from '../shared/';
import { LoginComponent }     from './login.component';
export const loginRoutes: RouterConfig = [
  { path: 'login', component: LoginComponent }
];
export const authProviders = [ AuthGuard ];
