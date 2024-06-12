import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from 'express';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [],
  templateUrl: './protected.component.html',
  styleUrl: './protected.component.css'
})
export class ProtectedComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    // this.router.navigate(['/login']);
    window.location.reload();
  }
}
