import { block } from '../script/block';
import { GENESIS } from '../config/genesis.config';
/**
 *   describe : میتوانیم دسته ای از بلاک هارا ایجاد کنیم
 *   it: با این بلاک میتوانیم تست های خودمان را بنویسیم
 *   expect: برسی رابرای ما انجام میدهد
 * 🔹 toBe:

از Object.is استفاده می‌کنه → یعنی مقایسه‌ی strict equality (===).

بیشتر برای primitive type‌ها (string, number, boolean, null, undefined) استفاده می‌شه.

همچنین برای این‌که مطمئن بشی دو مقدار دقیقا همون reference هستن.

-----------------------------------------------------------------------
to Equal :
    مقایسه‌ی deep equality انجام میده.
برای object و array کاربرد داره، چون فقط مقدارها رو بررسی می‌کنه نه reference.
 */

describe('BlockChain Test :', () => {
  const lastHash = 'Last_Hash';
  const hash = 'Hash';
  const difficulty = 3;
  const nonce = 0;
  const data = "jjjjjj";

  const data1 = block({
    lastHash,
    hash,
    data: data,
    difficulty,
    nonce,
  });

  // 1- خب حالا میخواهیم تست کنمی زمانی که بلاکی را ایجاد میکنیم خروجی برابر باشد با مقدار متغیر ها

  it('it hash timastamp,lasthash,hash,data Property', () => {
    expect(data1.lastHash).toEqual(lastHash);
    expect(data1.hash).toEqual(hash);
    expect(data1.data).toEqual(data);
  });
});

//----------------------------------------------------------------------------------
