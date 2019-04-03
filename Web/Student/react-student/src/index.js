import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Learning from './containers/Learning';
import Statics from './containers/Statics';
import Versus from './containers/Versus';
import * as serviceWorker from './serviceWorker';

class Layout extends React.Component {
    state = {
        activeMenu: "Learning",
    }
    renderSection = () => {
        switch (this.state.activeMenu) {
            case "Learning":
                return <Learning/>
            case "Statics":
                return <Statics/>
            case "Versus":
                return <Versus/>
            default:
                return <div></div>;
        }
    }
    changeSection = (newSection) => {
        this.setState({activeMenu: newSection});
        
    }
    unselected = "side-bar-button";
    selected = "side-bar-button active";
    render() {
      return (
        <main className="flex-container">
            <section className="main-section">
                {this.renderSection()}
            </section>
            <aside className="side-bar">
                <button className={ this.state.activeMenu === "Learning" ? this.selected : this.unselected } onClick={() => this.changeSection("Learning")}>
                    <i className="far fa-lightbulb fa-2x"></i>Learning
                </button>
                <button className={ this.state.activeMenu === "Statics" ? this.selected : this.unselected } onClick={() => this.changeSection("Statics")}>
                    <i className="fas fa-chart-bar fa-2x"></i>Statics
                </button>
                <button className={ this.state.activeMenu === "Versus" ? this.selected : this.unselected } onClick={() => this.changeSection("Versus")}>
                    <i className="fas fa-gamepad fa-2x"></i>Versus
                </button>
            </aside>
        </main>
        
      );
    }
}
ReactDOM.render(<Layout />, document.getElementById('react-section'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
