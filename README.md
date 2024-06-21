# PARSING DELLE DATE

https://www.npmjs.com/package/compromise
https://observablehq.com/@spencermountain/compromise-dates

import nlp from 'compromise'
import plg from 'compromise-dates'
nlp.plugin(plg)

nlp('june fifth').dates().json()

# ******************************\*******************************

const nlp = require('compromise');
const { parse, format, addHours } = require('date-fns');
const { it } = require('date-fns/locale');

const text = "Incontro con Bob il 1 giugno alle 11:45";

// Estrai la data usando una regex o nlp
const dateRegex = /(\d{1,2} \w+ alle \d{1,2}:\d{2})/i;
const match = text.match(dateRegex);

if (match) {
const dateStr = match[1];
const date = parse(dateStr, 'd MMMM alle HH:mm', new Date(), { locale: it });
const endDate = addHours(date, 1); // 1 ora di durata

console.log("Data e ora di inizio:", format(date, 'yyyy-MM-dd HH:mm:ss'));
console.log("Data e ora di fine:", format(endDate, 'yyyy-MM-dd HH:mm:ss'));
} else {
console.log("Nessuna data trovata nel testo.");
}

# ******************************\*******************************
