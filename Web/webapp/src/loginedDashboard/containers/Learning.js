import React from 'react';
import './Learning.css';
import { responseCodeTest } from '../functions/responseCodeTest';
import Dropdown from '../components/dropdown';
import Gamemode from '../components/gamemode';
import Gamesession from '../components/gamesession';

class Learning extends React.Component {
    state = {
        gamemodes: {},
        gamesessions: {},
        selectedLevel: null,
        selectedLevelName: null,
    }
    componentDidMount() {
        this.getDataFromServer();
    }
    getDataFromServer = () => {

        fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/game-modes", {
            methor: "GET",
            headers: {
                "Authorization": "Bearer " + this.props.token,
            }
        })
            .then(response => response.json())
            .then(responsejson => {
                responseCodeTest(responsejson);
                this.setState({ gamemodes: responsejson.data });
            })
        fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/game-sessions", {
            methor: "GET",
            headers: {
                "Authorization": "Bearer " + this.props.token,
            }
        })
            .then(response => response.json())
            .then(responsejson => {
                responseCodeTest(responsejson);
                this.setState({ gamesessions: responsejson.data });
            })
    };
    renderGameModes = () => {
        return Array.from(this.state.gamemodes).map(gamemode => {
            return (
                <Gamemode name={gamemode.name} description={gamemode.description} key={gamemode.id}>
                    {this.renderGameSessions(gamemode.id)}
                </Gamemode>
            )
        })
    }
    renderGameSessions = (game_id) => {
        return Array.from(this.state.gamesessions).filter(gamesess => gamesess.game_id === game_id && gamesess.difficulty_level === this.state.selectedLevel).map(gamesession => {
            return <Gamesession key={gamesession.id} name={gamesession.session_name} level={"Level " + gamesession.difficulty_level}/>
        });
    }
    setLevel = (newLevel, newLevelName) => {
        this.setState({ selectedLevel: newLevel, selectedLevelName: newLevelName });
    }
    render() {
        return (
            <div className="learning-flex-container">
                <div className="learning-side-bar">
                    <div className="learning-dropdown-title">Válassz nehézséget!</div>
                    <Dropdown token={this.props.token} setLevel={(level, name) => this.setLevel(level, name)} />
                </div>
                <div className="learning-main-content">
                    {this.renderGameModes()}
                </div>
            </div>
        )
    }
}
export default Learning
