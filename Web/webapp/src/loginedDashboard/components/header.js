import React, { Component } from 'react';
import classes from './header.module.css';
//import Dropdown from 'react-bootstrap-dropdown-menu'

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
                        <button onClick={()=>{this.logout()}}> Logout</button>
					</div>
				</div>
            </header>
        );
    }
}

export default Header;
				//</div>
                    //<Dropdown username="Teszt">
                        //<Dropdown.Menu>
                        //<Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        //<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        //<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        //</Dropdown.Menu>
                    //</Dropdown>;
                //</div>