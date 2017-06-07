import {ConsentStagePipe} from "./consent-stage.pipe";


describe('ConsentStagePipe', () => {
  let pipe;

  beforeEach(()=>{
    pipe = new ConsentStagePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('check transform with null value to be undefined', () => {
    expect(pipe.transform(null)).toBeUndefined();
  });
  it('check transform without argType to be undefined', () => {
    expect(pipe.transform('')).toBeUndefined();
    expect(pipe.transform('SIGNED')).toBeUndefined();
  });

  it('check transform with vaild value, and argType with icon/text/color to be defined', () => {
    expect(pipe.transform('SIGNED','text')).toBeDefined();
    expect(pipe.transform('SIGNED','icon')).toBeDefined();
    expect(pipe.transform('SIGNED','color')).toBeDefined();
  });

  it('check transform with SAVED value', () => {
    expect(pipe.transform('SAVED','text')).toBe('CONSENTS.CARD.CONSENT_SAVE_STAGE.IN_PROGRESS');
    expect(pipe.transform('SAVED','icon')).toBe('edit');
    expect(pipe.transform('SAVED','color')).toBe('accent');
  });

  it('check transform with SIGNED value', () => {
    expect(pipe.transform('SIGNED','text')).toBe('CONSENTS.CARD.CONSENT_SIGNED_STAGE.SIGNED');
    expect(pipe.transform('SIGNED','icon')).toBe('check_circle');
    expect(pipe.transform('SIGNED','color')).toBe('primary');
  });

  it('check transform with REVOKED value', () => {
    expect(pipe.transform('REVOKED','text')).toBe('CONSENTS.CARD.CONSENT_REVOKED_STAGE.REVOKED');
    expect(pipe.transform('REVOKED','icon')).toBe('cancel');
    expect(pipe.transform('REVOKED','color')).toBe('warn');
  });

});
