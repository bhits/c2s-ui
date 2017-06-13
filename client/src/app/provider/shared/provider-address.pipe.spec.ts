import {ProviderAddressPipe} from "./provider-address.pipe";
import {UtilityService} from "../../shared/utility.service";
import {DatePipe, Location} from "@angular/common";
import {Router} from "@angular/router";
import {BrowserService} from "../../core/browser.service";
import {FlattenedSmallProvider} from "../../shared/flattened-small-provider.model";

describe('ProviderAddressPipe', () => {
  let pipe, testFlattenedSmallProvider;
  let utilityService: UtilityService;
  let location: Location;
  let router: Router;
  let datePipe: DatePipe;
  let browserService: BrowserService;

  beforeEach(() => {
    utilityService = new UtilityService(location, router, datePipe, browserService);
    pipe = new ProviderAddressPipe(utilityService);
    testFlattenedSmallProvider = new FlattenedSmallProvider();
    testFlattenedSmallProvider.firstLinePracticeLocationAddress = "streetName";
    testFlattenedSmallProvider.practiceLocationAddressCityName = "Columbia";
    testFlattenedSmallProvider.practiceLocationAddressStateName = "MD";
  });

  it('should transforms  to ", , , fakeZipCode"', () => {
    var spy;
    spy = spyOn(utilityService, 'formatZipCode').and.returnValue('fakeZipCode')
    expect(pipe.transform("").toString()).toEqual
    (', , , fakeZipCode');
  });

  it('should transforms "streetName, Columbia, MD, 12345" to "streetName, Columbia, MD, 12345"', () => {
    var spy;
    spy = spyOn(utilityService, 'formatZipCode').and.returnValue('12345')
    expect(pipe.transform(testFlattenedSmallProvider).toString()).toEqual
    ('streetName, Columbia, MD, 12345');
  });
});
