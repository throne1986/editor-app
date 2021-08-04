import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./editor/Home";
import Editor from "./editor/Editor";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Editor}></Route>
        <Route exact path="/editor/:pageId" component={Editor}></Route>
      </Switch>
    </Router>
  );
}

export default App;