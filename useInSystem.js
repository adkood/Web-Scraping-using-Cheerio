const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const pdfkit = require('pdfkit');

let url = "https://en.wikipedia.org/wiki/A#Use_in_writing_systems";

request(url, cb);
function cb(err, response, html) {
  if (err) {
    console.log(err);
  } else {
    extractHtml(html);
  }
}

function extractHtml(html) {
  let $ = cheerio.load(html);
  let heading = $(".mw-parser-output>h2:nth-child(28)");
  let heading1 = $(".mw-parser-output>h3:nth-child(30)");
  let eleArr2 = $(".mw-parser-output>p:nth-child(33)");
  let eleArr3 = $(".mw-parser-output>ul:nth-child(34)");
  let eleArr4 = $(".mw-parser-output>p:nth-child(35)");
  let eleArr5 = $(".mw-parser-output>p:nth-child(36)");
  let heading2 = $(".mw-parser-output>h3:nth-child(37)");
  let eleArr6 = $(".mw-parser-output>p:nth-child(38)");
  let heading3 = $(".mw-parser-output>h3:nth-child(39)");
  let eleArr7 = $(".mw-parser-output>p:nth-child(40)");
  let eleArr8 = $(".mw-parser-output>ul:nth-child(41)");

  let text2 = $(eleArr2).text();
  let text3 = $(eleArr3).text();
  let text4 = $(eleArr4).text();
  let text5 = $(eleArr5).text();
  let text6 = $(eleArr6).text();
  let text7 = $(eleArr7).text();
  let text8 = $(eleArr8).text();
  
  //   let headtext = $(heading).text();
  //   let head1text = $(heading1).text();
  //   let head2text = $(heading2).text();
  //   let head3text = $(heading3).text();
  //   arr.push(JSON.stringify(head2text));
  //   arr.push(JSON.stringify(heading3));
  //   arr.push(JSON.stringify(headtext));
  //   arr.push(JSON.stringify(head1text));
  
  let arr = [];
  arr.push(text2);
  arr.push(text3);
  arr.push(text4);
  arr.push(text5);
  arr.push(text6);
  arr.push(text7);

  let folderPath = path.join(__dirname, "useInSystem-Info");
  dirCreater(folderPath);
  let filePath = path.join(folderPath, "info.pdf");

  let text = JSON.stringify(arr);
  let pdfDoc = new pdfkit();
  pdfDoc.pipe(fs.createWriteStream(filePath));
  pdfDoc.text(text);
  pdfDoc.end();

  // fs.writeFileSync(filePath,);
}

function dirCreater(folderPath) {
  if (fs.existsSync(folderPath) == false) {
    fs.mkdirSync(folderPath);
  }
}
