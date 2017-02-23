import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'c2s-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
  menuItems = [
    {
      name: 'Home',
    },
    {
      name: 'Providers',
    },
    {
      name: 'Consents',
    },
    {
      name: 'Medical Documents',
    },
    {
      name: 'Activity History',
    },
    {
      name: 'Health Information',
    },
    {
      name: 'Resources',
    },
    {
      name: 'Logout',
    }
  ];

}
