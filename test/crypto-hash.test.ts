import { CryptohashFunction } from '../utils/CryptoHash';
// تست های این تابع
describe('CryptoHash', () => {
  const hash1 = CryptohashFunction('Hello', '123');
  const hash2 = CryptohashFunction('Hello', '123');
  //وقتی ورودی مشخصی می‌دی، باید همیشه هش ثابتی برگردونه
  it('When you specify input, it should always return a consistent hash.', () => {
    expect(hash1).toBe(hash2);
  });
  //-----------------------------------------------
  //تغییر کوچک در ورودی باید هش متفاوتی بده
  const hash3 = CryptohashFunction('Hello');
  const hash4 = CryptohashFunction('Hello!');
  it('returns different hashes for different inputs', () => {
    expect(hash3).not.toBe(hash4);
  });

  //-----------------------------------------------------------------
  //چک کن وقتی هیچ ورودی داده نمی‌شه، تابع خروجی معتبر بده
  const defaultOutputHash = CryptohashFunction();
  it('handles empty input', () => {
    expect(typeof defaultOutputHash).toBe('string');
  });

  //-----------------------------------------
  //آبجکت ورودی باید قابل هش باشه و تغییر کلیدها خروجی رو عوض کنه
  const obj1 = CryptohashFunction({ a: 1, b: 2 });
  const obj2 = CryptohashFunction({ a: 1, b: 3 });
  it('hashes objects correctly', () => {
    expect(obj1).not.toBe(obj2);
  });

  //-------------------------------------------
  //   همیشه باید string برگردونه
  const alwaysReturnString = CryptohashFunction(true, 99, { a: 10 });
  it('always returns a string', () => {
    expect(typeof alwaysReturnString).toBe('string');
  });

  //--------------------------------------------------------------
  //باید ترکیب ورودی‌ها رو درست در نظر بگیره.
  const input1 = CryptohashFunction('a', 'b', 'c');
  const input2 = CryptohashFunction('a', 'b', 'c');

  it('multiple inputs are combined consistently', () => {
    expect(input1).toBe(input2);
  });
});
