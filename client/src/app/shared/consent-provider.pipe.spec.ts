import {UtilityService} from "../shared/utility.service";
import {BrowserService} from "../core/browser.service";
import {DatePipe, Location} from "@angular/common";
import {Router} from "@angular/router";
import {ConsentProvider, FHIR_US_NPI_SYSTEM} from "./consent-provider.model";
import {ConsentProviderPipe} from "./consent-provider.pipe";
import {Identifier} from "./identifier.model";
import {Address} from "./address.model";

describe(' ConsentProviderPipe',()=>{
  let pipe;
  let utilityService: UtilityService;
  let location: Location;
  let router: Router;
  let datePipe: DatePipe;
  let browserService: BrowserService;
  let testConsentProvider: ConsentProvider;
  let testIdentifier1,testIdentifier2: Identifier;
  let testIdentifierArray : Identifier[];
  let address : Address;

  beforeEach(() => {
    utilityService = new UtilityService(location, router, datePipe, browserService);
    pipe = new ConsentProviderPipe(utilityService);
    testConsentProvider = new ConsentProvider();
    testIdentifier1 = new Identifier('FHIR_US_NPI_SYSTEM','test1 identifier value');
    testIdentifier2 = new Identifier('test2 system','test2 identifier value');
  });

  it('should test for case "npi"',()=>{
    testIdentifier1 = new Identifier('FHIR_US_NPI_SYSTEM','test1 identifier value');
    testIdentifier2 = new Identifier('test2 system','test2 identifier value');
    console.log(testIdentifier1.system);
    testIdentifierArray = [testIdentifier1,testIdentifier2];
    console.log(testIdentifierArray);
    console.log(testIdentifierArray[0].value,testIdentifierArray[0].system);

    testConsentProvider.identifiers = testIdentifierArray;
    console.log(testConsentProvider.identifiers[0].system);
    expect(pipe.transform(testConsentProvider,'npi')).toEqual("test name");
  });


  describe('should test for case "name"',()=>{
    it('should test for case ORGANIZATION',()=>{
      testConsentProvider.providerType = "ORGANIZATION";
      testConsentProvider.name = "test name";
      expect(pipe.transform(testConsentProvider,'name')).toEqual("test name");
    });

    it('should test for case PRACTITIONER',()=>{
      testConsentProvider.providerType = "PRACTITIONER";
      testConsentProvider.firstName = "firstName";
      testConsentProvider.middleName = "middleName";
      testConsentProvider.lastName = "lastName";
      expect(pipe.transform(testConsentProvider,'name')).toEqual("firstName middleName lastName");
    });
  });

  it('should test for case "address"',()=>{
    address = new Address();
    address.line1 = "line1";
    address.line2 = "line2";
    address.city = "city";
    address.state = "state";
    address.postalCode = "12345";
    address.country = "Country";
    testConsentProvider.address = address;
    expect(pipe.transform(testConsentProvider,'address')).toEqual("line1, line2, city, state, 12345, Country");
  });

  it('should test for case "phone"',()=>{
    testConsentProvider.phoneNumber = "1234567890"
    expect(pipe.transform(testConsentProvider,'phone')).toEqual("1234567890");
  });



});
