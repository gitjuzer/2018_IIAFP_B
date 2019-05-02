import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class App extends Component {
    render() {
        return (
            <header>
                <ul className="defaultColor headdiv">
                    <li>
                        <a className="heada1" href="/">
                            <img className="Applogo" alt="logo" />Teaching App
                        </a>
                    </li>
                </ul>
            </header>
        );
    }

}