import React from "react";
import "./loginedDashboard/Learning.css";
//import { responseCodeTest } from '../functions/responseCodeTest';

import Gamemode from "../components/gamemode";
import QandA from "../games/QandA";

class Classrooms extends React.Component {
  state = {
    games: null
  };
  componentDidMount() {
    this.getDataFromServer();
  }
  getDataFromServer = () => {
    fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/gamesession", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.props.token
      }
    })
      .then(response => response.json())
      .then(responsejson => {
        console.log(responsejson);
        //responseCodeTest(responsejson);
        this.setState({ games: responsejson.data });
      });
  };
  createGameSession = () =>{
        //TODO: implement
  }
  updateGameSession = () =>{
        //TODO: implement
  }
  deleteGameSession = () =>{
        //TODO: implement
  }
  renderGames = () => {
    return Array.from(this.state.games).map(game => {
      return <div>not yet implemneted!</div>;
    });
  };
  renderClass = class_id => {
    //render class
  };

  constructor(props) {
    super(props);

    this.renderClassrooms();
  }

  render() {
    return <div>not yet implemneted!</div>;
  }
}
export default Classrooms;
