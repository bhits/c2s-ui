import {SensitivityCategoryPipe} from "./sensitivity-category.pipe";
import {Identifier} from "../../shared/identifier.model";

describe('SensitivityCategoryPipe', () => {
  let pipe,testShareSensitivityCategory, testIdentifier;
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

  beforeEach(()=>{
    pipe = new SensitivityCategoryPipe();
    testIdentifier = new Identifier('System Test','Value Test');
    testShareSensitivityCategory = {description: 'Description Test',
      display: 'Display Test',
      id: 1,
      identifier: testIdentifier};
    validValue = testShareSensitivityCategory;
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should to be undefined to input null value',()=>{
    expect(pipe.transform(null)).toBeUndefined();
  });

  it('should to be undefined when miss value',()=>{
    expect(pipe.transform()).toBeUndefined();
  });

  it('should to be undefined when miss argType',()=>{
    expect(pipe.transform(validValue)).toBeUndefined();
    expect(pipe.transform(validValue,validArgType)).toBeDefined();
  });

  it('should to be undefined to input invalid value',()=>{
    expect(pipe.transform('',validArgType)).toBeUndefined();
    expect(pipe.transform(null,inValidArgType)).toBeUndefined();
    expect(pipe.transform(invalidValueString,validArgType)).toBeUndefined();
    expect(pipe.transform(invalidValueNumber,validArgType)).toBeUndefined();
    expect(pipe.transform(inValidValueObject,validArgType)).toBeUndefined();
  });

  it('should undefined when input unknown argType',()=>{
    expect(pipe.transform(validValue,'')).toBeUndefined();
    expect(pipe.transform(validValue,null)).toBeUndefined();
    expect(pipe.transform(validValue,inValidArgType)).toBeUndefined();
  });

  it('should be defined with transform valid value, and argType with display/description/system/value', () => {
    expect(pipe.transform(validValue,DISPLAY)).toBeDefined();
    expect(pipe.transform(validValue,DESCRIPTION)).toBeDefined();
    expect(pipe.transform(validValue,SYSTEM)).toBeDefined();
    expect(pipe.transform(validValue,VALUE)).toBeDefined();
  });

  it('should be defined with transform valid argType and valid value', () => {
    expect(pipe.transform(validValue,validArgType)).toBeDefined();
  });

  it('should to get expect from pipe transform with valid value and valid argType', () => {
    expect(pipe.transform(validValue,DISPLAY)).toBe('Display Test');
    expect(pipe.transform(validValue,DESCRIPTION)).toBe('Description Test');
    expect(pipe.transform(validValue,SYSTEM)).toBe('System Test');
    expect(pipe.transform(validValue,VALUE)).toBe('Value Test');
  });
});
