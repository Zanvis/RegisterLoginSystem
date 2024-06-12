import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);

  loginForm = new FormGroup({
    email: this.email,
    password: this.password
  });

  errorMessageEmail = '';
  errorMessagePassword = '';
  loginErrorMessage = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}


  updateErrorMessage() {
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
    if (this.loginForm.valid) {
      this.http.post<{ token: string }>('http://localhost:5000/api/login', this.loginForm.value)
        .pipe(
          catchError((error) => {
            console.error('Login error: ', error);
            return throwError(() => error);
          })
        )
        .subscribe((response) => {
          this.authService.login(response.token);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/main-page']);
        });
    }
  }
}
