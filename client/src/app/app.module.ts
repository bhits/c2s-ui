import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {CoreModule} from "./core/core.module";
import {ConsentModule} from "./consent/consent.module";
import {LayoutModule} from "./layout/layout.module";
import {ProviderModule} from "./provider/provider.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    ConsentModule,
    FormsModule,
    HttpModule,
    LayoutModule,
    ProviderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
