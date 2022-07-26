import money from './img/money.png';
import './App.css';
import CurrencyComponents from './components/CurrencyComponent';
import { useEffect, useState } from 'react';

function App() {
  const url = `https://api.exchangerate-api.com/v4/latest/usd`

  const [currencyChoice,setCurrencyChoice] = useState([])
  useEffect(()=>{
    fetch(url)
    .then(res => res.json())
    .then(data => setCurrencyChoice([...Object.keys(data.rates)]))
  })
  return (
   <div>
    <img className='money-img' src={money} alt="logo"/>
    <h1>แอพแปลงสกุลเงิน (API)</h1>
    <div className='container'>
    <CurrencyComponents currencyChoice={currencyChoice}/>
    <div className='equal'> = </div>
    <CurrencyComponents currencyChoice={currencyChoice}/>
    </div>
   </div>
  );
}

export default App;
