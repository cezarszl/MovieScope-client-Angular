import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

/**
 * Component for navbar.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  /**
   * Event emitter for sidenav toggle.
   */
  @Output() public sidenavToggle = new EventEmitter();

  /**
   * Constructor.
   * @param authService - AuthService instance.
   * @param router - Router instance.
   */
  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit() { }

  /**
   * Checks if user is logged in.
   * @returns True if user is logged in, otherwise false.
   */
  isLoggedIn(): boolean {
    return this.authService.isAuthenticatedUser();
  }

  /**
   * Logs out the user.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /**
   * Handles sidenav toggle event.
   */
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
