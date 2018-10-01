import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends Component {
  constructor() {
    super()
    this.state = {entriesReceived: ""}
    this.getEntries = this.getEntries.bind(this)
  }
  getEntries() {
    let token = "Bearer " + localStorage.getItem("jwt")
    console.log(token)
    $.ajax({
      url: "http://localhost:3001/api/entries",
      type: "GET",
      beforeSend: function(xhr) {xhr.setRequestHeader('Authorization', token)},
      context: this,
      success: function(result) {
        this.setState({entriesReceived: JSON.stringify(result)})
      }
    })
  }

  login () {
    const email = $("#email").val()
    const password = $("#password").val()
    const request = {"auth": {"email": email, "password": password}}
    console.log(request)
    $.ajax({
      url: "http://localhost:3001/api/user_token",
      type: "POST",
      data: request,
      dataType: "json",
      success: function (result) {
        console.log(result)
        localStorage.setItem("jwt", result.jwt)
      }
    })
  }

  render() {
    return (
      <div className="App">

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
