//CALLS AN API TO BUILD THE INITIAL DROPDOWNS AND TO CALCULATE A RESULT
//ALSO HAS A REDUX STORE WHERE THE FORM ENTRIES ARE PLACED
//uses the createSlice from reduxToolkit allowing a more streamlined syntax
//It's a very simple form so the validation is handled manually with an alert box rather than with useForm hook or Zod schema

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import {
  updateAmount,
  selectAmount,
  updateBaseCurr,
  selectBaseCurr,
  updateConvertCurr,
  selectConvertCurr,
} from "./converterSlice";
import { Button } from "../Button/button";
import Alert from "../alert";
import Calculate from "../services/convertCurrency";
import FetchCurrencyData from "../services/fetchData";
import styled from "styled-components";
import styles from "./converter.module.css";

//using a styled component (css in js) approach for this
const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

export function Converter() {
  let [dropdownNames, setDropdownNames] = useState([]);
  const [amount, setAmount] = useState("");
  const [baseCurr, setBaseCurr] = useState("gbp");
  const [convertCurr, setConvertCurr] = useState("gbp");
  const [result, setResult] = useState();
  const [showResult, setShowResult] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  // example of using useSelector to access a value to display on the screen
  const reduxAmount = useSelector(selectAmount);
  const reduxBaseCurr = useSelector(selectBaseCurr);
  const reduxConvertCurr = useSelector(selectConvertCurr);

  //call useEffect just once to populate the dropdown lookup table
  //all processing of data happens within the async function within the useEffect, the data can not be subcontracted out for processing, because it will only be a pending promise
  useEffect(() => {
    const fetchingData = async () => {
      let json = await FetchCurrencyData("gbp");
      const currencyCodes = Object.keys(json);
      const dropdownNamesTable = [{ code: "gbp", name: "UK Pounds Sterling" }]; //because this will not be in the list having been used to make the call
      let nameAndKey = {};
      currencyCodes.forEach((key) => {
        nameAndKey = { code: key, name: json[key].name };
        dropdownNamesTable.push(nameAndKey);
      });
      setDropdownNames(dropdownNamesTable);
    };
    fetchingData().catch(console.error);
  }, []);

  const handleShowAlertAndResult = (alertState, resultState) => {
    setShowAlert(alertState);
    setShowResult(resultState);
  };

  const reset = () => {
    handleShowAlertAndResult(false, false);
    setAmount("");
    setBaseCurr("gbp");
    setConvertCurr("gbp");
  };

  const handleCurrencyChange = (e) => {
    handleShowAlertAndResult(false, false);
    setError(null);
    e.target.name === "base"
      ? setBaseCurr(e.target.value)
      : setConvertCurr(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    handleShowAlertAndResult(false, false);
  };

  const buildError = () => {
    let message =
      baseCurr === convertCurr
        ? "Both currencies are the same"
        : "Enter a valid amount";
    setError(message);
    handleShowAlertAndResult(true, false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(false);
    //(amount, baseCurr and convertCurr are state variables that are updated onChange)
    if (
      baseCurr === convertCurr ||
      amount === "enter amount here" ||
      amount < 1
    ) {
      //3 checks including if both input boxes contain the same currency
      buildError();
    } else {
      //alternatively - can access the values straight from the event target value
      // if(e.target[0].value!==reduxAmount || e.target[1].value!==reduxBaseCurr || e.target[2].value!==reduxConvertCurr)  {
      if (
        amount !== reduxAmount ||
        baseCurr !== reduxBaseCurr ||
        convertCurr !== reduxConvertCurr
      ) {
        const finalResult = await Calculate(amount, baseCurr, convertCurr);
        setResult(finalResult);
        dispatch(updateAmount(amount));
        dispatch(updateBaseCurr(baseCurr));
        dispatch(updateConvertCurr(convertCurr));
      }
      setShowResult(true);
    }
  };

  const findName = (currency) => {
    let foundName = dropdownNames.filter((item) => item.code === currency);
    return foundName[0].name;
  };

  return (
    <div className="container">
      <div className={styles.formContainer}>
        <h1 className={styles.heading}>Currency Converter</h1>
        {/* chose to implement animation in Alert component. This does not allow for a smooth exit, but prevents FOUC type behaviour onSubmit of valid form. */}
        {showAlert && (
          <Alert onClose={() => setShowAlert(false)}>{error}</Alert>
        )}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="input-group mb-3">
            <span className="input-group-text">amount</span>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={handleAmountChange}
              placeholder="amount you want to convert"
              aria-label="amount you want to convert"
            />
          </div>
          {/* alternatively ...styling textbox with css modules instead... */}
          {/* <input  className={styles.textbox} aria-label="Set amount" value={amount} onChange={handleAmountChange}/> */}

          <select
            name="base"
            className="form-select"
            onChange={handleCurrencyChange}
          >
            {dropdownNames &&
              dropdownNames.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.name}
                </option>
              ))}
          </select>

          <select
            name="convert"
            className="form-select"
            onChange={handleCurrencyChange}
          >
            {dropdownNames &&
              dropdownNames.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.name}
                </option>
              ))}
          </select>
          <ButtonContainer>
            <Button type="reset" color="primary" onClick={() => reset()}>
              Clear
            </Button>
            <Button
              type="submit"
              color="primary"
              onClick={() => setShowAlert(true)}
            >
              Calculate
            </Button>
          </ButtonContainer>
          {/* <Button type='submit' color="danger">Calculate</Button> */}
          {/* <Button1 color='primary' item='passing item to child and back to parent' onMyClick={(item)=>console.log(item)}>Button1</Button1> */}
        </form>
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
            >
              <div className={styles.result}>
                <h6>
                  {amount} {findName(baseCurr)} is
                </h6>
                <h3>
                  {result} {findName(convertCurr)}
                </h3>
                <h6> (rounded to 2 decimal places)</h6>
                <div className="d-none">baseCurr is {findName(baseCurr)}</div>
                <div className="d-none">convertCurr is {convertCurr}</div>
                <div className="d-none">reduxAmount is {reduxAmount}</div>
                <div className="d-none">reduxBaseCurr is {reduxBaseCurr}</div>
                <div className="d-none">
                  reduxConvertCurr is {reduxConvertCurr}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Converter;

//// END OF FINISHED CONVERTER /////////////////////////
//TODO - look again at whether we could use the useMemo hook ...
// const getFinalResult =  useMemo(async() => await Calculate (amount, baseCurr, convertCurr),[amount, baseCurr, convertCurr]);
// useMemo has subscribed to these three state values and fires each time they change as they are dependencies
//useMemo is doing its job of checking for change in dependencies, but needs to be stopped from recalculating
//whenever a dependency changes, it should only recalculate on Submit - maybe useMemo isn't the tool for this task.
//for now I do a manual check below to prevent a call to Calculate if the state values are unchanged since last calculate
