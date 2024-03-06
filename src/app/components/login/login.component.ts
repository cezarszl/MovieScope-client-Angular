import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component for the login page.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  /**
   * Form group for the login form.
   */
  loginForm?: any;

  /**
   * Constructor.
   * @param fb - FormBuilder instance.
   * @param authService - AuthService instance.
   * @param router - Router instance.
   * @param snackBar - MatSnackBar instance.
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * Handles form submission.
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;

      this.authService.login(username, password).subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['/movies']);
            this.snackBar.open('Loggin in successful', 'OK', {
              duration: 2000
            });
          } else {
            console.error('Login failed');
          }
        }
      });
    }
  }
}
