import {Page} from "../../shared/page.model";
import {ProviderProjection} from "./provider-projection.model";
import {Links} from "../../shared/links.model";
import {PageableData} from "../../shared/pageable-data.model";

export class ProviderSearchResponse implements PageableData<ProviderProjection> {
  _embedded: {
    providers: ProviderProjection[]
  };
  _links: Links;
  page: Page;
}
