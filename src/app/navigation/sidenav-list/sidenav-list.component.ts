import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.scss'
})
export class SidenavListComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  @Output() sidenavClose = new EventEmitter();

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
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}
