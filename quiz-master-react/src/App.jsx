import React, { lazy, Suspense } from "react";
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import './App.css';

const Welcome = lazy(() => import("../src/components/Welcome/Welcome"))
const Questions = lazy(() => import("../src/components/Questions/Questions"))
const List = lazy(() => import("../src/components/List/List"))
const loading = <div>Loading..</div>

const welcomeComponent = () => <Welcome />
const questionsComponent = () => <Questions />
const listComponent = () => <List />


const App = () => {
  return (
    <Suspense fallback={loading}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={welcomeComponent} />
          <Route exact path="/questions" render={questionsComponent} />
          <Route exact path="/list" render={listComponent} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}


export default App;
