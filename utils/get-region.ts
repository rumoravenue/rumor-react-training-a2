import response from './response.json' assert { "type": "json" };
import fs from 'fs';

const regionSet = new Set(response.map(country => country.region));
const regions = Array.from(regionSet);


fs.writeFileSync('../country-dashboard/src/data/regions.json', JSON.stringify(regions));