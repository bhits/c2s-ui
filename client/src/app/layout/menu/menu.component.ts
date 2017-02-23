import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'c2s-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  menuItems = [
    {name: 'Home', url: ''},
    {name: 'Providers', url: 'provider-list'},
    {name: 'Consents', url: ''},
    {name: 'Medical Documents', url: ''},
    {name: 'Activity History', url: ''},
    {name: 'Health Information', url: ''},
    {name: 'Resources', url: ''},
    {name: 'Logout', url: ''}
  ];
}
