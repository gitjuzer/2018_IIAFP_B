import React from 'react';
import { NavLink } from 'react-router-dom';
class Error extends React.Component {
    state = {  }
    render() { 
        return ( 
            <div className="pageNotFound">
                <img src={ require('./img/sadStudent.png') } />
                <h1 className="pnfH1">404 Page Not Found</h1>
                <div>
                    <p className="pnfP">Sorry, but the page you were trying to view does not exist.</p>
                </div>
                <NavLink to="../"><button className="button">Back to home page</button></NavLink>
            </div>
         );
    }
}
 
export default Error;