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

  it('should return null with invalid value parameter', () => {
    expect(pipe.transform(null)).toEqual(null);
  });

  it('should test for getName return type', () => {
    expect(typeof(pipe.getName(null))).toEqual("string");
  });

  describe('Case "npi"', () => {
    it('should test for case "npi"', () => {
      system = FHIR_US_NPI_SYSTEM;
      testIdentifier1 = new Identifier(system, 'test1 identifier value');
      testIdentifier2 = new Identifier('test2 system', 'test2 identifier value');
      testIdentifierArray = [testIdentifier1, testIdentifier2];
      testConsentProvider.identifiers = testIdentifierArray;
      expect(pipe.transform(testConsentProvider, 'npi')).toEqual("test1 identifier value");
    });

    it('should test for return type', () => {
      system = FHIR_US_NPI_SYSTEM;
      testIdentifier1 = new Identifier(system, 'test1 identifier value');
      testIdentifier2 = new Identifier('test2 system', 'test2 identifier value');
      testIdentifierArray = [testIdentifier1, testIdentifier2];
      testConsentProvider.identifiers = testIdentifierArray;
      expect(typeof((pipe.transform(testConsentProvider, 'npi')))).toEqual("string");
    });

  });

  describe('Case "name"', () => {
    describe('Case "ORGANIZATION"', () => {
      it('should test for case ORGANIZATION', () => {
        testConsentProvider.providerType = "ORGANIZATION";
        testConsentProvider.name = "test organization";
        expect(pipe.transform(testConsentProvider, 'name')).toEqual("test organization");
      });

      it('should test with invalid ConsentProvider value', () => {
        testConsentProvider.providerType = "ORGANIZATION";
        testConsentProvider.name = null;
        expect(pipe.transform(testConsentProvider, 'name')).toBeNull();
      });

      it('should test with empty ConsentProvider value', () => {
        testConsentProvider.providerType = "ORGANIZATION";
        expect(pipe.transform(testConsentProvider, 'name')).toBeUndefined();
      });

      it('should test for return type', () => {
        testConsentProvider.providerType = "ORGANIZATION";
        testConsentProvider.name = "test organization";
        expect(typeof(pipe.transform(testConsentProvider, 'name'))).toEqual('string');
      });
    });

    describe('Case "PRACTITIONER"', () => {
      it('should test for case PRACTITIONER', () => {
        testConsentProvider.providerType = "PRACTITIONER";
        testConsentProvider.firstName = "firstName";
        testConsentProvider.middleName = "middleName";
        testConsentProvider.lastName = "lastName";
        expect(pipe.transform(testConsentProvider, 'name')).toEqual("firstName middleName lastName");
      });

      it('should test with invalid ConsentProvider value', () => {
        testConsentProvider.providerType = "PRACTITIONER";
        testConsentProvider.firstName = null;
        testConsentProvider.middleName = null;
        testConsentProvider.lastName = null;
        expect(pipe.transform(testConsentProvider, 'name')).toEqual("  ");
      });

      it('should test with empty ConsentProvider value', () => {
        testConsentProvider.providerType = "PRACTITIONER";
        expect(pipe.transform(testConsentProvider, 'name')).toEqual("  ");
      });

      it('should test for return type', () => {
        testConsentProvider.providerType = "PRACTITIONER";
        expect(typeof(pipe.transform(testConsentProvider, 'name'))).toEqual('string');
      });
    });

    describe('Case Throw Error', () => {
      // TODO fix issue with throwing Exception
      xit('should test with invalid providerType', () => {
        testConsentProvider.providerType = "invalidProviderType";
        pipe.transform(testConsentProvider, 'name').fail;
        expect(pipe.transform(testConsentProvider, 'name')).toThrowError();
      });
    });
  });

  describe('Case "address"', () => {
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

    it('should test with invalid ConsentProvider value', () => {
      testConsentProvider.address = new Address();
      expect(pipe.transform(testConsentProvider, 'address')).toEqual("");
    });

    it('should test for return type', () => {
      testConsentProvider.address = new Address();
      expect(typeof(pipe.transform(testConsentProvider, 'address'))).toEqual('string');
    });
  });

  describe('Case "phone"', () => {
    it('should test for case "phone"', () => {
      testConsentProvider.phoneNumber = "1234567890";
      expect(pipe.transform(testConsentProvider, 'phone')).toEqual("1234567890");
    });

    it('should test with invalid ConsentProvider value', () => {
      testConsentProvider.phoneNumber = null;
      expect(pipe.transform(testConsentProvider, 'phone')).toBeNull();
    });

    it('should test for return type', () => {
      testConsentProvider.phoneNumber = "1234567890";
      expect(typeof(pipe.transform(testConsentProvider, 'phone'))).toEqual('string');
    });
  });
});
