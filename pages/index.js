import react from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'

export default function Home() {
  const [data, setData] = useState(null);
  const [input,setInput] = useState('');
  const [toggle,setToggle] =useState('C');
  const [change,setChange ]=useState('')


useEffect(()=>{
  if(input.length !=0 || change.length!=0 ){
    const data =  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=${change}&appid=862fb3b2377be4d030aa6ff55806ab61`);
     data.then((val)=>{
      setData(val.data)
      console.log(val.data);
     })
  }
},[change])

  const handleSubmit =(e)=>{
    console.log(toggle)
    e.preventDefault();
    if(toggle=='C'){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=862fb3b2377be4d030aa6ff55806ab61`).then((val)=>{
        setData(val.data)
        console.log(val.data);
        setChange("metric")
  
    })
    }
    else if (toggle=='F'){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=imperial&appid=862fb3b2377be4d030aa6ff55806ab61`).then((val)=>{
        setData(val.data)
        console.log(val.data);
        setChange("metric")
  
    })
    }
    
  }
  const Convertcel = async ()=>{
    setToggle('C');
    if(change=='metric'){
      return 0;
    }
    else{
      setChange('metric');
      
    }
  }

  const Convertfel =async ()=>{
    setToggle('F');
    if(change=='imperial'){
      return 0;
    }
    else{
      setChange('imperial');
     
      }

  }


  return (
    <div class="wrapper">
      <div class="sidebar">
        <div>
          <form class="search" id="search">
            <input type="text" id="query" onChange={(e)=>{
              setInput(e.target.value)
            }}placeholder="Search..." value={input}/>
            <button onClick={handleSubmit}><i class="fas fa-search"></i></button>
          </form>
          <div class="weather-icon">
            <img id="icon" src="icons/sun/4.png" alt="" />
          </div>
          <div class="temperature">
            <h1 id="temp">{
              data && data.main.temp
            }</h1>
            <span class="temp-unit">°{toggle}</span>
          </div>
          <div class="date-time">
            <p id="date-time">Monday, 12:00</p>
          </div>
          <div class="divider"></div>
          <div class="condition-rain">
            <div class="condition">
              <i class="fas fa-cloud"></i>
              {/* <p id="condition">condition : {data && data.}</p> */}
            </div>
            <div class="rain">
              <i class="fas fa-tint"></i>
              {/* <p id="rain">perc - 0%</p> */}
            </div>
          </div>
        </div>
        <div class="location">
          <div class="location-icon">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <div class="location-text">
            <p id="location">Location:{data && data.name}</p>
          </div>
        </div>
      </div>
      <div class="main">
        <nav>
          <ul class="options">
            <button class="hourly">today</button>
            {/* <button class="week active">week</button> */}
          </ul>
          <ul class="options units">
            <button class={toggle=="C" ? "celcius active" : "celcius "  }onClick={Convertcel} >°C</button>
            <button class={toggle=="F"? "fahrenheit active" :"fahrenheit"}
               onClick={Convertfel}
            >°F</button>
          </ul>
        </nav>
        <div class="cards" id="weather-cards"></div>
        <div class="highlights">
          <h2 class="heading">today's highlights</h2>
          <div class="cards">
            <div class="card2">
              <h4 class="card-heading">weather</h4>
              <div class="content">
                <p class="uv-index">{data && data.weather[0].main}</p>
         
              </div>
            </div>
            <div class="card2">
              <h4 class="card-heading">Wind Status</h4>
              <div class="content">
                <p class="wind-speed">{data && data.wind.speed}</p>

              </div>
            </div>
            <div class="card2">
              <h4 class="card-heading">Sunrise & Sunset</h4>
              <div class="content">
                <p class="sun-rise">{data && data.sys.sunrise}</p>
                <p class="sun-set">{data && data.sys.sunset}</p>
              </div>
            </div>
            <div class="card2">
              <h4 class="card-heading">Humidity</h4>
              <div class="content">
                <p class="humidity">{data && data.main.humidity}</p>
               
              </div>
            </div>
            <div class="card2">
              <h4 class="card-heading">Visibility</h4>
              <div class="content">
                <p class="visibilty">{data && data.visibility}</p>
                
              </div>
            </div>
            <div class="card2">
              <h4 class="card-heading">Pressure</h4>
              <div class="content">
                <p class="air-quality">{data && data.main.pressure}</p>
              
              </div>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  )
}
