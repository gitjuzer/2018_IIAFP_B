import React from 'react';
import './Learning.css';
import { responseCodeTest } from '../functions/responseCodeTest';
import Dropdown from '../components/dropdown';
import Gamemode from '../components/gamemode';
import Gamesession from '../components/gamesession';

import QandA from '../games/QandA';

class Learning extends React.Component {
    state = {
        gamemodes: {},
        gamesessions: {},
        selectedLevel: {
            diffculty_name: "Mind",
            difficulty_level: "all",
        },
        difficulties: null,

        gamesSessionActive : false,
        subject: null,
        sessionId: null,
        gameModeId : null,
    }
    componentDidMount() {
        this.getDataFromServer();
    }
    getDataFromServer = () => {
        fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/difficulties", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + this.props.token,
            }
        })
            .then(response => response.json())
            .then(responsejson => {
                responseCodeTest(responsejson);
                console.log(responsejson);
                this.setState({ difficulties: responsejson.data })
            })
        fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/game-modes", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + this.props.token,
            }
        })
            .then(response => response.json())
            .then(responsejson => {
                responseCodeTest(responsejson);
                console.log(responsejson);
                this.setState({ gamemodes: responsejson.data });
            })
        fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/game-sessions", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + this.props.token,
            }
        })
            .then(response => response.json())
            .then(responsejson => {
                responseCodeTest(responsejson);
                console.log(responsejson);
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
        if(this.state.selectedLevel.diffculty_name === "Mind"){
            return Array.from(this.state.gamesessions).filter(gamesess => gamesess.game_id === game_id).map(gamesession => {
                return <Gamesession key={gamesession.id} id={gamesession.id} gameId={gamesession.game_id} setActive={this.setGameSessionActive} gamemodeId={gamesession.game_id} name={gamesession.session_name} level={"Level " + gamesession.difficulty_level}/>
            });
        }else{
            return Array.from(this.state.gamesessions).filter(gamesess => gamesess.game_id === game_id && gamesess.difficulty_level === this.state.selectedLevel.difficulty_level).map(gamesession => {
                return <Gamesession key={gamesession.id} name={gamesession.session_name} level={"Level " + gamesession.difficulty_level}/>
            });
        }
    }
    setLevel = (newLevel) => {
        this.setState({ selectedLevel: newLevel});
    }

    constructor(props) {
        super(props)
    
        this.setGameSessionActive = this.setGameSessionActive.bind(this);
        this.setGameSessionDeActive = this.setGameSessionDeActive.bind(this);
      }

    setGameSessionActive(id,subject,gamemodeId){
        this.setState({ 
            gamesSessionActive: true,
            sessionId : id,
            subject: subject,
            gameModeId: gamemodeId
         });
    }

    setGameSessionDeActive(){
        this.setState({ 
            gamesSessionActive: false,
            sessionId : null,
            subject: null,
         });
    }

    render() {
        if(!this.state.gamesSessionActive){
        return (
            <div className="learning-flex-container">
                <div className="learning-side-bar">
                    <div className="learning-dropdown-title">Válassz nehézséget!</div>
                    <Dropdown selectedLevel={this.state.selectedLevel} difficulties={this.state.difficulties} setLevel={(level) => this.setLevel(level)} />
                </div>
                <div className="learning-main-content">
                    {this.renderGameModes()}
                </div>
            </div>
        )
    }
    else if(this.state.gameModeId === 1){
        return(
             <QandA exitGameSess={this.setGameSessionDeActive} session_id={this.state.sessionId} subject={this.state.subject} token={this.props.token} ></QandA>
        )
    }
    else if(this.state.gameModeId === 31){return(<div>not yet implemneted!</div>)}
    else if(this.state.gameModeId === 41){return(<div>not yet implemneted!</div>)}
    else{return(<div>{this.setGameSessionDeActive()}</div>)}
}
}
export default Learning
