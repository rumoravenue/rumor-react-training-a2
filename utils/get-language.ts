import response from './response.json' assert { "type": "json" };
import fs from 'fs';

const languageCodeSet = new Set(response.flatMap(country => Object.entries(country.languages || {})));
const languageCodes = Array.from(languageCodeSet);
const languageCodeObject = Object.fromEntries(languageCodes);


fs.writeFileSync('../country-dashboard/src/data/language-codes.json', JSON.stringify(languageCodeObject));