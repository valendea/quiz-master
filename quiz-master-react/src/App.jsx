import React from "react";

import Header from "./components/Global/Header/Header";
import routes from "./routes";

import './App.css';

const App = () => {
  return (
    <div>
      <Header />
      { routes }
    </div>
  );
}


export default App;
