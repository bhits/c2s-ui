import {Page} from "../../shared/page.model";
import {Links} from "../../shared/links.model";
import {PageableData} from "../../shared/pageable-data.model";
import {FlattenedSmallProvider} from "../../shared/flattened-small-provider.model";

export class ProviderSearchResponse implements PageableData<FlattenedSmallProvider> {
  _embedded: Map<string, FlattenedSmallProvider[]>;
  _links: Links;
  page: Page;
}
