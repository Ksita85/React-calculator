import { ACTIONS } from "./App"

export default function OperationButton({dispatch, operation}) {
    return (
        <button onClick= {()=> dispatch ({type: ACTIONS.CHOOSE_OPERATION, payload:{operation}})}
        className="col m-2 btn btn-info fs-3 p-3">{ operation }</button>
        )
}