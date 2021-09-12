import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Container from "./components/Container";
import Room from "./components/Room";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Container} exact />
        <Route path="/conference-room/:idToCall" component={Room} exact/>
        <Route component={Container} />
      </Switch>
    </Router>
  );
};

export default App;
