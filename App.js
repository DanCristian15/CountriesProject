import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import ReactDOM, { findDOMNode } from 'react-dom'


import {FaChartBar } from 'react-icons/fa'


import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend} from "recharts";

const Country = ({country : {name, flag, population,capital,numericCode}}) => {
  return (
    <a href="#">
    <div className='country'>
      <div className='countryFlag'>
        <img src={flag} alt={name} />
      </div>
      <h3 className='country_name'>{name.toUpperCase()}</h3>
      <div className='country_text'>
        <div className='infos'>
          <span><b>Population:</b> </span>
          {population}
          <br></br><span><b>Capital:</b> </span>
          {capital}
          <br></br><span><b>Numeric code: </b></span>
          {numericCode}
        </div>
      </div>
    </div>
    </a>

    
  )
}



const App = (props) => {
  // setting initial state and method to update state

  
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  //console.log(data)
 
  

  

  const [name, setName] = useState('')
  const handleChange = (e) => {
    const value = e.target.value
    //console.log(value)
    setName(value)
    if(e.target.value != "") {
    document.getElementById("correctCountries").style.display = "block"
    console.log(e.target.value)
    }
    else 
    document.getElementById("correctCountries").style.display = "none"
    
    }
  

  //console.log(name);

  const fetchData = async () => {
    const url = 'https://restcountries.eu/rest/v2/all'
    try {
      const response = await fetch(url)
      const data = await response.json()
      setData(data)
      //console.log(data)
    } catch (error) {
    console.log(error)
    }
  }


  
  const orderedPopulation = data.sort( function (a,b) {
    return a.population - b.population;
  }) ;

  
  const firstTen = orderedPopulation.slice(240,250);

  const orderedName = data.sort(function(a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  });

  console.log(orderedName)

const corectCountries = data.filter(country => country.name.startsWith(name.charAt(0).toUpperCase()+name.slice(1)));


 

  return (
    <div className='App'>
      
     <div id='header'>
     <h1>World Countries Data</h1>
      <h2>Currently, we have {data.length} countries</h2>
      <h2 id="correctCountries">{corectCountries.length} satisfied the search criteria</h2>
      </div>

      <input id="searchbar" type="text" placeholder="Search country by name" onChange={handleChange}></input>

      <br></br><a href="#barchart"><i id="chartIcon"><FaChartBar /></i></a>
     
      <div>
{/* <p>There are {data.length} countries in the api</p> */}
        <div className='countries-wrapper'>
         
        {data.filter(country => country.name.startsWith(name.charAt(0).toUpperCase()+name.slice(1))).map(filteredCountries => (

      <Country country={filteredCountries} />
    
    
  ))}
        
        </div>
      </div>

      
      
      <BarChart id="barchart"
      width={1600}
      height={300}
      data={firstTen}
      margin={{
        top: 5,
        right: 30,
        left: 30,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="population" fill="#8884d8" />
     
    </BarChart>
      
    </div>

    
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)


export default App;