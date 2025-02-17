import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  pageTitle: string = 'Dashboard'; // Default page title

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title // Inject Title service
  ) { }

  ngOnInit(): void {
    // Set the initial title
    this.setPageTitle();

    // Listen to router events and update the title on NavigationEnd
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setPageTitle();
    });
  }

  // Method to set the page title based on the current route
  setPageTitle() {
    // Check if there's a title in the route data
    let routeTitle = this.getRouteTitle(this.activatedRoute);
    
    // Update page title
    this.pageTitle = routeTitle ? routeTitle : 'Dashboard';  // Use dynamic or default title

    // Set the page title dynamically
    this.titleService.setTitle(this.pageTitle);
  }

  // Recursive method to handle nested routes and retrieve the title
  getRouteTitle(route: ActivatedRoute): string | null {
    // Check if current route has a title
    if (route.snapshot.data['title']) {
      return route.snapshot.data['title'];
    }

    // Check if child routes have a title
    if (route.firstChild) {
      return this.getRouteTitle(route.firstChild);
    }
    return null; // Return null if no title is found
  }

  logout() {
    this.authService.logout();
  }
}
