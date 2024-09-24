import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  isScreenLarge: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Large)
    .pipe(
      map(result => result.matches),
      shareReplay()
  );

  constructor(
    //private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) { }

  ngOnInit() {
  }

  isSelected(path: string): boolean {
    return this.router.url === path;
  }
}

