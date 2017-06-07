import { UsPhoneNumberPipe } from './us-phone-number.pipe';

describe('SensitivityCategoryPipe', () => {
  let pipe;
  var validUsPhoneNumber = '1234567890';

  beforeEach(()=>{
    pipe = new UsPhoneNumberPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return format valid phone number, with input string with digits only and length of string should be 10',()=>{
    expect(pipe.transform('1234567890')).toBe('(123) 456-7890');
  });

  it('should not format if input string length not equal 10',()=>{
    expect(pipe.transform('123456789')).toBe('123456789');
    expect(pipe.transform('12345678901')).toBe('12345678901');
  });

  it('should not format if input string cant covert to number',()=>{
    expect(pipe.transform('teststring')).toBe('teststring');
    expect(pipe.transform('!@#$%^&*()')).toBe('!@#$%^&*()');
  });
});
