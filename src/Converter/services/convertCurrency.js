//example of passing promises between modules
//fetchCurrencyData contains a promise so the calling module must be async also
//the calling module - eg handleSubmit in the converter module is an async function 
//and then it can await the on the return from this module
import FetchCurrencyData from "./fetchData";

const Calculate = async (amount, baseCurr, convertCurr) => {
    try{
        let jsonData =  await FetchCurrencyData(baseCurr)
        let rate = await jsonData[convertCurr].rate
        let result = (rate * amount).toFixed(2);
        return result;
    }
    catch(err){console.log(err.message)}
    
    }

export default Calculate

