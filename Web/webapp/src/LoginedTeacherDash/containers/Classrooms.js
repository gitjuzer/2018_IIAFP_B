import React from 'react';
import './Learning.css';
//import { responseCodeTest } from '../functions/responseCodeTest';
import Gamemode from '../components/gamemode';

import QandA from '../games/QandA';

class Classrooms extends React.Component {
    state = {
        gameModeId: 1,
        subject: null,
        sessionId: null        
    }
    componentDidMount() {
        this.getDataFromServer();
    }
    getDataFromServer = () => {
        //Current classes
        //Current student
    };
    renderClassrooms = () => {
        return Array.from(this.state.classrooms).map(classroom => {
            return (
                <Gamemode name={classroom.name} description={classroom.description} key={classroom.id}>
                    {this.renderGameSessions(classroom.id)}
                </Gamemode>
            )
        })
    }
    renderClass = (class_id) => {
       //render class
    }
    
    constructor(props) {
        super(props)
    
        this.renderClassrooms();
      }

    

    render() {
        if(!this.state.gamesSessionActive){
        return (
            <div>not yet implemneted!</div>
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
export default Classrooms
