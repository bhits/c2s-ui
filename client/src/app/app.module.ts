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
import {HomeModule} from "./home/home.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Md2Module,
    CoreModule,
    ConsentModule,
    LayoutModule,
    ProviderModule,
    MaterialModule, // TODO: Move to core module - verify why it is not working now.
    HomeModule,
    AppRoutingModule // Must be the last module to be imported
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
