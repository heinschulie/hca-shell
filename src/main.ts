import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';

// import { NotifierService, NotifierGlobalOptions, provideNotifierOptions } from 'angular2-notifier';

import { CommonService } from './app/shared'; 
// import { ToastrService } from './app/shared'; 
import { MediaService } from './app/shared'; 
import { MediaStateService } from './app/shared'; 
import { UserService } from './app/shared'; 
import { UserStateService } from './app/shared/'; 

if (environment.production) {
  enableProdMode();
}

// const myNotifierConfiguration: NotifierGlobalOptions = {
//     position: {
//         horizontal: {
//             distance: 12,
//             position: 'right'
//         },
//         vertical: {
//             position: 'top',
//             distance: 12
//         },
//         gap: 10
//     },
//     theme: 'material',
//     behaviour: {
//         autoHide: 2000,
//         dismissOnClick: false,
//         pauseOnMouseover: true,
//         resetOnMouseover: false,
//         stacking: 4,
//         showDismissButton: true
//     },
//     animations: {
//         enabled: true,
//         show: {
//             method: 'slide',
//             duration: 300,
//             easing: 'ease'
//         },
//         hide: {
//             method: 'fade',
//             duration: 300,
//             easing: 'ease'
//         },
//         shift: {
//             duration: 300,
//             easing: 'ease'
//         },
//         clear: {
//             offset: 50
//         }
//     }
// };

bootstrap(AppComponent, [
    disableDeprecatedForms(),
    provideForms(),
    // provideNotifierOptions( myNotifierConfiguration ),
    // NotifierService,
    // ToastrService,
    CommonService, 
    MediaService,
    MediaStateService,
    UserService,
    UserStateService, 
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS
]);

