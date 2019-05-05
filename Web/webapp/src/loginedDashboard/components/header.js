import React, { Component } from 'react';
import classes from './header.module.css';

class Header extends Component {
    logout = () => {
        fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/users/logout", {
            method: "POST",
            headers: {
                "Authorization": "Bearer "+ this.props.token
            }
        })
        this.props.SendTokenClear();
    }
    render() {
        return (
            <header className={classes.header}>
                <div className={classes.flex}>
                    <div className={classes.title}>
                        <i className="fas fa-puzzle-piece fa-lg"></i>
                        {this.props.title}
                    </div>
                    <div className={classes.username}>
                        <i className="fas fa-user fa-lg"></i>
                        {this.props.username}
                        <button onClick={()=>{this.logout()}}> Logout</button>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;