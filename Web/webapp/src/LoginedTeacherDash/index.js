import React from 'react';
import Header from '../loginedDashboard/components/header';


class Layout extends React.Component {
    state = {
        activeMenu: "Learning",
        token: this.props.stateToPass[0],
        username: this.props.stateToPass[1],
    }
    constructor(props) {
        super(props)
    
        this.SendTokenClear = this.SendTokenClear.bind(this)
      }
      SendTokenClear() {
        this.props.clearToken();
      }
    
    render() {
            return (
                <React.Fragment>
                <Header title="Teacher Dashboard" username={this.state.username} token={this.state.token} SendTokenClear = {this.SendTokenClear} />
                   <div>WIP</div>
                </React.Fragment>
            );
    }
}

export default Layout;
