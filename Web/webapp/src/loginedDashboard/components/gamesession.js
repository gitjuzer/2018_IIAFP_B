import React, { Component } from 'react';
import './gamesession.css';

export default class gamesession extends Component {
  render() {
    return (
      <div>
        <button className="game-session-button"><i className="fas fa-gamepad fa-2x"></i> {this.props.name}</button><i className="far fa-play-circle fa-2x"></i>
      </div>
    )
  }
}
