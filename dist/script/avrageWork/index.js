"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avrage_function = void 0;
const blockChain_1 = require("../blockChain");
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
const Avrage_function = () => {
    var _a;
    const blockChaineAvrage = (0, blockChain_1.BlockChaine)();
    blockChaineAvrage.addBlock({ data: `Initail Data` });
    let prevTimeStamp, nextTimeStamp, nextBlock, timeDiff, avrage;
    let times = [];
    for (let i = 0; i < 10000; i++) {
        const chain = blockChaineAvrage.getChain(); // ✅ یک بار می‌گیریم
        prevTimeStamp = (_a = chain[chain.length - 1]) === null || _a === void 0 ? void 0 : _a.timeStamp;
        blockChaineAvrage.addBlock({ data: `DATA : ${i}` });
        const newChain = blockChaineAvrage.getChain();
        nextBlock = newChain[newChain.length - 1];
        nextTimeStamp = nextBlock === null || nextBlock === void 0 ? void 0 : nextBlock.timeStamp;
        timeDiff = nextTimeStamp - prevTimeStamp;
        times.push(timeDiff);
        avrage = times.reduce((total, num) => total + num, 0) / times.length;
        console.log(`Time To Mine Block : ${timeDiff}ms. Difficulty:${nextBlock === null || nextBlock === void 0 ? void 0 : nextBlock.difficulty}. Avrage time : ${avrage}ms`);
    }
};
exports.Avrage_function = Avrage_function;
