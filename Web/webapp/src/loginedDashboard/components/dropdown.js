import React, { Component } from 'react'
import './dropdown.css';

export default class Dropdown extends Component {
    state = {
        isOpened: false,
        selectedOption: "Tárgy1",
    }
    toggleOpen = () => {
        this.setState({isOpened: !this.state.isOpened});
    }
    selectItem = (subject) => {
        this.setState({selectedOption: subject})
    }
  render() {
    const opened = "custom-select opened";
    const closed = "custom-select closed";

    return (
        <div className={this.state.isOpened ? opened : closed} onClick={this.toggleOpen}>
            <div className="selected">{this.state.selectedOption}</div>
            <div className="option-container">
                <div className="option" onClick={() => this.selectItem("Tárgy1")}>Tárgy1</div>
                <div className="option" onClick={() => this.selectItem("Tárgy2")}>Tárgy2</div>
                <div className="option" onClick={() => this.selectItem("Tárgy3")}>Tárgy3</div>
                <div className="option" onClick={() => this.selectItem("Tárgy4")}>Tárgy4</div>
            </div>
        </div>
    )
  }
}
