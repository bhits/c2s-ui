import {Component, OnInit} from "@angular/core";
import {Provider} from "../shared/provider.model";
import {ProviderService} from "../shared/provider.service";
import {PaginationInstance} from "ng2-pagination";
import {DataService} from "../../shared/data.service";

@Component({
  selector: 'c2s-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})

export class ProviderListComponent implements OnInit {
  providers: Provider[];
  title:string = "Providers";

  paginationConfig: PaginationInstance = {
    itemsPerPage: 10,
    currentPage: 1
  };
  accordionTab: boolean = true;

  constructor(private dataService: DataService,
              private providerService: ProviderService) {
  }

  ngOnInit() {
    this.dataService.getProviders()
      .subscribe(
        res => this.providers = res,
        err => console.log(err)
      );
  }

  onPageChange(number: number) {
    this.paginationConfig.currentPage = number;
  }

  confirmDeleteProvider(dialog: any, provider: Provider) {
    dialog.close();
    if (provider != name) {
      this.providerService.deleteProvider(provider.npi)
        .then(() =>
          this.providers = this.providers.filter(p => p !== provider));
      console.log("Success in deleting provider:" + provider.npi)
    }
  }
}
