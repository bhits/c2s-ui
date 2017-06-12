import {UsPhoneNumberPipe} from './us-phone-number.pipe';

describe('UsPhoneNumberPipe', () => {
  let pipe;
  const validUsPhoneNumber = '1234567890';
  const invalidUsPhoneNumberLess = '123456789';  // length less than 10;
  const invalidUsPhoneNumberMore = '12345678901';  // length more than 10;
  const invalidInputString = 'teststring';  // length euqal 10;
  const invalidInputSymbol = '!@#$%^&*()';  // length equal 10;
  beforeEach(() => {
    pipe = new UsPhoneNumberPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transforms "1234567890" to "(123) 456-7890"', () => {
    expect(pipe.transform(validUsPhoneNumber)).toEqual('(123) 456-7890');
  });

  it('should transforms "123456789" to "123456789"', () => {
    expect(pipe.transform(invalidUsPhoneNumberLess)).toEqual('123456789');
  });

  it('should transforms "12345678901" to "12345678901"', () => {
    expect(pipe.transform(invalidUsPhoneNumberMore)).toEqual('12345678901');
  });

  it('should transforms "teststring" to "teststring"', () => {
    expect(pipe.transform(invalidInputSymbol)).toBe('!@#$%^&*()');
  });

  it('should transforms "!@#$%^&*()" to "!@#$%^&*()"', () => {
    expect(pipe.transform(invalidInputSymbol)).toBe('!@#$%^&*()');
  });
});
