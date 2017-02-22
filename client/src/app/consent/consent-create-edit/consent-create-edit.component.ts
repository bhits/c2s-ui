import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'c2s-consent-create-edit',
  templateUrl: './consent-create-edit.component.html',
  styleUrls: ['./consent-create-edit.component.css']
})
export class ConsentCreateEditComponent implements OnInit {
  @Input() medicalInfo: string = "A";

  constructor() { }

  ngOnInit() {
  }

}
