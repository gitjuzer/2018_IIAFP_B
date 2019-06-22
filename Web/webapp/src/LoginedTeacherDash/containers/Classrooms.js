import React from "react";
import "../../loginedDashboard/containers/Learning.css";
//import { responseCodeTest } from '../functions/responseCodeTest';
import Gamemode from "../../loginedDashboard/components/gamemode";
import QandA from "../../loginedDashboard/games/QandA";

class Classrooms extends React.Component {
  state = {
    classes: {},
    students: {},
    newClassName: "",
    class_id: null
  };
  componentDidMount() {
    this.getDataFromServer();
  }
  getDataFromServer = () => {
    fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/classroom", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.props.token
      }
    })
      .then(response => response.json())
      .then(responsejson => {
        console.log(responsejson);
        //responseCodeTest(responsejson);
        this.setState({ classes: responsejson.data });
      });
    //Current student
  };
  createClassroom = () => {
    const data = {
      newClassname: this.state.newClassName
    };
    fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/classroom", {
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
          alert("Osztály sikeresen létrehozva!");
        } else if (responsejson.status_code === "409") {
          alert("Ilyen nevű osztály már létezik!");
        } else {
          alert("ehh");
        }
      });
  };
  deleteClassroom = () => {
    const data = {
      id: this.state.class_id
    };
    fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/users/signup", {
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
          alert("Osztály sikeresen törölve!");
        } else if (responsejson.status_code === "404") {
          alert("Osztály nem található!");
        } else {
          alert("ehh");
        }
      });
  };
  renderClassrooms = () => {
    return Array.from(this.state.classrooms).map(classroom => {
      return (
        <Gamemode
          name={classroom.name}
          description={classroom.description}
          key={classroom.id}
        >
          {this.renderGameSessions(classroom.id)}
        </Gamemode>
      );
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
    if (!this.state.gamesSessionActive) {
      return <div>not yet implemneted!</div>;
    } else if (this.state.gameModeId === 1) {
      return (
        <QandA
          exitGameSess={this.setGameSessionDeActive}
          session_id={this.state.sessionId}
          subject={this.state.subject}
          token={this.props.token}
        />
      );
    } else if (this.state.gameModeId === 31) {
      return <div>not yet implemneted!</div>;
    } else if (this.state.gameModeId === 41) {
      return <div>not yet implemneted!</div>;
    } else {
      return <div>{this.setGameSessionDeActive()}</div>;
    }
  }
}
export default Classrooms;
