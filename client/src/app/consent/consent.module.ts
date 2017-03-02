import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MaterialModule} from "@angular/material";
import {ConsentTermsComponent} from "./consent-terms/consent-terms.component";
import {PurposeOfUseComponent} from "./purpose-of-use/purpose-of-use.component";
import {Md2Module} from "md2";
import {SelectProviderComponent} from "./select-provider/select-provider.component";
import {MedicalInformationComponent} from "./medical-information/medical-information.component";
import {ConsentCreateEditComponent} from "./consent-create-edit/consent-create-edit.component";
import {ConsentCardComponent} from "./consent-card/consent-card.component";
import {ConsentCardListComponent} from "./consent-card-list/consent-card-list.component";
import {ConsentService} from "./consent.service";
import {SharedModule} from "../shared/shared.module";
import {ConsentRoutingModule} from "./consent-routing.module";
import {ConsentStagePipe} from "./shared/consent-stage.pipe";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule, // TODO: verify while FormModule when imported at root level is not available to every other module
    ConsentRoutingModule,
    SharedModule,
    Md2Module,
    RouterModule
  ],
  declarations: [
    ConsentTermsComponent,
    PurposeOfUseComponent,
    SelectProviderComponent,
    MedicalInformationComponent,
    ConsentCreateEditComponent,
    ConsentCardComponent,
    ConsentCardListComponent,
    ConsentStagePipe
  ],
  exports: [
    ConsentCreateEditComponent,
    MaterialModule
  ],
  providers: [ConsentService]
})
export class ConsentModule {
}
