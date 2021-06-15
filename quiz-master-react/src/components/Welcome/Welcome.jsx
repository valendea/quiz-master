import React from "react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../Global/Button/Button";
import "./Welcome.scss";

const Welcome = () => {
  return (
    <div className="Welcome">
      <div className="Welcome__Wrapper">
        <p>Welcome to</p>
        <h1 className="Welcome__Title">Quiz Master</h1>
        <div className="Welcome__Links">
          <Link to='/questions'>
            <PrimaryButton>Answer questions</PrimaryButton>
          </Link>
          <Link to='/list'>Browse questions list</Link>
        </div>
      </div>
    </div>
  )
}

export default Welcome;