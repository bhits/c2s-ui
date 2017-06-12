import {ProviderNamePipe} from "./provider-name.pipe";
import {FlattenedSmallProvider} from "../../shared/flattened-small-provider.model";

describe('ProviderNamePipe', () => {
  let pipe, testFlattenedSmallProvider;
  const INDIVIDUAL = 'Individual';
  const ORGANIZATION = 'Organization';
  var validArgType = INDIVIDUAL;
  var inValidArgType = 'unknownType';

  beforeEach(() => {
    pipe = new ProviderNamePipe();
    testFlattenedSmallProvider = new FlattenedSmallProvider();
    testFlattenedSmallProvider.organizationName = 'Test OrganizationName';
    testFlattenedSmallProvider.firstName = "TestFirstName";
    testFlattenedSmallProvider.lastName = "TestLastName";
  });

  it('should create an instance', () => {
    const pipe = new ProviderNamePipe();
    expect(pipe).toBeTruthy();
  });

  it('should be undefined with invalid value parameter', () => {
    expect(pipe.transform('', validArgType)).toBeUndefined();
    expect(pipe.transform('test', validArgType)).toBeUndefined();
    expect(pipe.transform(1, validArgType)).toBeUndefined();
    expect(pipe.transform(new Object(), validArgType)).toBeUndefined();
  });

  it('should transforms testFlattenedSmallProvider with Individual entityTpeDisplayName and invalid ArgType parameter to "TestFirstName TestLastName"', () => {
    testFlattenedSmallProvider.entityTypeDisplayName = INDIVIDUAL;
    expect(pipe.transform(testFlattenedSmallProvider, validArgType)).toEqual('TestFirstName TestLastName');
    expect(pipe.transform(testFlattenedSmallProvider, inValidArgType)).toEqual('TestFirstName TestLastName');
  });

  it('should transforms testFlattenedSmallProvider with Individual entityTpeDisplayName to "TestFirstName TestLastName"', () => {
    testFlattenedSmallProvider.entityTypeDisplayName = INDIVIDUAL;
    expect(pipe.transform(testFlattenedSmallProvider)).toEqual('TestFirstName TestLastName');
  });

  it('should transforms testFlattenedSmallProvider with Organization entityTpeDisplayName to "Test OrganizationName"', () => {
    testFlattenedSmallProvider.entityTypeDisplayName = ORGANIZATION;
    expect(pipe.transform(testFlattenedSmallProvider)).toEqual('Test OrganizationName');
  });
});
