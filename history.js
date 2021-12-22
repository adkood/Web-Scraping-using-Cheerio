const request = require("request");
const cheerio = require("cheerio");
// const { text } = require("stream/consumers");
const pdfkit = require('pdfkit');
const fs=require('fs');
const path = require('path');
// const chalk = require('chalk');

const url = "https://en.wikipedia.org/wiki/A#History";


request(url, cb);
function cb(err, response, html) {
  if (err) console.log("error:", err);
  else extractHtml(html);
}

function extractHtml(html) {
  let $ = cheerio.load(html);
  let eleArr1 = $(".mw-parser-output>p:nth-child(17)");
  let eleArr2 = $(".mw-parser-output>p:nth-child(18)");
  let eleArr3 = $(".mw-parser-output>p:nth-child(19)");
  let eleArr4 = $(".mw-parser-output>p:nth-child(22)");
  let eleArr5 = $(".mw-parser-output>p:nth-child(24)");
  let eleArr6 = $(".mw-parser-output>p:nth-child(26)");
  let eleArr7 = $(".mw-parser-output>p:nth-child(27)");

  
  let text1 = $(eleArr1).text();
  let text2 = $(eleArr2).text();
  let text3 = $(eleArr3).text();
  let text4 = $(eleArr4).text();
  let text5 = $(eleArr5).text();
  let text6 = $(eleArr6).text();
  let text7 = $(eleArr7).text();
  
  // let eleArr8 = $(".mw-parser-output>h3:nth-child(20)");
  // let text8 = $(eleArr8).text();
  // let str = text1.concat(text2).concat(text3).concat(text4).concat(text5).concat(text6).concat(text7);
  
  let arr=[];
  arr.push(text1);
  arr.push(text2);
  arr.push(text3);
  arr.push(text4);
  arr.push(text5);
  arr.push(text6);
  arr.push(text7);


  let folderPath = path.join(__dirname , 'history-Info');
  dirCreater(folderPath);
  let filePath = path.join(folderPath , 'info.pdf');

  let text = JSON.stringify(arr);
  let pdfDoc = new pdfkit();
  pdfDoc.pipe(fs.createWriteStream(filePath));
  pdfDoc.text(text);
  pdfDoc.end();

  // fs.writeFileSync(filePath,);

}

function dirCreater(folderPath)
{
  if(fs.existsSync(folderPath) == false)
  {
    fs.mkdirSync(folderPath);
  }
}
