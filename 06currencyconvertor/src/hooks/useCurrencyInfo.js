import { useState, useEffect } from "react";

function useCurrencyInfo(currency){
  const [data, setData] = useState({});
  // const [date, setDate] = useState('HP');

  useEffect(() => {
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
    .then((res) => res.json())
    .then((res) => setData(res[currency]))
  }, [currency])
  
  console.log(data);
  return data
}

export default useCurrencyInfo;