import { exit } from "process";
import { Haus } from "./haus";
import { parseArgumentsToNumber } from "./number-parser";
import { Human } from "./owner";

const args: string[] = process.argv.slice(2);

if (args.length < 2) {
    console.error('please provide at least 2 numbers!')
    exit(1);
}

const numbers = parseArgumentsToNumber(args);
const result = numbers.reduce((prev, curr) => prev + curr);

console.log(`Result = ${result}`);

/*
const vali = new Human('Valentin Senk');
const senkHaus = new Haus('red', 'Himmelberg', vali);

const hinkel = new Human('Markus Hinkel');
const hinkelHaus = new Haus('blue', 'Wien', hinkel);

senkHaus.ring();

senkHaus.enterHome(vali);

senkHaus.ring();

senkHaus.rightNeighbour = hinkelHaus;

console.log(senkHaus);
*/