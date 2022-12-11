import { Link } from "react-router-dom";
import React from "react";
import {useReducerContext} from "../App";

export const Finish: React.FC = () => {
    const {state} = useReducerContext();
    const guess = state.guess;
    return (
        <div className="card w-50">
            <p className={"fs-3 mt-5"}>Kamila have guessed right!</p>
            <img src={guess?.picture} className="card-img-top mx-auto my-5" style={{width: "20rem",}} alt={guess?.name} />
            <div className="card-body">
                <h5 className="card-title fs-1">{guess?.name}</h5>
                <p className="card-text fs-4">
                    {guess?.description}
                </p>
                <Link to="/game">
                    <button className={"btn w-25 btn-success text-uppercase"}>AGAIN</button>
                </Link>
            </div>
        </div>
    );
};
