import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR:'clear',
  DELETE_DIGIT: 'delete-digit',
  EQUAL:'equal'
}

function reducer(state, {type, payload}) {
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return {
          ...state, 
          currentOperand: payload.digit,
          overwrite:false,
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousOperand == null) {
        return state
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }
      if (state.previousOperand == null){
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }
      return {
        ...state,
        previousOperand: equal(state),
        operation: payload.operation,
        currentOperand: null
      }
    case ACTIONS.CLEAR:
      return {}
    
    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite) {
        return{
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }
    if (state.currentOperand == null) return state
    if (state.currentOperand.length === 1) {
      return{
        ...state,
        currentOperand: null
      }
    }

    return {
      ...state,
      currentOperand: state.currentOperand.slice(0, -1)
    }
    
    case ACTIONS.EQUAL:
      if (state.operation == null || state.currentOperand == null || state.previousOperand == null) {
        return state
      }
    return {
      ...state, 
      overwrite:true,
      previousOperand: null,
      operation: null,
      currentOperand: equal(state),
    }
  }
}

function equal({ currentOperand, previousOperand, operation}){
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev)|| isNaN(current)) return ""
  let calculation = ""
  switch (operation) {
    case "+": 
      calculation = prev + current
      break
    case "-":
      calculation = prev - current
      break
    case "x":
      calculation = prev * current
      break
    case "÷":
      calculation = prev / current
      break
  }
  return calculation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split('.')
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const[{currentOperand, previousOperand, operation}, dispatch ] = useReducer(reducer, {})

  return (
    <div className="col-md-5 offset-md-3 p-3">
      <div className="bg-dark p-3 rounded">
        <div className="display fs-2 rounded text-end">
           {formatOperand(previousOperand)} {operation} 
          <div className="fs-2"> 
            {formatOperand(currentOperand)}
          </div>
        </div>
        <div>
          <div className="d-flex row mt-2 justify-content-center align-items-center" >
            <button className="col-4 m-2 btn btn-primary fs-3 p-3" onClick={()=> dispatch ({type: ACTIONS.CLEAR})} > AC</button> 
            <button className="col-4 m-2 btn btn-danger fs-3 p-3" onClick={()=> dispatch ({type: ACTIONS.DELETE_DIGIT})} > DEL</button>
            <OperationButton operation="÷" dispatch={dispatch}/>            
          </div>
          <div className="d-flex row justify-content-center align-items-center">
            <DigitButton digit="1" dispatch={dispatch}/> 
            <DigitButton digit="2" dispatch={dispatch}/> 
            <DigitButton digit="3" dispatch={dispatch}/> 
            <OperationButton operation="-" dispatch={dispatch}/>             
          </div>
          <div className="d-flex row justify-content-center align-items-center">
            <DigitButton digit="4" dispatch={dispatch}/> 
            <DigitButton digit="5" dispatch={dispatch}/> 
            <DigitButton digit="6" dispatch={dispatch}/> 
            <OperationButton operation="+" dispatch={dispatch}/> 
          </div>
          <div className="d-flex row justify-content-center align-items-center">
            <DigitButton digit="7" dispatch={dispatch}/> 
            <DigitButton digit="8" dispatch={dispatch}/> 
            <DigitButton digit="9" dispatch={dispatch}/> 
            <OperationButton operation="x" dispatch={dispatch}/> 
          </div>
          <div className="d-flex row justify-content-center align-items-center">
            <DigitButton digit="." dispatch={dispatch}/> 
            <DigitButton digit="0" dispatch={dispatch}/> 
            <OperationButton onClick={()=> dispatch ({type: ACTIONS.EQUAL})}operation="=" dispatch={dispatch}/> 
          </div>
        </div>
      </div>
    </div>
        
  )
}

export default App;
