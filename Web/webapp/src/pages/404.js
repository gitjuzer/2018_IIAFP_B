import React from 'react';
import { NavLink } from 'react-router-dom';
class Error extends React.Component {
    state = { }
    render() { 
        return ( 
            <div className="pageNotFound">
                <div className="backgr">
                    <h1 className="pnfH1">404 Page Not Found</h1>
                </div>
                <div className="hahabox"></div>
                <div>
                    <p className="pnfP">Sorry, you got lost in the galaxy, your only hope is the button below.</p>
                </div>
                <NavLink to="../"><button className="pnfButton">Back to home page</button></NavLink>
            </div>
         );
    }
}

export default Error;