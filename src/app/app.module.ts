import { environment } from './../environments/environment';
import { HeaderComponent } from './partials/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MyRouteModule } from './my-route.routing';

import { FluxRssComponent } from './home/flux-rss/flux-rss.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      SignupComponent,
      SigninComponent,
      FluxRssComponent,
      HeaderComponent
   ],
   imports: [
      BrowserModule,
      MyRouteModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAnalyticsModule, // dynamically imports firebase/analytics
      AngularFirestoreModule, // imports firebase/firestore, only needed for database features
      AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
      AngularFireStorageModule // imports firebase/storage only needed for storage features
   ],
   providers: [
      {provide: LOCALE_ID, useValue: 'fr' }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
