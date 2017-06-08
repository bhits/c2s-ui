import {ProviderNamePipe} from "./provider-name.pipe";
import {FlattenedSmallProvider} from "../../shared/flattened-small-provider.model";

describe('ProviderNamePipe', () => {
  let pipe,testFlattenedSmallProvider;
  const INDIVIDUAL = 'Individual';
  const ORGANIZATION = 'Organization';
  var validArgType = INDIVIDUAL;
  var inValidArgType = 'unknownType';

  beforeEach(()=>{
    pipe = new ProviderNamePipe();
    testFlattenedSmallProvider = new FlattenedSmallProvider();
    testFlattenedSmallProvider.organizationName = 'TestOrganizationName';
    testFlattenedSmallProvider.firstName = "TestFirstName";
    testFlattenedSmallProvider.lastName = "TestLastName";
  });

  it('should create an instance', () => {
    const pipe = new ProviderNamePipe();
    expect(pipe).toBeTruthy();
  });

  it('should undefined with input invalid value',()=>{
    expect(pipe.transform('',validArgType)).toBeUndefined();
    expect(pipe.transform('test',validArgType)).toBeUndefined();
    expect(pipe.transform(1,validArgType)).toBeUndefined();
    expect(pipe.transform(new Object(),validArgType)).toBeUndefined();
  });

  it('should defined with validArgType and invalidArgType function not depends on ArgType',()=>{
    testFlattenedSmallProvider.entityTypeDisplayName = INDIVIDUAL;
    expect(pipe.transform(testFlattenedSmallProvider,validArgType)).toBeDefined();
    expect(pipe.transform(testFlattenedSmallProvider,inValidArgType)).toBeDefined();
  });

  it('should get expect from transform with entityTypeDisplayName Individual',()=>{
    testFlattenedSmallProvider.entityTypeDisplayName = INDIVIDUAL;
    expect(pipe.transform(testFlattenedSmallProvider)).toBe('TestFirstName TestLastName');
  });

  it('should get expect from transform with entityTypeDisplayName Organization',()=>{
    testFlattenedSmallProvider.entityTypeDisplayName = ORGANIZATION;
    expect(pipe.transform(testFlattenedSmallProvider)).toBe('TestOrganizationName');
  });
});
