import { UsPhoneNumberPipe } from './us-phone-number.pipe';

describe('SensitivityCategoryPipe', () => {
  let pipe;
  const validUsPhoneNumber = '1234567890';
  const invalidUsPhoneNumberLess =  '123456789';  // length less than 10;
  const invalidUsPhoneNumberMore =  '12345678901';  // length more than 10;
  const invalidInputString =  'teststring';  // length 10;
  const invalidInputSymbol =  '!@#$%^&*()';  // length 10;
  beforeEach(()=>{
    pipe = new UsPhoneNumberPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return format valid phone number, with input string with digits only and length of string should be 10',()=>{
    expect(pipe.transform(validUsPhoneNumber)).toBe('(123) 456-7890');
  });

  it('should not format if input string length not equal 10',()=>{
    expect(pipe.transform(invalidUsPhoneNumberLess)).toBe('123456789');
    expect(pipe.transform(invalidUsPhoneNumberMore)).toBe('12345678901');
  });

  it('should not format if input string cant covert to number',()=>{
    expect(pipe.transform(invalidInputString)).toBe('teststring');
    expect(pipe.transform(invalidInputSymbol)).toBe('!@#$%^&*()');
  });
});
