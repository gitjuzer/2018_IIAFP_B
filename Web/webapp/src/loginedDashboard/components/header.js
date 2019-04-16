import React, { Component } from 'react';
import classes from './header.module.css';

class Header extends Component {
    state = {}
    render() {
        return (
            <header className={classes.header}>
                <div className={classes.title}>
                    <i className="fas fa-puzzle-piece fa-lg"></i>
                    {this.props.title}
                </div>
                <div className={classes.username}>
                    <i className="fas fa-user fa-lg"></i>
                    {this.props.username}
                </div>
            </header>
        );
    }
}

export default Header;