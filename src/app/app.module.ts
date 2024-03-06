import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, matFormFieldAnimations } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';


// import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
// import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
// import { MovieCardComponent } from './movie-card/movie-card.component';
// import { WelcomePageComponent } from './welcome-page/welcome-page.component';

//Components 
import { MainViewComponent } from './components/main-view/main-view.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MovieViewComponent } from './components/movie-view/movie-view.component';
import { NavbarComponent } from './components/navbar/navbar.component';




@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    ProfileViewComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    MovieViewComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
