import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";
import {ConfirmDialogService} from "./confirm-dialog.service";
import {MaterialModule} from "@angular/material";
import {NgModule} from "@angular/core";
import {DialogComponent} from "./dialog.component";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [ConfirmDialogComponent, DialogComponent],
  exports: [ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent],
  providers: [ConfirmDialogService]
})
export class DialogModule {
}
