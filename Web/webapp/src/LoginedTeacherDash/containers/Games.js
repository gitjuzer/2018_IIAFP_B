import React from "react";
import "./loginedDashboard/Learning.css";
//import { responseCodeTest } from '../functions/responseCodeTest';
import Gamemode from "../components/gamemode";
import QandA from "../games/QandA";

class Games extends React.Component {
  state = {
    games: null,
    gameSession: {
      session_name: "",
      max_points: null,
      game_id: "",
      difficulty_level: ""
    }
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
  createGameSession = () => {
    const data = {
      session_name: this.state.session_name,
      max_points: this.state.max_points,
      game_id: this.state.game_id,
      difficulty_level: this.state.difficulty_level
    };
    fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/gamesession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responsejson => {
        if (
          responsejson.status_code === "201" ||
          responsejson.status_code === "200"
        ) {
          alert("A játékmenet sikeresen létrehozva!");
        } else if (responsejson.status_code === "400") {
          alert("Hibás adatok!");
        } else if (responsejson.status_code === "404") {
          alert("Nem létezik ilyen játékmód vagy nehézségi szint!");
        } else {
          alert("ehh");
        }
      });
  };
  updateGameSession = () => { //fix later
    const data = {
      session_name: this.state.session_name,
      max_points: this.state.max_points,
      game_id: this.state.game_id,
      difficulty_level: this.state.difficulty_level
    };
    
    fetch(`https://oktatoappapi.herokuapp.com/OktatoAppAPI/gamesession/${this.data.game_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responsejson => {
        if (
          responsejson.status_code === "201" ||
          responsejson.status_code === "200"
        ) {
          alert("Játékmenet sikeresen módosítva!");
        } else if (responsejson.status_code === "400") {
          alert("Hibás adatok!");
        } else if (responsejson.status_code === "404") {
          alert("Nem létezik ilyen játékmód vagy nehézségi szint!");
        } else {
          alert("ehh");
        }
      });
  };
  deleteGameSession = () => {
    const data = {
      session_name: this.state.session_name,
      max_points: this.state.max_points,
      game_id: this.state.game_id,
      difficulty_level: this.state.difficulty_level
    };
    fetch(`https://oktatoappapi.herokuapp.com/OktatoAppAPI/gamesession/${this.data.game_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responsejson => {
        if (
          responsejson.status_code === "201" ||
          responsejson.status_code === "200"
        ) {
          alert("Játékmenet sikeresen törölve!");
        } else if (responsejson.status_code === "404") {
          alert("Nem létező játékmenet!");
        } else {
          alert("ehh");
        }
      });
  };
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
export default Games;
