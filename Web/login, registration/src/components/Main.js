import React, { Component } from 'react';
import './style.css';


export default class logindiv extends Component {
    constructor(props) {
        super();
      }
    render() {
    return (
     <div>
        <div className="teacherStudentCircles">
            <div className="teacherDiv">
				<button className="buttonTeacher indexButton" onClick={this.props.ourInputFunction} value="TLogin"/>
                <div className="textUnderIndexButton">Teacher</div>
            </div>
        </div>

        <div className="teacherStudentCircles">
            <div className="studentDiv">
				<button className="buttonStudent indexButton" onClick={this.props.ourInputFunction} value="SLogin"/>
                <div className="textUnderIndexButton">Student</div>
            </div>
        </div>
    </div>
    )
  }
}
