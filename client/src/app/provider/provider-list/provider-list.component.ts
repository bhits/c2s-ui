import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'c2s-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  tHeads = [
    {text: '', cols: 1, rows: 1, color: 'lightgray'},
    {text: 'Name/Facility', cols: 4, rows: 1, color: 'lightgray'},
    {text: 'NPI', cols: 2, rows: 1, color: 'lightgray'},
    {text: 'Contact Number', cols: 2, rows: 1, color: 'lightgray'},
    {text: 'Address', cols: 4, rows: 1, color: 'lightgray'}
  ];

  providers = [
    {text: '', cols: 1, rows: 1},
    {text: 'COMFORT CARE ANESTHESIA LLC', cols: 4, rows: 1},
    {text: '1003031121', cols: 2, rows: 1},
    {text: '301-497-9944', cols: 2, rows: 1},
    {text: '10512 TWIN CEDAR CT, LAUREL, MD, 20723-5721', cols: 4, rows: 1}
  ];
}
