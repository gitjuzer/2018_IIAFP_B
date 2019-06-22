import React from 'react';
import '../../loginedDashboard/containers/Learning.css';
//import { responseCodeTest } from '../functions/responseCodeTest';
import Stat from '../../loginedDashboard/components/stat';

class Statics extends React.Component {
state = {
  statistics : {},
}
componentDidMount() {
  this.getDataFromServer();
}
getDataFromServer = () => {

  fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/statistics", {
      method: "GET",
      headers: {
          "Authorization": "Bearer " + this.props.token,
      }
  })
      .then(response => response.json())
      .then(responsejson => {
        console.log(responsejson);
          //responseCodeTest(responsejson);
          this.setState({ statistics: responsejson.data });
      }
      )
};

renderStatistics = () => {
  return Array.from(this.state.statistics).map(stat => {
      return (
          <Stat></Stat> //TODO: format stats
      )
  })
}

//TODO: table
render() {
  return(
  <table className="table">
    <tbody>
    <tr>
      
    </tr>
  {this.renderStatistics()}
  </tbody>
  </table>
  )}
}
export default Statics


