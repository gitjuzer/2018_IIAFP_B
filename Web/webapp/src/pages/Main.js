import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';
import Header from '../elements/header';

export default class logindiv extends Component {
    constructor(props) {
        super();
      }
    render() {
    return (
        <React.Fragment>
        <Header />
     <div className="maindiv">
        <div className="teacherStudentCircles">
            <NavLink to="/login/teacher" className="teacherDiv">
				<button className="buttonTeacher indexButton"/>
                <div className="textUnderIndexButton">Teacher</div>
            </NavLink>
        </div>
        <div className="teacherStudentCircles">
            <NavLink to="/login/student" className="studentDiv">
				<button className="buttonStudent indexButton"/>
                <div className="textUnderIndexButton">Student</div>
            </NavLink>
        </div>
    </div>
    </React.Fragment>
    )
  }
}
