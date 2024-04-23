 export type Data ={
    name: { common: string };
    flags:{png:string,alt:string}
    population: number;
    region: string; 
    capital: string;
    currencies:{[key:string]:string}
}


 export type CountryDetailTypes ={
    name: { common: string };
    flags:{png:string,alt:string}
    population: number;
    region: string; 
    subregion:string
    capital: string;
    currencies:{[key:string]:string}
    languages:{eng:string}
}
