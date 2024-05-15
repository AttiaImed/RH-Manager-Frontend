import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";
import {ShowOnDirtyErrorStateMatcher} from "@angular/material/core";
import {EntryService} from "./Services/entry.service";
import {TokenStorageService} from "./Services/token.service";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {DataService} from "./Services/data.service";
import {provideClientHydration} from "@angular/platform-browser";
import {intAuthInterceptor} from "./Interceptors/int-auth.interceptor";
import {ErrorsStateMatcher} from "./Models/ErrorStateMatcher";
import { CalendarModule } from 'angular-calendar';
import { DateAdapter } from '@angular/material/core';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {JwtModule} from "@auth0/angular-jwt";
export function tokenGetter() {
  return localStorage.getItem("TOKEN_KEY");
}

export const appConfig: ApplicationConfig = {
  providers: [ provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3500}},
    {provide: ErrorsStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    EntryService,
    TokenStorageService,
    provideHttpClient(withInterceptors([intAuthInterceptor])),
    DataService,
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ["http://localhost:8081/api/"],
          //disallowedRoutes: ["http://example.com/examplebadroute/"],
        },
      }),
    ),
  ]
};
