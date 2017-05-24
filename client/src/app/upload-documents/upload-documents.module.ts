import {NgModule} from "@angular/core";
import {UploadDocumentsRoutingModule, routedComponents} from "./upload-documents-routing.module";
import {SharedModule} from "../shared/shared.module";
import {LayoutModule} from "../layout/layout.module";

import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    SharedModule,
    LayoutModule,
    UploadDocumentsRoutingModule,
    TranslateModule
  ],
  declarations: [routedComponents]
})
export class UploadDocumentsModule {
}
