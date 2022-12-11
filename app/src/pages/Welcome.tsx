import { Link } from "react-router-dom";
import kamila from "./kamila.png"
import React from "react";

const kamilaTextBadge: React.CSSProperties = {
    position: 'absolute',
    width: '12rem',
    padding: '0.5rem',
    right: '6.5rem',
    top: '4rem',
    backgroundColor: 'wheat',
    borderRadius: "15px 15px 15px 0px"
}

export const Welcome: React.FC = () => {
    return (
      <div className="card w-50">
          <img src={kamila} className="card-img-top mx-auto my-5" style={{width: "20rem",}} alt="Kamila photo" />
          <p style={kamilaTextBadge}>Hello, I am Kamila. Think about a real or fictional character and I'll try to guess it</p>
          <div className="card-body">
              <h5 className="card-title fs-1">Welcome</h5>
              <p className="card-text fs-4">
                  Kamila can read your mind just like magic and tell you what character you are thinking of, just by asking a few questions.
              </p>
              <Link to="/game">
                  <button className={"btn w-25 btn-success text-uppercase"}>START</button>
              </Link>
          </div>
      </div>
  );
};
