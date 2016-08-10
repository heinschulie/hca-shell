import { RouterConfig }       from '@angular/router';
import { AuthGuard }          from '../shared/';
import { WishlistComponent }     from './wishlist.component';
export const wishlistRoutes: RouterConfig = [
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard]  } //, canActivate: [AuthGuard] 
];