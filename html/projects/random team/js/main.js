/*
Project: CSGO Random Team
Author:  Valentin Senk
Date:    26.  07. 2021
*/
'use strict';

//-------------------------
//get the html elements from .html
const output2 = document.getElementById('output2');
const tItem = document.getElementById('t-item');
const ctItem = document.getElementById('ct-item');
const inName = document.getElementById('inName');
const msgInName = document.getElementById('msgInName');
const btnHinzu = document.getElementById('btnHinzu');
const btnClear = document.getElementById('btnClear');
const btnRandom = document.getElementById('btnRandom');

//making a new array
let player = [];
let playerT = ' ';
let playerCT = ' ';
let outputPlayer = [' ', 0];

inName.value = '';
//onclick buttons
btnHinzu.onclick = function (){
  if(inName.value === ''){
    msgInName.innerHTML = 'Darf nicht leer sein! ';
  }  else {
    outputPlayer[1]++;
    player.push(inName.value);
    outputPlayer[0] += 'Player ' + outputPlayer[1] + ': ' + player[player.length-1] + '<div>';
    output2.innerHTML = outputPlayer[0];
    inName.value = '';
    msgInName.innerHTML = ' ';
  }
};

btnClear.onclick = function (){
  output2.innerHTML = '';
  tItem.innerHTML = '';
  ctItem.innerHTML = '';
  inName.value = '';
  msgInName.innerHTML = ' ';
  outputPlayer = [' ', 0];
  playerT = ' ';
  playerCT = ' ';
  player = [];
};

btnRandom.onclick = function (){
  output2.innerHTML = outputPlayer[1] + ' Players';
  playerToRandTeam ();
};

function playerToRandTeam () {
  tItem.innerHTML = '';
  ctItem.innerHTML = '';
  playerT = ' ';
  playerCT = ' ';
  let allPlayer = 0;
  let playerCountT = 1;
  let playerCountCT = 1;
  let clonePlayer = [...player];
  let isActiveT = true;
  while (allPlayer < player.length) {
    let randIndex = Math.floor(Math.random() * clonePlayer.length);
    let randomElement = clonePlayer[randIndex];
    clonePlayer.splice(randIndex, 1);
    if (isActiveT === true) {
      playerT += playerCountT + '. ' + randomElement + '<div>';
      playerCountT++;
      isActiveT = false;
    } else {
      playerCT += playerCountCT + '. ' + randomElement+ '<div>';
      playerCountCT++;
      isActiveT = true;
    }
    allPlayer++;
  }
  tItem.innerHTML = playerT;
  ctItem.innerHTML = playerCT;
}