import response from './response.json' assert { "type": "json" };
import fs from 'fs';

const currencyCodeSet = new Set(response.flatMap(country => Object.entries(country.currencies || {}).map(([code, currency]) => [code, currency.name])));
const currencyCodes = Array.from(currencyCodeSet);
const currencyCodeObject = Object.fromEntries(currencyCodes);

fs.writeFileSync('../country-dashboard/src/data/currency-codes.json', JSON.stringify(currencyCodeObject));