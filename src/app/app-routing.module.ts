import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './components/main-view/main-view.component';
import { LoginComponent } from './components/login/login.component';
import { authForLoginGuard } from './guards/auth-for-login.guard';
import { authForMoviesGuard } from './guards/auth-for-movies.guard';
import { MovieViewComponent } from './components/movie-view/movie-view.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { SignupComponent } from './components/signup/signup.component';

/**
 * Defines the routes of the application.
 */
const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [authForLoginGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [authForLoginGuard] },
  { path: 'movies', component: MainViewComponent, canActivate: [authForMoviesGuard] },
  { path: 'movies/:id', component: MovieViewComponent, canActivate: [authForMoviesGuard] },
  { path: 'profile', component: ProfileViewComponent, canActivate: [authForMoviesGuard] },
  { path: '**', component: MainViewComponent, pathMatch: 'full', canActivate: [authForMoviesGuard] },
  { path: '', redirectTo: '/movies', pathMatch: 'full' }
];

/**
 * NgModule that provides routing configuration for the application.
 */
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
