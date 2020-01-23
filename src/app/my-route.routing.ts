import { HeaderComponent } from './partials/header/header.component';
import { FluxRssComponent } from './home/flux-rss/flux-rss.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { 
    path:'home', 
    component: HomeComponent ,
    children: [
      {
        path: 'flux-rss',
        component: FluxRssComponent,
        data: {
          url : "",
          template: ""
        }
      }
    ]
  },
  { path:'auth/signin', component: SigninComponent },
  { path:'auth/signup', component: SignupComponent },
  { path:'header', component: HeaderComponent },
  {path:'', pathMatch: 'full', component: HomeComponent},
  {path:'**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class MyRouteModule { }
