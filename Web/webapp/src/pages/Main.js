import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';


export default class logindiv extends Component {
    constructor(props) {
        super();
      }
    render() {
    return (
     <div className="maindiv">
        <div className="teacherStudentCircles">
            <NavLink to="/login/teacher" className="teacherDiv">
				<button className="buttonTeacher indexButton" onClick={this.props.ourInputFunction} value="TLogin"/>
                <div className="textUnderIndexButton">Teacher</div>
            </NavLink>
        </div>
        <div className="teacherStudentCircles">
            <NavLink to="/login/student" className="studentDiv">
				<button className="buttonStudent indexButton" onClick={this.props.ourInputFunction} value="SLogin"/>
                <div className="textUnderIndexButton">Student</div>
            </NavLink>
        </div>
    </div>
    )
  }
}
