import {Component, OnInit, Input, OnChanges, SimpleChanges} from "@angular/core";
import {Consent} from "../shared/consent.model";

@Component({
  selector: 'c2s-consent-card',
  templateUrl: './consent-card.component.html',
  styleUrls: ['./consent-card.component.css']
})
export class ConsentCardComponent implements OnInit, OnChanges {

  @Input() private consent: Consent;

  private detailsVisible: boolean = false;
  private height: number = 0;

  constructor() {
  }

  ngOnInit() {
    this.detailsVisible = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  toggleDetailsVisible(el: any) {
    this.detailsVisible = !this.detailsVisible;
    this.height = this.height ? 0 : el.scrollHeight;
  }

  private getHeightPx() {
    return `${this.height}px`;
  }
}
