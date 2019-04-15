import React from 'react';
import './Learning.css';
import { responseCodeTest } from '../functions/responseCodeTest';
import Dropdown from '../components/dropdown';
import Gamemode from '../components/gamemode';
import Gamesession from '../components/gamesession';

class Learning extends React.Component {
    state = {
        gamemodes : {},
    }
    componentDidMount(){
        this.getGameModes();
        
    }
    getGameModes = () => {
        fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/game-modes", {
            methor: "GET",
            headers: {
                "Authorization": "Bearer " + this.props.token,
            }
        })
            .then(response => response.json())
            .then(responsejson => {
                responseCodeTest(responsejson);
                this.setState({gamemodes: responsejson.data});
                console.log(this.state.gamemodes);
            })
    };
    renderGameModes = () => {
        return Array.from(this.state.gamemodes).map(gamemode => {
            return (
                <Gamemode name={gamemode.name} description={gamemode.description} key={gamemode.id}>
                </Gamemode>
            )
            
        })
    }
    render() {
        return (
            <div className="learning-flex-container">
                <div className="learning-side-bar">
                    <Dropdown />
                </div>
                <div className="learning-main-content">
                    {this.renderGameModes()}
                </div>
            </div>
        )
    }
}
export default Learning
