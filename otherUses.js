const request = require('request');
const cheerio = require('cheerio');
const { text } = require("stream/consumers");

const fs = require('fs');
const path = require('path');

const pdfkit = require('pdfkit');

let url = "https://en.wikipedia.org/wiki/A#Other_uses";

request(url , cb);
function cb(err,response,html)
{
    if(err)
    {
        console.log(err);    
    }
    else
    {
        extractHtml(html);
    }
}

function extractHtml(html)
{
    let $ = cheerio.load(html);
    let heading = $(".mw-parser-output>h2:nth-child(42)");
    let eleArr1 = $(".mw-parser-output>p:nth-child(45)");
    let eleArr2 = $(".mw-parser-output>p:nth-child(46)");
    let eleArr3 = $(".mw-parser-output>p:nth-child(47)");
    let eleArr4 = $(".mw-parser-output>p:nth-child(48)");
    let eleArr5 = $(".mw-parser-output>p:nth-child(49)");
    let eleArr6 = $(".mw-parser-output>p:nth-child(50)");
    
    let text1 = $(eleArr1).text(); 
    let text2 = $(eleArr2).text();
    let text3 = $(eleArr3).text();
    let text4 = $(eleArr4).text();
    let text5 = $(eleArr5).text();
    let text6 = $(eleArr6).text();
    let headtext = $(heading).text();
    

 // -----------------------for TXT file-----------------------------------------------   
    
    let arr = headtext+"\n"+text1+text2+text3+text4+text5+text6;

    if(!fs.existsSync('./otherUses.txt'))
    {
        fs.writeFileSync('./otherUses.txt',arr);
    }
} 



//----------------------------FOR PDF------------------------------------------------------------
// let arr=[];
// arr.push(text1);
// arr.push(text2);
// arr.push(text3);
// arr.push(text4);
// arr.push(text5);
// arr.push(text6);
//     let folderPath = path.join(__dirname , 'OtherUses-info');
//     dirCreater(folderPath);
//     let filePath = path.join(folderPath , 'info.pdf');
//     let text = JSON.stringify(arr);

//     let pdfDoc = new pdfkit();
//     pdfDoc.pipe(fs.createWriteStream(filePath));
//     pdfDoc.text(text);
//     pdfDoc.end();

//     // fs.writeFileSync(filePath,);

// }

// function dirCreater(folderPath)
// {
//     if(fs.existsSync(folderPath) == false)
//     {
//         fs.mkdirSync(folderPath);
//     }
// }


