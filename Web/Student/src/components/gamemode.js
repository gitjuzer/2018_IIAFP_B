import React, { Component } from 'react'
import './gamemode.css';

export default class gamemode extends Component {
  render() {
    return (
      <div className="game-mode">
        <div>
            <div className="box">
                <i class="fas fa-th-large fa-3x"></i>
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
