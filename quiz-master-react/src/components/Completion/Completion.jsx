import React from "react";
import { Link } from "react-router-dom";

import "./Completion.scss";

const Completion = () => (
  <div className="Completion">
    <div className="Completion__Wrapper">
      <h1>That's it</h1>
      <h3>Thank you for participating</h3>

      <Link to="/">
        Back to Home
      </Link>
    </div>
  </div>
)

export default Completion;