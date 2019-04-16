import React, { Component } from 'react'
import './gamemode.css';

export default class gamemode extends Component {
  render() {
    const active = "game-mode";
    const disabled = "game-mode disabled"
    return (
      <div className={this.props.children.length > 0 ? active : disabled}>
        <div>
            <div className="box">
                <i className="fas fa-th-large fa-3x"></i>
            </div>
        </div>
        <div>
            <h1 className="game-mode-name">
                {this.props.name}
            </h1>
            <p className="game-mode-description">
                {this.props.description}
            </p>
            {this.props.children}
        </div>
        
      </div>
    )
  }
}
