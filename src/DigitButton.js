import { ACTIONS } from "./App"

export default function DigitButton({dispatch, digit}) {
    return (
        <button onClick= {()=> dispatch ({type: ACTIONS.ADD_DIGIT, payload:{digit}})}
        className="col m-2 btn btn-secondary fs-3 p-3">{digit}</button>
        )
}