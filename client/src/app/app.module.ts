import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {Md2Module} from "md2";
import {MaterialModule} from "@angular/material";
import {AppComponent} from "./app.component";
import {CoreModule} from "./core/core.module";
import {ConsentModule} from "./consent/consent.module";
import {LayoutModule} from "./layout/layout.module";
import {ProviderModule} from "./provider/provider.module";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Md2Module.forRoot(),
    CoreModule,
    ConsentModule,
    LayoutModule,
    ProviderModule,
    MaterialModule, // TODO remove and the end of
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
