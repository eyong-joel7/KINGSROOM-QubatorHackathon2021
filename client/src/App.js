import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ConferenceRoom from "./components/Conferenceroom";

import Container from "./components/Container";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Container} exact />
        <Route path="/conference-room/:idToCall" component={ConferenceRoom} exact/>
        <Route component={Container} />
      </Switch>
    </Router>
  );
};

export default App;
