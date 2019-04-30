import React, { Component } from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';
import Header from '../elements/header';

export default class TRegister extends Component {
 render() {
    return (
       <React.Fragment>
       <Header />
      <div className="divbox">
        <h1 className="defaultColor">Teacher Register</h1>
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
          <div className="input-container">
            <i className="iconBg"></i>
            <i className="passIcon icon"></i>
            <input className="input-field" type="password" placeholder="Teacher ID" name="tid" />
          </div>
          <div>
            <button type="submit" className="defaultColor button">Register</button>
            <NavLink to="/login/teacher"><button className="defaultColor button">Login</button></NavLink>
            <NavLink to="../"><button className="defaultColor button">Back</button></NavLink>
          </div>
        </form>
      </div>
      </React.Fragment>
    )
  }
}
