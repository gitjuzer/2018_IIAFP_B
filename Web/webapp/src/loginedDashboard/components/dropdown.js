import React, { Component } from 'react';
import './dropdown.css';
import { all } from 'q';

export default class Dropdown extends Component {
    state = {
        isOpened: false,
    }
    toggleOpen = () => {
        this.setState({ isOpened: !this.state.isOpened });
    }
    selectItem = (level) => {
        this.setState({ selectedOption: level })
        let newLevel = this.props.difficulties.filter(diff => diff.diffculty_name === level)[0];
        if (level === "Mind")
            this.props.setLevel({
                diffculty_name: level,
                difficulty_level: "all",
            });
        else
            this.props.setLevel(newLevel);
    }

    renderOptions = () => {
        if (this.props.difficulties) {
            return Array.from(this.props.difficulties).map((level, index) => {
                return <div key={index} className="option" onClick={() => this.selectItem(level.diffculty_name)}>{level.diffculty_name}</div>
            });
        }
    }
    render() {
        const opened = "custom-select opened";
        const closed = "custom-select closed";
        if (this.props.selectedLevel) {
            return (
                <div className={this.state.isOpened ? opened : closed} onClick={this.toggleOpen}>
                    <div className="selected">{this.props.selectedLevel.diffculty_name}</div>
                    <div className="option-container">
                        <div key={-1} className="option" onClick={() => this.selectItem("Mind")}>Mind</div>
                        {this.renderOptions()}
                    </div>
                </div>
            )
        } else {
            return <div></div>
        }

    }
}
