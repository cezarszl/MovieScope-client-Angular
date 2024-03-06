import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../../services/signup.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
signupForm?: any;


  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      birthday: ['', Validators.required],
    });
  }

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
  


