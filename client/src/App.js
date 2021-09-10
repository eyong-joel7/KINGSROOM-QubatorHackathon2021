import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ConferenceRoom from "./components/Conferenceroom";
import Container from "./components/Container";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Container} exact />
        {/* Below Route must be protected route, check if :id exist in the context else return to home*/}
        <Route path="/conference-room" component={ConferenceRoom} />
        <Route component={Container} />
      </Switch>
    </Router>
  );
};

export default App;
