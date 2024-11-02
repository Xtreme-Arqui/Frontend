import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../../access/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  isScreenLarge: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Large)
    .pipe(
      map(result => result.matches),
      shareReplay()
  );

  constructor(
    //private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  isSelected(path: string): boolean {
    return this.router.url === path;
  }

  onLogOut(): void {
    this.authService.logOut();
  }
}
