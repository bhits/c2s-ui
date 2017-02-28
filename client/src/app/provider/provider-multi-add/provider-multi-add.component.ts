import {Component, OnInit, Input} from "@angular/core";
import {ProviderProjection} from "../shared/provider-projection.model";

@Component({
  selector: 'c2s-provider-multi-add',
  templateUrl: './provider-multi-add.component.html',
  styleUrls: ['./provider-multi-add.component.css']
})
export class ProviderMultiAddComponent implements OnInit {
  @Input() providers: ProviderProjection[];
  tHeads = [
    {text: '', cols: 1, color: 'lightgray'},
    {text: 'Name/Facility', cols: 3, color: 'lightgray'}
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
