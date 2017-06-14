import {UtilityService} from "../shared/utility.service";
import {BrowserService} from "../core/browser.service";
import {DatePipe, Location} from "@angular/common";
import {Router} from "@angular/router";
import {ConsentProvider, FHIR_US_NPI_SYSTEM} from "./consent-provider.model";
import {ConsentProviderPipe} from "./consent-provider.pipe";
import {Identifier} from "./identifier.model";
import {Address} from "./address.model";

describe(' ConsentProviderPipe', () => {
  let pipe;
  let utilityService: UtilityService;
  let location: Location;
  let router: Router;
  let datePipe: DatePipe;
  let browserService: BrowserService;
  let testConsentProvider: ConsentProvider;
  let testIdentifier1, testIdentifier2: Identifier;
  let testIdentifierArray: Identifier[];
  let address: Address;
  let system: string;

  beforeEach(() => {
    utilityService = new UtilityService(location, router, datePipe, browserService);
    pipe = new ConsentProviderPipe(utilityService);
    testConsentProvider = new ConsentProvider();
  });

  it('should test for case "npi"', () => {
    system = FHIR_US_NPI_SYSTEM;
    console.log(system);
    testIdentifier1 = new Identifier(system, 'test1 identifier value');
    testIdentifier2 = new Identifier('test2 system', 'test2 identifier value');
    testIdentifierArray = [testIdentifier1, testIdentifier2];
    testConsentProvider.identifiers = testIdentifierArray;
    expect(pipe.transform(testConsentProvider, 'npi')).toEqual("test1 identifier value");
  });

  it('should return null with invalid value parameter', () => {
    expect(pipe.transform(null)).toEqual(null);
  });

  describe('should test for case "name"', () => {
    it('should test for case ORGANIZATION', () => {
      testConsentProvider.providerType = "ORGANIZATION";
      testConsentProvider.name = "test name";
      expect(pipe.transform(testConsentProvider, 'name')).toEqual("test name");
    });

    it('should test for case PRACTITIONER', () => {
      testConsentProvider.providerType = "PRACTITIONER";
      testConsentProvider.firstName = "firstName";
      testConsentProvider.middleName = "middleName";
      testConsentProvider.lastName = "lastName";
      expect(pipe.transform(testConsentProvider, 'name')).toEqual("firstName middleName lastName");
    });

    it('should throw error for invalid providerType', () => {
      testConsentProvider.providerType = "invalidProviderType";
      expect(pipe.transform(testConsentProvider, 'name')).toThrow(new TypeError("Invalid providerType"));
    });
  });

  it('should test for case "address"', () => {
    address = new Address();
    address.line1 = "line1";
    address.line2 = "line2";
    address.city = "city";
    address.state = "state";
    address.postalCode = "12345";
    address.country = "Country";
    testConsentProvider.address = address;
    expect(pipe.transform(testConsentProvider, 'address')).toEqual("line1, line2, city, state, 12345, Country");
  });

  it('should test for case "phone"', () => {
    testConsentProvider.phoneNumber = "1234567890"
    expect(pipe.transform(testConsentProvider, 'phone')).toEqual("1234567890");
  });

  it('should test for getName with return ""', () => {
    expect(pipe.getName(null)).toEqual("");
  });
});
