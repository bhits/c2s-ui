import {Page} from "./page.model";
import {Links} from "./links.model";
export interface PageableData<T> {
  _embedded: {
    [key: string]: T[];
  };
  _links: Links;
  page: Page;
}
