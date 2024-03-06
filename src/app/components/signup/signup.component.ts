import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../../services/signup.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component for the signup functionality.
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  /**
   * Represents the signup form.
   */
  signupForm?: any;

  /**
   * Constructs a new SignupComponent instance.
   * @param fb The FormBuilder instance for building the form.
   * @param signupService The SignupService instance for handling signup operations.
   * @param router The Router instance for navigation.
   * @param snackBar The MatSnackBar instance for displaying notifications.
   */
  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  /**
   * Initializes the signup form.
   */
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      birthday: ['', Validators.required],
    });
  }

  /**
   * Handles the form submission.
   * If the form is valid, it calls the signup service to attempt signup.
   * If signup is successful, it navigates to the login page and displays a success message.
   * If signup fails, it logs an error message.
   */
  onSubmit(): void {
    if (this.signupForm.valid) {
      const username = this.signupForm.get('username').value;
      const password = this.signupForm.get('password').value;
      const email = this.signupForm.get('email').value;
      const birthday = this.signupForm.get('birthday').value;

      this.signupService.signup(username, password, email, birthday).subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['/login']);
            this.snackBar.open('Signing up successful', 'OK', {
              duration: 2000
            });
          } else {
            console.error('Signup failed');
          }
        }
      });
    }
  }
}
