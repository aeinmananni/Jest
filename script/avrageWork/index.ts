import { BlockType } from "../../models";
import { BlockChaine } from "../blockChain";

/**
 *  دراین اسکریپت میخواهیم به کمک یک حلقه
 *  تعداد زیادی بلاک جدید میخواهیم اضافه کنیم
 *  وهر بلاک جدید که می سازیم محاسبه کنیم
 *  چه مدت زمانی طول کشیده تا این بلاک جدید ایجاد بشه
 *  وزمانی که این زمان را محاسبه کردم به ارایه  تایمز
 *  اضافه میشود و درنهایت میانگین تمام عناصری را که در این ارایه بوده اند
 * محاسبه میکنم
 *
 *
 *
 */

export const Avrage_function = () => {
  const blockChaineAvrage = BlockChaine();
  blockChaineAvrage.addBlock({ data: `Initail Data` });

  let prevTimeStamp: number,
    nextTimeStamp: number,
    nextBlock: BlockType,
    timeDiff: number,
    avrage: number;

  let times: number[] = [];

  for (let i = 0; i < 10000; i++) {
    const chain = blockChaineAvrage.getChain(); // ✅ یک بار می‌گیریم
    prevTimeStamp = chain[chain.length - 1]?.timeStamp;

    blockChaineAvrage.addBlock({ data: `DATA : ${i}` });

    const newChain = blockChaineAvrage.getChain();
    nextBlock = newChain[newChain.length - 1];
    nextTimeStamp = nextBlock?.timeStamp;

    timeDiff = nextTimeStamp - prevTimeStamp;
    times.push(timeDiff);

    avrage = times.reduce((total, num) => total + num, 0) / times.length;

    console.log(
      `Time To Mine Block : ${timeDiff}ms. Difficulty:${nextBlock?.difficulty}. Avrage time : ${avrage}ms`
    );
  }
};
