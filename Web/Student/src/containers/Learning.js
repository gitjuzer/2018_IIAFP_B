import React from 'react';
import './Learning.css';
import Dropdown from '../components/dropdown';
import Gamemode from '../components/gamemode';
import Gamesession from '../components/gamesession';

class Learning extends React.Component {
    componentDidMount(){
        this.renderGameModes();
    }
    renderGameModes = () => {
        fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/game-modes", {
            methor: "GET",
            headers: {
                "Authorization": "Bearer " + this.props.token,
            }
        })
            .then(response => response.json())
            .then(responsejson => {
                console.log(responsejson);
            })
        return null;
    };
    render() {
        return (
            <div className="learning-flex-container">
                <div className="learning-side-bar">
                    <Dropdown />
                </div>
                <div className="learning-main-content">
                    <Gamemode name="X. téma neve" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in dignissim odio. Curabitur laoreet lacus eu massa consequat, scelerisque finibus nulla commodo. Nulla quis suscipit sem. Phasellus ultricies consequat elementum. Aliquam non mauris non ligula varius facilisis at sit amet dolor. ">
                        <Gamesession name="1. Feladat neve" />
                        <Gamesession name="2. Feladat neve" />
                        <Gamesession name="3. Feladat neve" />
                    </Gamemode>
                    <Gamemode name="X. téma neve" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in dignissim odio. Curabitur laoreet lacus eu massa consequat, scelerisque finibus nulla commodo. Nulla quis suscipit sem. Phasellus ultricies consequat elementum. Aliquam non mauris non ligula varius facilisis at sit amet dolor. ">
                        <Gamesession name="1. Feladat neve" />
                        <Gamesession name="2. Feladat neve" />
                        <Gamesession name="3. Feladat neve" />
                    </Gamemode>
                    <Gamemode name="X. téma neve" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in dignissim odio. Curabitur laoreet lacus eu massa consequat, scelerisque finibus nulla commodo. Nulla quis suscipit sem. Phasellus ultricies consequat elementum. Aliquam non mauris non ligula varius facilisis at sit amet dolor. ">
                        <Gamesession name="1. Feladat neve" />
                        <Gamesession name="2. Feladat neve" />
                        <Gamesession name="3. Feladat neve" />
                    </Gamemode>
                </div>
            </div>
        )
    }
}
export default Learning
