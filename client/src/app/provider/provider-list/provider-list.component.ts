import {Component, OnInit} from "@angular/core";
import {Provider} from "../shared/provider.model";
import {ProviderService} from "../shared/provider.service";
import {PaginationInstance} from "ng2-pagination";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'c2s-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})

export class ProviderListComponent implements OnInit {
  providers: Provider[];
  paginationConfig: PaginationInstance = {
    itemsPerPage: 10,
    currentPage: 1
  };
  accordionTab: boolean = true;

  constructor(private route: ActivatedRoute,
              private providerService: ProviderService) {
  }

  ngOnInit() {
    this.providers = this.route.snapshot.data['providers'];
  }

  onPageChange(number: number) {
    this.paginationConfig.currentPage = number;
  }

  confirmDeleteProvider(dialog: any, provider: Provider) {
    dialog.close();
    if (provider != name) {
      this.providerService.deleteProvider(provider.npi)
        .subscribe(() =>
          this.providers = this.providers.filter(p => p !== provider));
      //Todo: Add notification to handle result
    }
  }
}
