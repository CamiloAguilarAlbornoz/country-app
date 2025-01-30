import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  private _menuOptionsList = [
    // {
    //   routerLink: '/home',
    //   title: 'Home Page'
    // },
    // {
    //   routerLink: '/about',
    //   title: 'About Page'
    // },
    // {
    //   routerLink: '/contact',
    //   title: 'Contact Page'
    // },
    {
      routerLink: '/countries/by-capital',
      title: 'Por Capital'
    },
    {
      routerLink: '/countries/by-country',
      title: 'Por País'
    },
    {
      routerLink: '/countries/by-region',
      title: 'Por Region'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  public get menuOptionsList() {
    return [...this._menuOptionsList];
  }
}
