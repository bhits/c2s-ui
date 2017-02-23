import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";
import {ConfirmDialogService} from "./confirm-dialog.service";
import {MaterialModule} from "@angular/material";
import {NgModule} from "@angular/core";

@NgModule({
  imports: [
    MaterialModule
  ],
  declarations: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent],
  providers: [ConfirmDialogService]
})
export class DialogModule {
}
