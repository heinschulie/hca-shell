import { provideRouter, RouterConfig } from '@angular/router';

import { loginRoutes, authProviders }      from './+login/login.routes';
import { addrateRoutes }      from './+addrate/addrate.routes';
import { imageRoutes }      from './+image-gallery/image-gallery.routes';
import { imageViewerRoutes }      from './+image-viewer/image-viewer.routes';
import { reviewRoutes }      from './+review/review.routes';
import { wishlistRoutes }      from './+wishlist/wishlist.routes';
import { registerRoutes }      from './+register/register.routes';
import { preregisterRoutes }      from './+pre-register/pre-register.routes';
import { postregisterRoutes }      from './+post-register/post-register.routes';
import { userProfileRoutes }      from './+user-profile/user-profile.routes';

import { AuthGuard }             from './shared/guards/auth.guard';

import { AppComponent } from './'; 
import { DashboardComponent } from './+dashboard'; 
import { ReviewComponent } from './+review'; 
import { LoginComponent } from './+login'; 

// import { ProTutorialsComponent } from './+pro-tutorials'; 
// import { PubTutorialsComponent } from './+pub-tutorials'; 
// import { TutorialComponent } from './+tutorial'; 

export const routes: RouterConfig = [
  { path: '', component: DashboardComponent },
  ...addrateRoutes,
  ...imageRoutes,
  ...imageViewerRoutes,
  ...loginRoutes,
  ...reviewRoutes,
  ...wishlistRoutes,
  ...preregisterRoutes,
  ...registerRoutes,
  ...postregisterRoutes,
  ...userProfileRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  authProviders
];