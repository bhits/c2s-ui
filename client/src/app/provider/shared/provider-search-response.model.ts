import {Page} from "../../shared/page.model";
import {ProviderProjection} from "./provider-projection.model";

export class ProviderSearchResponse {
  _embedded: EmbeddedResources;
  page: Page;
}

export class EmbeddedResources {
  providers: ProviderProjection[];
}
