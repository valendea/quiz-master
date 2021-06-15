import React, { lazy, Suspense } from "react";
import { Route, Switch, BrowserRouter } from 'react-router-dom'

// import './App.css';

const Welcome = lazy(() => import("../src/components/Welcome/Welcome"))
const Questions = lazy(() => import("../src/components/Questions/Questions"))
const List = lazy(() => import("../src/components/List/List"))
const Completion = lazy(() => import("../src/components/Completion/Completion"))
const New = lazy(() => import("../src/components/Form/New"))
const Edit = lazy(() => import("../src/components/Form/Edit"))
const loading = <div>Loading..</div>

const welcomeComponent = () => <Welcome />
const questionsComponent = () => <Questions />
const listComponent = () => <List />
const completionComponent = () => <Completion />
const newComponent = () => <New />
const editComponent = () => <Edit />

const routes = (
  <Suspense fallback={loading}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={welcomeComponent} />
        <Route exact path="/questions" render={questionsComponent} />
        <Route exact path="/list" render={listComponent} />
        <Route exact path="/completion" render={completionComponent} />
        <Route exact path="/questions/new" render={newComponent} />
        <Route exact path="/questions/:id/edit" render={editComponent} />
      </Switch>
    </BrowserRouter>
  </Suspense>
);


export default routes;