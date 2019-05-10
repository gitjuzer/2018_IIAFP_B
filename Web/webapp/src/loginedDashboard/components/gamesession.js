import React, { Component } from 'react';
import './gamesession.css';

export default class gamesession extends Component {
  
  render() {
    return (
      <div>
        <button className="game-session-button"  onClick={()=>{this.props.setActive(this.props.id,this.props.name,this.props.gamemodeId)}}><i className="fas fa-gamepad fa-2x"></i> {this.props.name}</button><i className="far fa-play-circle fa-2x"></i><span className="session-level">{this.props.level}</span>
      </div>
    )
  }
}
