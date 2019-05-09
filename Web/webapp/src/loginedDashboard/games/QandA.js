import React, { Component } from 'react';
//import { Prompt } from 'react-router';
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './QandA.css'

export default class QandA extends Component{
    render() {
        return (
            <div className="QAsideflex-container">
                <div className="QAside-bar">
                    <div className="QAside-subject">Tárgy neve: {this.props.gameName}</div>
                    <table className="QAside-points">
                        <tbody>
                            <tr>
                                <td>Összes:</td>
                                <td>X</td>
                            </tr>
                            <tr>
                                <td>Helyes:</td>
                                <td className="correct">X</td>
                            </tr>
                            <tr>
                                <td>Helytelen:</td>
                                <td className="incorrect">X</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="QAmain-content">
                    <div className="gameHeader">
                        <div className="gameMode">{this.props.gameMode} Játék tipusa (gondolom memoria, feleletválasztos,stb)</div>
                        <div className="questionNumbers">XY</div>
                    </div>
                
                <div className="gameContent">{this.props.content}
                     AND I SAID HEEEEEEEEEEYEYEYYYEEYEYEYEYYEREFEFEFESFESFSEFESFSEF
                <br></br>
                Ez az oldal még munkálatok alatt van és nem is ide tartozik! A fejlesztés könnyebbsége érdekében található meg itt.
                </div>
                <div className="gameFooter"> why u put me down here
                </div>
                    
                </div>
            </div>
        )
    }
}
