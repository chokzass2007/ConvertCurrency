import money from './img/money.png';
import './App.css';
import CurrencyComponents from './components/CurrencyComponent';
import { useEffect, useState } from 'react';

function App() {


  const [currencyChoice, setCurrencyChoice] = useState([])

  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("THB")

  const [amount, setAmount] = useState(1)
  const [exchangeRate, setExChangeRate] = useState(0)

  const [checkFromCurrency, setCheckFromCurrency] = useState(true)
  let fromAmount, toAmount

  if (checkFromCurrency) {
    fromAmount = amount
    toAmount = (amount * exchangeRate).toFixed(2)
  } else {
    toAmount = amount
    fromAmount = (amount / exchangeRate).toFixed(2)
  }

  useEffect(() => {
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setCurrencyChoice([...Object.keys(data.rates)])
        setExChangeRate(data.rates[toCurrency])
      })
  }, [fromCurrency, toCurrency])

  const amountFromCurrency=(e)=>{
    setAmount(e.target.value)
  }
  const amountToCurrency=(e)=>{
    setAmount(e.target.value)
  }

  return (
    <div>
      <img className='money-img' src={money} alt="logo" />
      <h1>แอพแปลงสกุลเงิน (API)</h1>
      <div className='container'>
        <CurrencyComponents
          currencyChoice={currencyChoice}
          selectCurrency={fromCurrency}
          changeCurrency={(e) => setFromCurrency(e.target.value)}
          amount={fromAmount}
          onChangeAmount = {amountFromCurrency}
        />
        <div className='equal'> = </div>
        <CurrencyComponents
          currencyChoice={currencyChoice}
          selectCurrency={toCurrency}
          changeCurrency={(e) => setToCurrency(e.target.value)}
          amount={toAmount}
          onChangeAmount = {amountToCurrency}
        />
      </div>
    </div>
  );
}

export default App;
