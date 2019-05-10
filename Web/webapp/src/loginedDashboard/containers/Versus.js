import React from 'react'
import QandA from '../games/QandA';

class Versus extends React.Component  {
  
  render(){return (
    <QandA session_id={151} subject={"Matematika"} token={this.props.token} ></QandA>
  )
}
}
export default Versus
