import {Component, OnInit, Input, ViewContainerRef} from "@angular/core";
import {ConfirmDialogService} from "../../shared/dialog/confirm-dialog.service";
import {ProviderProjection} from "../shared/provider-projection.model";

@Component({
  selector: 'c2s-provider-multi-add',
  templateUrl: './provider-multi-add.component.html',
  styleUrls: ['./provider-multi-add.component.css']
})
export class ProviderMultiAddComponent implements OnInit {
  @Input() providers: ProviderProjection[];
  currentProvider: ProviderProjection = null;

  constructor(private confirmDialogService: ConfirmDialogService,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
  }

  confirmDeleteProvider(provider: ProviderProjection) {
    this.confirmDialogService
      .confirm('Delete Provider', 'Are you sure you want to delete this provider?', this.viewContainerRef)
      .subscribe(res => {
        this.deleteProvider(res, provider);
      });
  }

  deleteProvider(option: boolean, provider: ProviderProjection) {
    if (option) {
      this.currentProvider = provider;
      this.providers.splice(this.providers.indexOf(this.currentProvider), 1);
      console.log(this.providers);
    }
  }
}
