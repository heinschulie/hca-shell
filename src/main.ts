import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';

import { CommonService } from './app/shared'; 
import { ImageService } from './app/shared'; 
import { UserService } from './app/shared'; 
import { UserStateService } from './app/shared/'; 

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
    disableDeprecatedForms(),
    provideForms(),
    CommonService, 
    ImageService,
    UserService,
    UserStateService, 
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS
]);

