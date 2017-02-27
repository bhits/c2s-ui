import { Component, OnInit } from '@angular/core';
import {ConsentService} from "../consent.service";
import {Provider} from "../Provider";
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'c2s-select-provider',
  templateUrl: './select-provider.component.html',
  styleUrls: ['./select-provider.component.css']
})
export class SelectProviderComponent implements OnInit {
  private providers: Provider[];

  constructor(private consentService: ConsentService) { }

  ngOnInit() {
    this.consentService.getProviders()
                       .then(res => this.providers = res)
                       .catch(this.error);
  }

  private error(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
