import {importProvidersFrom} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideRouter, withEnabledBlockingInitialNavigation,} from '@angular/router';
import {AppComponent} from './app/app.component';
import {appRoutes} from './app/app.routes';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {environment} from "./environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {GoogleMapsModule} from "@angular/google-maps";
import {GooglePlaceModule} from "ngx-google-places-autocomplete";


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideFirestore(() => getFirestore()),
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFirestoreModule,
      GoogleMapsModule,
      GooglePlaceModule
    ),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation())
  ],
}).catch((err) => console.error(err));
