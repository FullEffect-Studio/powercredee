import {bootstrapApplication} from '@angular/platform-browser';
import {provideRouter, withDebugTracing, withEnabledBlockingInitialNavigation, withHashLocation, } from '@angular/router';
import {AppComponent} from './app/app.component';
import {appRoutes} from './app/app.routes';
import {importProvidersFrom} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {WebCoreModule} from "@bb/web/core";



bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom([
    WebCoreModule,
    BrowserAnimationsModule
  ]), provideRouter(appRoutes, withEnabledBlockingInitialNavigation(), withHashLocation(), withDebugTracing() )],
}).catch((err) => console.error(err));
