import React, { Component } from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';

export default class Slogin extends Component {
    render() {
    return (
      <div className="divbox">
        <h1 className="defaultColor">Student Login</h1>
        <form action="" method="POST">
          <div className="input-container">
            <i className="iconBg"></i>
            <i className="userIcon icon"></i>
            <input className="input-field" type="text" placeholder="Username" name="usrnm" />
          </div>
          <div className="input-container">
            <i className="iconBg"></i>
            <i className="passIcon icon"></i>
            <input className="input-field" type="password" placeholder="Password" name="psw" />
          </div>
          <div>
            <button type="submit" className="defaultColor button">Login</button>
            <NavLink to="/register/student"><button className="defaultColor button">Register</button></NavLink>
            <NavLink to="../"><button className="defaultColor button">Back</button></NavLink>
          </div>
        </form>
      </div>
    )
  }
}
