import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'c2s-page-title',
  templateUrl: 'page-title.component.html',
  styleUrls: ['page-title.component.css']
})
export class PageTitleComponent implements OnInit {

  @Input() title;
  @Input() isHidden:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  back(){
    window.history.back();
  }
}
