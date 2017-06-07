import {ConsentStagePipe} from "./consent-stage.pipe";

describe('ConsentStagePipe', () => {
  let pipe;
  const SIGNED = 'SIGNED';
  const SAVED = 'SAVED';
  const REVOKED ='REVOKED';
  const TEXT = 'text';
  const ICON = 'icon';
  const COLOR = 'color';
  var validValue ='SIGNED';
  var validArgType = 'text';
  var invalidValueString = 'testValue';
  var invalidValueNumber = 1;
  var inValidValueObject = new Object();
  var inValidArgType = 'invalidArgType';

  beforeEach(()=>{
    pipe = new ConsentStagePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should to be undefined to input null value', () => {
    expect(pipe.transform(null)).toBeUndefined();
  });
  // test wrong value
  it('should to be undefined with input invalid value',()=>{
    expect(pipe.transform(invalidValueString,validArgType)).toBeUndefined();
    expect(pipe.transform(invalidValueNumber,validArgType)).toBeUndefined();
    expect(pipe.transform(inValidValueObject,validArgType)).toBeUndefined();
    expect(pipe.transform('',validArgType)).toBeUndefined();
    expect(pipe.transform(null,validArgType)).toBeUndefined();
  });

  it('should to be undefined with input invalid argType', () => {
    expect(pipe.transform(validValue,inValidArgType)).toBeUndefined();
    expect(pipe.transform(validValue,null)).toBeUndefined();
    expect(pipe.transform(validValue,'')).toBeUndefined();
  });

  it('should to transform with valid value, and argType with icon/text/color to be defined', () => {
    expect(pipe.transform(validValue,TEXT)).toBeDefined();
    expect(pipe.transform(validValue,ICON)).toBeDefined();
    expect(pipe.transform(validValue,COLOR)).toBeDefined();
  });

  it('should to transform with valid argType with SAVAED/SIGNED/REVOKED value to be defined', () => {
    expect(pipe.transform(SAVED,validArgType)).toBeDefined();
    expect(pipe.transform(SIGNED,validArgType)).toBeDefined();
    expect(pipe.transform(REVOKED,validArgType)).toBeDefined();
  });

  it('should to transform with SAVED value', () => {
    expect(pipe.transform('SAVED','text')).toBe('CONSENTS.CARD.CONSENT_SAVE_STAGE.IN_PROGRESS');
    expect(pipe.transform('SAVED','icon')).toBe('edit');
    expect(pipe.transform('SAVED','color')).toBe('accent');
  });

  it('should to transform with SIGNED value', () => {
    expect(pipe.transform('SIGNED','text')).toBe('CONSENTS.CARD.CONSENT_SIGNED_STAGE.SIGNED');
    expect(pipe.transform('SIGNED','icon')).toBe('check_circle');
    expect(pipe.transform('SIGNED','color')).toBe('primary');
  });

  it('should to transform with REVOKED value', () => {
    expect(pipe.transform('REVOKED','text')).toBe('CONSENTS.CARD.CONSENT_REVOKED_STAGE.REVOKED');
    expect(pipe.transform('REVOKED','icon')).toBe('cancel');
    expect(pipe.transform('REVOKED','color')).toBe('warn');
  });
});
