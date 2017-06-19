import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'c2s-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

  getFullYear():number{
    return (new Date()).getFullYear();
  }

}
