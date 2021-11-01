import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainOmdb from "./components/MainOmdb/MainOmdb";
import MainMovieDetail from "./components/MainOmdb/MainMovieDetail"
import "./App.css";

export class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <h1>hello</h1> */}
        <Router>
          <Switch>
            <Route
              exact
              path="/fetch-movie/:imdbID"
              component={MainMovieDetail}
            />
            <Route exact path="/" component={MainOmdb} />
            <Route render={() => <h1>Not found 404</h1>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;