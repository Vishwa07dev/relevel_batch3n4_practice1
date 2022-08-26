const { default: mongoose } = require("mongoose");
// const uuid = require("uuid");
// const constants = require("./utils/constants");
// const languageDetect = require("i18next-browser-languagedetector");
// console.log(languageDetect.LanguageDetector());
// const i18n = require("i18n");
// const i18nextMiddleware = require("i18next-express-middleware");
// const Backend = require("i18next-node-fs-backend");
// const LanguageDetect = require("languagedetect");
// i18next.use(LanguageDetect("This is it"));
// // import LanguageDetector from "i18next-browser-languagedetector";

// i18next.use(LanguageDetector).init(i18nextOptions);
// console.log(LanguageDetector);
// console.log(global.i18n.detectLanguage("English is it"));
// function onLanguageDetected(langInfo) {
//   for (const lang of langInfo.languages) {
//     console.log(`Language is: ${lang.language}`);
//     console.log(`Percentage is: ${lang.percentage}`);
//   }
// }

// let text = "L'homme est né libre, et partout il est dans les fers.";

// let detecting = i18n.detectLanguage(text);
// detecting.then(onLanguageDetected);
// let isEnglish = require("is-english");
// // const { vulgarityCheck } = require("./utils/constants");
// const improperWords = require("./dirtyWord");
// const { vulgarityCheck } = require("./utils/constants");
// let gramma = require("gramma");
// console.log(isEnglish("what do you again"));
// console.log("Waddyi[");
// let string =
//   "When you say user id, are you talkingabout a public id such as an username, or a database id?If you are talking about a database id, go for a GUID/UUID. T-sql for example have the NEWID()";
// // async function trial() {
// // let ans = await gramma.check();
// // console.log(ans);
// // }
// // trial();

// let array = [
//   { name: "A", age: 10, company: "N" },
//   { name: "B", age: 22, company: "Al" },
//   { name: "K", age: 25, company: "S" },
//   { name: "jab", age: 12, company: "Ya" },
//   { name: "R", age: 35, company: "ba" },
//   { name: "ka", age: 40, company: "Ra" },
// ];

// function trial(array) {
//   let obj = [];
//   let filteredArray = array.filter((element) => {
//     return element.age == 22;
//   });
//   console.log(filteredArray);
//   filteredArray.forEach((element) => {
//     obj.push({
//       name: element.name,
//       age: element.age,
//       company: element.company,
//     });
//   });
//   console.log(obj);
// }

// trial(array);
