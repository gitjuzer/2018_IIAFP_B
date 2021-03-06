import React, { Component } from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';
import Header from '../elements/header';

export default class SRegister extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    accountType: "STUDENT" ,
    successful: false
  }

  register = () => {
    const data = {
        "username": this.state.username,
        "email": this.state.email,
        "password": this.state.password,
        "first_name": this.state.firstName,
        "last_name": this.state.lastName,
        "account_type": this.state.accountType
    };
    fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responsejson => {
      if (responsejson.status_code === "201" || responsejson.status_code === "200")
        {this.setState({
            username: responsejson.data[0].username,
            successful : true
        });
        alert("Successful registration!");
      }
      else if (responsejson.status_code === "409")
      {
        this.setState({successful : false});
        alert("The user allready exist!");
      }
      else
      {
        this.setState({successful : false});
        alert("ehh");
      }
    });
} 
handleUserName(text)
{
  this.setState({username:text.target.value})
}
 
handleEmail(text)
{
  this.setState({email:text.target.value})
}

handlePassword(text)
{
  this.setState({password:text.target.value})
}

handleFirstName(text)
{
  this.setState({firstName:text.target.value})
}

handleLastName(text)
{
  this.setState({lastName:text.target.value})
}

  render() {
    return (
       <React.Fragment>
        <Header />
      <div className="divbox">
        <h1 className="defaultColor header">Student Register</h1>
          <div className="input-container">
            <i className="iconBg"></i>
            <i className="userIcon icon"></i>
            <input className="input-field" type="text" placeholder="Username" onChange={(text) => {this.handleUserName(text)}} />
          </div>
          <div className="input-container">
            <i className="iconBg"></i>
            <i className="emailIcon icon"></i>
            <input className="input-field" type="text" placeholder="Email" onChange={(text) => {this.handleEmail(text)}} />
          </div>
          <div className="input-container">
            <i className="iconBg"></i>
            <i className="passIcon icon"></i>
            <input className="input-field" type="password" placeholder="Password" onChange={(text) => {this.handlePassword(text)}}  />
          </div>
          <div className="input-container">
            <i className="iconBg"></i>
            <i className="firstnameIcon icon"></i>
            <input className="input-field" type="text" placeholder="First Name" onChange={(text) => {this.handleFirstName(text)}} />
          </div>
          <div className="input-container">
            <i className="iconBg"></i>
            <i className="lastnameIcon icon"></i>
            <input className="input-field" type="text" placeholder="Last Name"  onChange={(text) => {this.handleLastName(text)}} />
          </div>
          <div>
            <button className="defaultColor button" onClick={()=>{this.register()}}>Register</button>
            <NavLink to="/login/student"><button className="defaultColor button">Login</button></NavLink>
            <NavLink to="../"><button className="defaultColor button">Back</button></NavLink>
          </div>
      </div>
      </React.Fragment>
    )
  }
}
