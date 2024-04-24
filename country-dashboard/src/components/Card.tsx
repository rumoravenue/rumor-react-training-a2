import React from 'react'
// import countries from './data/countries.json';

function Card(props:any) {
    // const countryFlag=countries.map((item)=>{
    //     return(
            
    //     )
    // })
  return (
    <div key ={props.currency}  className="card--ui">
        <div className="card-flag">
            <img src={props.imgurl} alt="Country Flag" />
        </div>
        <div className="card-text">
            <h5 className='state-name'> {props.countryname}</h5>
            <span>Population : {props.population}</span>
            <span>Region : {props.region}</span>
            <span>Capital : {props.capital}</span>
            <span>Currency : {props.currency}</span>
        </div>
    </div>
  )
}

export default Card