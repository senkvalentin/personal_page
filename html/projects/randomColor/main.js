'use strict';

document.title = 'Random Color';
var colorName1 = document.getElementById('colorName1');
var colorName2 = document.getElementById('colorName2');
var colorName1Show = document.getElementById('colorName1Show');
var colorName2Show = document.getElementById('colorName2Show');
var info = document.getElementById('info');
var change = document.getElementById('change');
output();

change.onclick = function () {
    output();
    document.getElementById('audioClick').play();
};

function generateRandomColor () {
    return '#'+ Math.floor(Math.random()*16777215).toString(16);
}

function toRgb (stringHex, getCompl, getBackHex) {
    var chars = stringHex.split('');
    if (getCompl) {
        if(getBackHex){
            return '#'+ (255-(parseInt(chars[1]+chars[2], 16))).toString(16)+(255-(parseInt(chars[3]+chars[4], 16))).toString(16)+(255-(parseInt(chars[5]+chars[6], 16))).toString(16);
        }else return 'rgb('+ (255-(parseInt(chars[1]+chars[2], 16)))+', '+(255-(parseInt(chars[3]+chars[4], 16)))+', '+(255-(parseInt(chars[5]+chars[6], 16)))+')';
    } else  return 'rgb('+ parseInt(chars[1]+chars[2], 16)+', '+parseInt(chars[3]+chars[4], 16)+', '+parseInt(chars[5]+chars[6], 16)+')';
}

function toHex (numb) {
    return numb.toString(16);
}

function output () {
    let r = generateRandomColor();
    // document.body.style.backgroundColor = r;
    // change.style.backgroundColor = r;
    // info.style.backgroundColor = toRgb(r, true);
    colorName1.innerText = r + '\n' + toRgb(r, false, false);
    colorName1Show.style.backgroundColor = r;
    colorName2.innerText = toRgb(r, true, true) + '\n' +toRgb(r, true, false);
    colorName2Show.style.backgroundColor = toRgb(r, true, true);
}