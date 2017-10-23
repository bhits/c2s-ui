import {FlattenedSmallProvider, Links, Page, PagedResourcesData} from "c2s-ng-shared";

export class ProviderSearchResponse implements PagedResourcesData<FlattenedSmallProvider> {
  _embedded: Map<string, FlattenedSmallProvider[]>;
  _links: Links;
  page: Page;
}
