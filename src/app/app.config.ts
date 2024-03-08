import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { ApiService } from './services/api.service';
import { FirestoreApiService } from './services/firestore-api.service';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'drugs-store-70435',
          appId: '1:354873963168:web:a5316c66cba7f73e194fc5',
          storageBucket: 'drugs-store-70435.appspot.com',
          apiKey: 'AIzaSyBHNrF2ppjiL4-q2WSTLTHnL_kgXPdkOx0',
          authDomain: 'drugs-store-70435.firebaseapp.com',
          messagingSenderId: '354873963168',
          measurementId: 'G-2K4R10YJ7E',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideAnalytics(() => getAnalytics())),
    ScreenTrackingService,
    UserTrackingService,
    importProvidersFrom(provideFirestore(() => getFirestore())),
    provideToastr({
      progressBar: true,
      preventDuplicates: true,
      timeOut: 10000,
    }),
    {
      provide: ApiService,
      useClass: FirestoreApiService,
    },
  ],
};
