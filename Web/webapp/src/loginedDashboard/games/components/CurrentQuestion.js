import React, { Component } from 'react';
import './CurrentQuestion.css'

class CurrentQuestion extends React.Component {
    state={
        wrongs : {},
        corrects : {},
        activeAnswer : "First"
    }
    
    constructor(props){
        super(props)
    }

    componentDidMount() {
        this.getAnswers();
        console.table(this.props.question);
    }

    getAnswers = () =>{
        console.log(this.props.question)
        fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/questions/"+this.props.question.question_id+"/wrong-answers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ this.props.token
            },
        })
        .then(response => response.json())
        .then(responsejson => {
          if (responsejson.status_code === "201" || responsejson.status_code === "200")
            {
            console.log(responsejson);  
            this.setState({wrongs : responsejson.data})
            }
          else
          {alert("mi?");}
        });

    }

    changeSection = (newSection) => {
        this.setState({ activeAnswer: newSection });
    }
    
    unselected = "answer";
    selected = "answer active";
    render(){
    return(
        <React.Fragment>
            <div className="gameContent">
                <div className="question">{this.props.question.question}</div>
                <div className="answers">
                                <button className={this.state.activeAnswer === "First" ? this.selected : this.unselected} onClick={() => this.changeSection("First")}>Fisrt</button>
                                <button className={this.state.activeAnswer === "Second" ? this.selected : this.unselected} onClick={() => this.changeSection("Second")}>SEC</button>    
                                <br></br>        
                                <button className={this.state.activeAnswer === "Third" ? this.selected : this.unselected} onClick={() => this.changeSection("Third")}>THIRD</button>
                                <button className={this.state.activeAnswer === "Fourth" ? this.selected : this.unselected} onClick={() => this.changeSection("Fourth")}>Fournegyedikhe</button>
                </div>
            </div>
            <div className="gameFooter"> why u put me down here <button onClick={()=>{this.passIntro()}}>Bye</button>
            </div>
        </React.Fragment>
    )}
}


export default CurrentQuestion