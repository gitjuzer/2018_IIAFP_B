import React, { Component } from 'react';
import './style.css';

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
            <i className="userIcon icon"></i>
            <input className="input-field" type="password" placeholder="Password" name="psw" />
          </div>
          <button type="submit" className="defaultColor button">Login</button>
          <a href="teacherregister.html"><button type="button" className="defaultColor button">Register</button></a>
          <a href="index.html"><button type="button" className="defaultColor button">Back</button></a>
        </form>
      </div>
    )
  }
}
