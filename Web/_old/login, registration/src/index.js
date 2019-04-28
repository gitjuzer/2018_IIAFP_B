import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import TLogin from './components/TLogin';
import SLogin from './components/SLogin';
import TRegister from './components/Logindiv';
import SRegister from './components/Logindiv';
import * as serviceWorker from './serviceWorker';

class TSLR extends React.Component {
    constructor() {
        super();
        this.handleInputFunction = this.handleInputFunction.bind(this);
      }
      state = {
        name: '',
        activeMenu: "Main",
      };
      handleInputFunction(e) {
        e.preventDefault();
        this.setState({ activeMenu: e.target.value });
      }
        
    renderSection = () => {
        switch (this.state.activeMenu) {
            case "Main":
                return <Main ourInputFunction={this.handleInputFunction} />
            case "SLogin":
                return <SLogin/>
            case "TLogin":
                return <TLogin/>
            case "SRegister":
                return <SRegister/>
            case "TRegister":
                return <TRegister/>
            default:
                return <div></div>;
        }
    }
    changeSection = (newSection) => {
        this.setState({ activeMenu: newSection });
    }

    render() {
        return (
            <main >
                <section>
                    {this.renderSection()}
                </section>
            </main>

        );
    }
}
ReactDOM.render(<TSLR />, document.getElementById('react-section'));

serviceWorker.unregister();
