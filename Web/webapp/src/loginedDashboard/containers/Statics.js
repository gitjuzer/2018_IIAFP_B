import React from 'react';
import './Learning.css';
import { responseCodeTest } from '../functions/responseCodeTest';
import Stat from '../components/stat';

class Statics extends React.Component {
state = {
  statistics : {},
}
componentDidMount() {
  this.getDataFromServer();
}
getDataFromServer = () => {

  fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/myself/statistics", {
      method: "GET",
      headers: {
          "Authorization": "Bearer " + this.props.token,
      }
  })
      .then(response => response.json())
      .then(responsejson => {
        console.log(responsejson);
          responseCodeTest(responsejson);
          this.setState({ statistics: responsejson.data });
      }
      )
};

renderStatistics = () => {
  return Array.from(this.state.statistics).map(stat => {
      return (
          <Stat sessName={stat.session_name} points={stat.gained_points} difficulty={stat.difficulty_level} key={stat.statistic_id}></Stat>
      )
  })
}

render() {
  return(
  <table className="table">
    <tbody>
    <tr>
      <td>Játék neve</td>
      <td>Elért pontok</td>
      <td>Játék nehézsége</td>
    </tr>
  {this.renderStatistics()}
  </tbody>
  </table>
  )}
}
export default Statics


