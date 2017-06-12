import {SensitivityCategoryPipe} from "./sensitivity-category.pipe";
import {Identifier} from "../../shared/identifier.model";

describe('SensitivityCategoryPipe', () => {
  let pipe, testShareSensitivityCategory, testIdentifier;
  const DISPLAY = 'display';
  const DESCRIPTION = 'description';
  const SYSTEM = 'system';
  const VALUE = 'value';
  var validValue;
  var validArgType = DISPLAY;
  var invalidValueString = 'testValue';
  var invalidValueNumber = 1;
  var inValidValueObject = new Object();
  var inValidArgType = 'invalidArgType';

  beforeEach(() => {
    pipe = new SensitivityCategoryPipe();
    testIdentifier = new Identifier('System Test', 'Value Test');
    testShareSensitivityCategory = {
      description: 'Description Test',
      display: 'Display Test',
      id: 1,
      identifier: testIdentifier
    };
    validValue = testShareSensitivityCategory;
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be undefined with null value parameter', () => {
    expect(pipe.transform(null)).toBeUndefined();
  });

  it('should be undefined without value parameter', () => {
    expect(pipe.transform()).toBeUndefined();
  });

  it('should be undefined without argType parameter', () => {
    expect(pipe.transform(validValue)).toBeUndefined();
    expect(pipe.transform(validValue, validArgType)).toBeDefined();
  });

  it('should be undefined with invalid value parameter', () => {
    expect(pipe.transform('', validArgType)).toBeUndefined();
    expect(pipe.transform(null, inValidArgType)).toBeUndefined();
    expect(pipe.transform(invalidValueString, validArgType)).toBeUndefined();
    expect(pipe.transform(invalidValueNumber, validArgType)).toBeUndefined();
    expect(pipe.transform(inValidValueObject, validArgType)).toBeUndefined();
  });

  it('should be undefined when argType equals "invalidArgType"', () => {
    expect(pipe.transform(validValue, inValidArgType)).toBeUndefined();
  });

  it('should be undefined when argType equals null', () => {
    expect(pipe.transform(validValue, null)).toBeUndefined();
  });

  it('should be undefined when argType equals ""', () => {
    expect(pipe.transform(validValue, '')).toBeUndefined();
  });

  it('should transforms "testShareSensitivityCategory,display" to "Display Test"', () => {
    expect(pipe.transform(validValue, DISPLAY)).toEqual('Display Test');
  });

  it('should transforms "testShareSensitivityCategory,description Test" to "Description Test"', () => {
    expect(pipe.transform(validValue, DESCRIPTION)).toEqual('Description Test');
  });

  it('should transforms "testShareSensitivityCategory,system" to "System Test"', () => {
    expect(pipe.transform(validValue, SYSTEM)).toEqual('System Test');
  });

  it('should transforms "testShareSensitivityCategory,value" to "System Test"', () => {
    expect(pipe.transform(validValue, VALUE)).toEqual('Value Test');
  });

});
