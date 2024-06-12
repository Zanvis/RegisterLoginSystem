import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StrongPasswordRegx } from '../StrongPassword';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  username = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.pattern(StrongPasswordRegx)]);

  registrationForm = new FormGroup({
    username: this.username,
    email: this.email,
    password: this.password
  });

  errorMessageUsername = '';
  errorMessageEmail = '';
  errorMessagePassword = '';
  registrationErrorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  updateErrorMessage() {
    if (this.username.hasError('required')) {
      this.errorMessageUsername = 'You must enter a value';
    } else {
      this.errorMessageUsername = '';
    }
    if (this.email.hasError('required')) {
      this.errorMessageEmail = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessageEmail = 'Not a valid email';
    } else {
      this.errorMessageEmail = '';
    }
    if (this.password.hasError('required')) {
      this.errorMessagePassword = 'You must enter a value';
    } else if (this.password.hasError('pattern')) {
      this.errorMessagePassword = 'Not a valid password, must contain at least one uppercase letter, one lowercase letter and one number';
    } else {
      this.errorMessagePassword = '';
    }
  }

  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.http.post('http://localhost:5000/api/register', this.registrationForm.value)
        .pipe(
          catchError((error) => {
            console.error('Registration error: ', error);
            return throwError(() => error); // Use the throwError operator instead of the throwError function
          })
        )
        .subscribe(() => {
          this.router.navigate(['/login']);
        });
    }
  }
}