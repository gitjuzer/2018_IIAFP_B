import React, { Component } from 'react'
import { responseCodeTest } from '../functions/responseCodeTest';
import './dropdown.css';

export default class Dropdown extends Component {
    state = {
        isOpened: false,
        selectedOption: "",
        difficulties: null
    }
    componentWillMount() {
        this.getDataFromServer();
    }
    toggleOpen = () => {
        this.setState({ isOpened: !this.state.isOpened });
    }
    selectItem = (level) => {
        this.setState({ selectedOption: level })
        let newLevel = this.state.difficulties.filter(diff => diff.diffculty_name === level)[0];
        this.props.setLevel(newLevel.difficulty_level, newLevel.diffculty_name);
    }
    getDataFromServer = () => {
        fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/difficulties", {
            methor: "GET",
            headers: {
                "Authorization": "Bearer " + this.props.token,
            }
        })
            .then(response => response.json())
            .then(responsejson => {
                responseCodeTest(responsejson);
                this.setState({ selectedOption: responsejson.data[0].diffculty_name })
                this.props.setLevel(responsejson.data[0].difficulty_level, responsejson.data[0].diffculty_name);
                this.setState({ difficulties: responsejson.data });
            })
    }
    renderOptions = () => {
        if (this.state.difficulties) {
            return Array.from(this.state.difficulties).map((level, index) => {
                return <div key={index} className="option" onClick={() => this.selectItem(level.diffculty_name)}>{level.diffculty_name}</div>
            });
        }
    }
    render() {
        const opened = "custom-select opened";
        const closed = "custom-select closed";
        if (this.state.difficulties)
            return (
                <div className={this.state.isOpened ? opened : closed} onClick={this.toggleOpen}>
                    <div className="selected">{this.state.selectedOption}</div>
                    <div className="option-container">
                        {this.renderOptions()}
                    </div>
                </div>
            )
        else
            return <div></div>
    }
}
