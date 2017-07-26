import {Links} from "./links.model";
import {Page} from "./page.model";

export class PagedResourcesData<T> {
  _embedded: Map<string, T[]>;
  _links: Links;
  page: Page;
}
