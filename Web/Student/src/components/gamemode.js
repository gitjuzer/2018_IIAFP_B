import React, { Component } from 'react'
import './gamemode.css';

export default class gamemode extends Component {
  render() {
    return (
      <div className="game-mode">
        <h1 className="game-mode-name">
            {this.props.name}
        </h1>
        <p className="game-mode-description">
            {this.props.description}
        </p>
        {this.props.children}
      </div>
    )
  }
}
