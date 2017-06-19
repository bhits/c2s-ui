import {UsPhoneNumberPipe} from './us-phone-number.pipe';

describe('UsPhoneNumberPipe', () => {
  let pipe;
  const validUsPhoneNumber = '1234567890';
  const invalidUsPhoneNumberLess = '123456789';  // length less than 10;
  const invalidUsPhoneNumberMore = '12345678901';  // length more than 10;
  const invalidInputString = 'testString';  // length euqal 10;
  const invalidInputSymbol = '!@#$%^&*()';  // length equal 10;
  beforeEach(() => {
    pipe = new UsPhoneNumberPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should test for us-phone-number', () => {
    expect(pipe.transform(validUsPhoneNumber)).toEqual('(123) 456-7890');
    expect(pipe.transform(invalidUsPhoneNumberLess)).toEqual('123456789');
    expect(pipe.transform(invalidUsPhoneNumberMore)).toEqual('12345678901');
    expect(pipe.transform(invalidInputSymbol)).toEqual('!@#$%^&*()');
    expect(pipe.transform(invalidInputString)).toEqual('testString');
  });

  it('should test for us-phone-number return type',()=>{
    expect(typeof(pipe.transform(validUsPhoneNumber))).toEqual('string');
  });
});
