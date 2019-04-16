import React from 'react';
import './index.css';
import { responseCodeTest } from './functions/responseCodeTest';
import Learning from './containers/Learning';
import Statics from './containers/Statics';
import Versus from './containers/Versus';
import Header from './components/header';

class Layout extends React.Component {
    state = {
        activeMenu: "Learning",
        username: "",
        token: "",
    }
    componentDidMount() {
        this.login("szar", "szar");
    }
    login = (username, password) => {
        const data = {
            "username": username,
            "password": password
        };
        fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(responsejson => {
                responseCodeTest(responsejson);
                this.setState({
                    username: responsejson.data[0].username,
                    token: responsejson.data[0].token
                });
            });
    }
    renderSection = () => {
        switch (this.state.activeMenu) {
            case "Learning":
                return <Learning token={this.state.token} />
            case "Statics":
                return <Statics token={this.state.token} />
            case "Versus":
                return <Versus token={this.state.token} />
            default:
                return <div></div>;
        }
    }
    changeSection = (newSection) => {
        this.setState({ activeMenu: newSection });
    }

    unselected = "side-bar-button";
    selected = "side-bar-button active";
    render() {
        if (this.state.token)
            return (
                <React.Fragment>
                    <Header title="Student Dashboard" username={this.state.username}/>
                    <main className="flex-container">
                        <section className="main-section">
                            {this.renderSection()}
                        </section>
                        <aside className="side-bar">
                            
                            <button className={this.state.activeMenu === "Learning" ? this.selected : this.unselected} onClick={() => this.changeSection("Learning")}>
                                <i className="far fa-lightbulb fa-2x"></i>Learning
                        </button>
                            <button className={this.state.activeMenu === "Statics" ? this.selected : this.unselected} onClick={() => this.changeSection("Statics")}>
                                <i className="fas fa-chart-bar fa-2x"></i>Statics
                        </button>
                            <button className={this.state.activeMenu === "Versus" ? this.selected : this.unselected} onClick={() => this.changeSection("Versus")}>
                                <i className="fas fa-gamepad fa-2x"></i>Versus
                        </button>
                        </aside>
                    </main>
                </React.Fragment>
            );
        else
            return <div>Loading...</div>
    }
}

export default Layout;
