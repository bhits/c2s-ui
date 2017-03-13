import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'c2s-consent-sign',
  templateUrl: './consent-sign.component.html',
  styleUrls: ['./consent-sign.component.css']
})
export class ConsentSignComponent implements OnInit {
  public title: string = "eSignature";

  constructor() {
  }

  ngOnInit() {
  }

}
