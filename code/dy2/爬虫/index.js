//引入模块
const request = require('request');
const fs = require('fs'); //文件模块
const jsdom = require('jsdom');

const {
    JSDOM
} = jsdom;

request('http://www.umei.cc/p/gaoqing/cn/', function (error, response, body) {

    //伪造window
    const {
        window
    } = new JSDOM(body);
    const $ = require("jquery")(window);

    let imgArr = [];
    let offset = 1;
    $("img").each((index, Element) => {
        let src = $(Element).attr('src');
        imgArr.push(src);
    })

    setInterval(() => {
        console.log(`正在下载第${offset + 1}图片,地址为：${imgArr[offset]}`);
        if (imgArr[offset].indexOf('http') >= 0) {
            if (imgArr[offset].indexOf('jpg') >= 0) {
                //fs.createWriteStream(path, [options]): 返回一个WriteStream（输出流）对象（可写流）
                //stream.pipe() 将此可写流添加到其目标集

                //这里是将索引图片添加到目标集对象 imgs 输出
                request(`${imgArr[offset]}`).pipe(fs.createWriteStream(`./imgs/${offset}.jpg`))
            } else if (imgArr[offset].indexOf('png') >= 0) {
                request(`${imgArr[offset]}`).pipe(fs.createWriteStream(`./imgs/${offset}.png`))
            } else if (imgArr[offset].indexOf('gif') >= 0) {
                request(`${imgArr[offset]}`).pipe(fs.createWriteStream(`./imgs/${offset}.gif`))
            } else {
                request(`${imgArr[offset]}`).pipe(fs.createWriteStream(`./imgs/${offset}.svg`))
            }
        } else if (imgArr[offset].indexOf('http') < 0) {
            if (imgArr[offset].indexOf('jpg') >= 0) {
                request(`http:${imgArr[offset]}`).pipe(fs.createWriteStream(`./imgs/${offset}.jpg`))
            } else if (imgArr[offset].indexOf('png') >= 0) {
                request(`http:${imgArr[offset]}`).pipe(fs.createWriteStream(`./imgs/${offset}.png`))
            } else if (imgArr[offset].indexOf('gif') >= 0) {
                request(`http:${imgArr[offset]}`).pipe(fs.createWriteStream(`./imgs/${offset}.gif`))
            } else {
                request(`http:${imgArr[offset]}`).pipe(fs.createWriteStream(`./imgs/${offset}.svg`))
            }
        }else if(imgArr[offset].indexOf('https') >= 0){
            if (imgArr[offset].indexOf('jpg') >= 0) {
                //fs.createWriteStream(path, [options]): 返回一个WriteStream（输出流）对象（可写流）
                //stream.pipe() 将此可写流添加到其目标集

                //这里是将索引图片添加到目标集对象 imgs 输出
                request(`${imgArr[offset]}`).pipe(fs.createWriteStream(`./imgs/${offset}.jpg`))
            } else if (imgArr[offset].indexOf('png') >= 0) {
                request(`${imgArr[offset]}`).pipe(fs.createWriteStream(`./imgs/${offset}.png`))
            } else if (imgArr[offset].indexOf('gif') >= 0) {
                request(`${imgArr[offset]}`).pipe(fs.createWriteStream(`./imgs/${offset}.gif`))
            } else {
                request(`${imgArr[offset]}`).pipe(fs.createWriteStream(`./imgs/${offset}.svg`))
            }
        }

        offset++;
    }, 1000);


});