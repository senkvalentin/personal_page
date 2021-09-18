'use strict';

let inNum = document.getElementById('inNum');
let startB = document.getElementById('startB');
let output = document.getElementById('output');
let errormsg = document.getElementById('errormsg');

startB.onclick = function () {
    output.innerHTM = ' ';
    errormsg.innerHTML = ' ';
    if (steps(Number(inNum.value)) === false)  errormsg.innerHTML = 'Only positive numbers';
    else output.innerHTML = steps(Number(inNum.value));
};

function steps (n) {
    let addOutputs = n;
    let c = 0;
    if (n > 0 && Number.isInteger(n)) {
        while (n !== 1) {
            if (n % 2 === 0) {
                n = n/2;
                c++;
            } else if (n % 2 !== 0) {
                n = (n * 3) + 1;
                c++;
            }

            addOutputs += ' ' + n;
        }
        return c + '<div>' + addOutputs;
    } else return false;
}