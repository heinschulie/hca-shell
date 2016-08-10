import { RouterConfig }       from '@angular/router';
import { AuthGuard }          from '../shared/';
import { ImageGalleryComponent }     from './image-gallery.component';
export const imageRoutes: RouterConfig = [
  { path: 'images', component: ImageGalleryComponent } //, canActivate: [AuthGuard] 
];