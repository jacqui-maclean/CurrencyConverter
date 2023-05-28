
// Two ways to fetch data - either use fetch() which is built into every modern browser 
// or use the library axios (npm install axios)
//both methods are asynchronous - eg might take a long time and do not block the next line of code
//both methods return a promise - eg an object that holds the final result of the fetch
//both methods need to have error handling
//axios is more elegant syntactically
//there is a finally method in promises - but it does not work in development
//the axios call must be wrapped in an await - otherwise it is passing undefined for the data 

import axios from "axios"

const FetchCurrencyData = async (baseCurr) => {

const response = await (

    axios.get(`http://www.floatrates.com/daily/${baseCurr}.json`)
    .then((response) => {
        // console.log('response from fetch ',response.data)
        return response.data
    })
    .catch(err => console.log(err))
)

return response


// try{
//     const response = await fetch(`http://www.floatrates.com/daily/${baseCurr}.json`);
//     console.log('response ' , response);
//     return await response.json();

// }
// catch(err){
//     console.log(err.message)
// }

};

export default FetchCurrencyData;