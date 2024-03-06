import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  @Output() public sidenavToggle = new EventEmitter();

  ngOnInit() {

  }

  isLoggedIn(): boolean {
    if (this.authService.isAuthenticatedUser()) {
      return true;
    }
    return false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
