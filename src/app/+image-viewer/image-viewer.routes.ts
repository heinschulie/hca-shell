import { RouterConfig }       from '@angular/router';
import { AuthGuard }          from '../shared/';
import { ImageViewerComponent }     from './image-viewer.component';
export const imageViewerRoutes: RouterConfig = [
  { path: 'images/:propertyId', component: ImageViewerComponent } //, canActivate: [AuthGuard] 
];