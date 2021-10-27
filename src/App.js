import React, { Component } from "react";
import './App.css';
import "./components/common/Loading"
import Omdb from "./components/omdb/Omdb";

export class App extends Component {

  render() {
    return (
      <div className="App">
        <Omdb />
      </div>
    );
  }
}
export default App;
