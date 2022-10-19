import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/storage.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/user-profile', title: 'User profile', icon: 'ni-single-02 text-yellow', class: '' },
  { path: '/users', title: 'Users lists', icon: 'ni-bullet-list-67 text-red', class: '' },
  { path: '/calendar', title: 'Calendar', icon: 'ni-calendar-grid-58 text-blue', class: '' },
  { path: '/products', title: 'Products', icon: 'ni-box-2 text-green', class: '' },
  { path: '/providers', title: 'Providers', icon: 'ni-ambulance text-red', class: '' },
  { path: '/stores', title: 'Stores', icon: 'ni-shop text-orange', class: '' },
  { path: '/washed', title: 'Washed Types', icon: 'ni-air-baloon text-blue', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  currentUser: Object = {};

  constructor(private localStorage: StorageService, private router: Router) { }

  ngOnInit() {

    this.currentUser = JSON.parse(this.localStorage.getData('user'));

    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  handleLogout() {
    this.localStorage.removeData('user')
  }
}
