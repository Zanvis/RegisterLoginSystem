import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit{
  isLoggedIn$!: Observable<boolean>;
  // username$!: Observable<string | null>;
  username!: string | null;

  constructor(public authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    // this.username$ = this.authService.getUsername();
  }

  ngOnInit(): void {
    this.authService.getUsername().subscribe((username) => {
      this.username = username
    })
  }
}
