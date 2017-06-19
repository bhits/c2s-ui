import {ConsentStagePipe} from "./consent-stage.pipe";

describe('ConsentStagePipe', () => {
  let pipe;
  const SIGNED = 'SIGNED';
  const SAVED = 'SAVED';
  const REVOKED = 'REVOKED';
  const TEXT = 'text';
  const ICON = 'icon';
  const COLOR = 'color';
  var validValue = 'SIGNED';
  var validArgType = 'text';
  var invalidValueString = 'testValue';
  var invalidValueNumber = 1;
  var inValidValueObject = new Object();
  var inValidArgType = 'invalidArgType';

  beforeEach(() => {
    pipe = new ConsentStagePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  // test wrong value
  it('should be undefined with invalid value parameter', () => {
    expect(pipe.transform(invalidValueString, validArgType)).toBeUndefined();
    expect(pipe.transform(invalidValueNumber, validArgType)).toBeUndefined();
    expect(pipe.transform(inValidValueObject, validArgType)).toBeUndefined();
    expect(pipe.transform('', validArgType)).toBeUndefined();
    expect(pipe.transform(null, validArgType)).toBeUndefined();
  });

  it('should be undefined with invalid argType parameter', () => {
    expect(pipe.transform(validValue, inValidArgType)).toBeUndefined();
    expect(pipe.transform(validValue, null)).toBeUndefined();
    expect(pipe.transform(validValue, '')).toBeUndefined();
  });

  it('should test for consentStage "SAVED"', () => {
    expect(pipe.transform(SAVED, TEXT)).toEqual('CONSENTS.CARD.CONSENT_SAVE_STAGE.IN_PROGRESS');
    expect(pipe.transform(SAVED, ICON)).toEqual('edit');
    expect(pipe.transform(SAVED, COLOR)).toEqual('accent');
  });

  it('should test for consentStage "SIGNED"', () => {
    expect(pipe.transform(SIGNED, TEXT)).toEqual('CONSENTS.CARD.CONSENT_SIGNED_STAGE.SIGNED');
    expect(pipe.transform(SIGNED, ICON)).toEqual('check_circle');
    expect(pipe.transform(SIGNED, COLOR)).toEqual('primary');
  });

  it('should test for consentStage "REVOKED"', () => {
    expect(pipe.transform(REVOKED, TEXT)).toEqual('CONSENTS.CARD.CONSENT_REVOKED_STAGE.REVOKED');
    expect(pipe.transform(REVOKED, ICON)).toEqual('cancel');
    expect(pipe.transform(REVOKED, COLOR)).toEqual('warn');
  });
});
