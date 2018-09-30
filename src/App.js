import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {entriesReceived: ""}
    this.getEntries = this.getEntries.bind(this)
  }
  getEntries() {
    $.ajax({
      url: "http://localhost:3001/api/entries",
      type: "GET",
      context: this,
      success: function(result) {
        this.setState({entriesReceived: JSON.stringify(result)})
      }
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React/Rails API Knock Demo</h1>
        </header>
        <p className="App-intro">
          This app will be a diary app. Users can create simple entries, with just a title and content.
        </p>

        <form>
          <label htmlFor="email">Email: </label>
          <br />
          <input name="email" id="email" type="email"/>
          <br />
          <label htmlFor="password">Password: </label>
          <input name="password" id="password" type="password" />
        </form>
        <button onClick={this.login}>Login</button>

        <button onClick={this.getEntries} style={{marginTop: '25vh'}}>Get Entries</button>
        <h2>Entries: </h2>
        <p>{this.state.entriesReceived}</p>

      </div>
    );
  }
}

export default App;
