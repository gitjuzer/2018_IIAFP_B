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
    renderSection = () => {
        switch (this.state.activeMenu) {
            case "Classrooms":
                return <Classrooms token={this.state.token} />
            case "Statics":
                return <Statics token={this.state.token} />
            case "Games":
                return <Games token={this.state.token} />
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
            return (
                <React.Fragment>
                <Header title="Teacher Dashboard" username={this.state.username} token={this.state.token} SendTokenClear = {this.SendTokenClear} />
                  <main className="flex-container">
                        <section className="main-section">
                            {this.renderSection()}
                        </section>
                        <aside className="side-bar">
                            <div className="side-bar-title">Menu</div>
                            <button className={this.state.activeMenu === "Classrooms" ? this.selected : this.unselected} onClick={() => this.changeSection("Classrooms")}>
                                <i className="far fa-lightbulb fa-2x"></i>Classrooms
                            </button>
                            <button className={this.state.activeMenu === "Statics" ? this.selected : this.unselected} onClick={() => this.changeSection("Statics")}>
                                <i className="fas fa-chart-bar fa-2x"></i>Statics
                            </button>
                            <button className={this.state.activeMenu === "Games" ? this.selected : this.unselected} onClick={() => this.changeSection("Games")}>
                                <i className="fas fa-gamepad fa-2x"></i>Games
                            </button>
                        </aside>
                    </main>
                </React.Fragment>
            );
    }
}

export default Layout;
