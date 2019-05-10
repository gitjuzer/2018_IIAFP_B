import React, { Component } from 'react';
//import { Prompt } from 'react-router';
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './QandA.css'

class QandA extends React.Component {
    state ={
        questions: {},
        currentQuestion:{},
        quest: null,
        qIndex: 0,
        correct:0,
        inCorrect: 0,

        wrongs : {},
        corrects : {},
        activeAnswer : "First"
    
    }
    componentDidMount() {
       this.getQandA();
    }


    getQandA = () =>{
        fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/game-sessions/"+this.props.session_id+"/questions", {
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
            this.setState({questions : responsejson.data})
            this.setState({currentQuestion: this.state.questions[0]})
            console.table(this.state.currentQuestion)
            //console.log(this.state.questions); 
            //console.table(this.state.currentQuestion);
            //console.log(this.state.questions[0]);
           // let tmp = this.state.questions[0].question;
           // this.setState({quest: tmp})
            //console.log(this.state.questions[0].question);
           // console.log(this.state.quest);
           // console.log(this.state.questions.length);
           console.log(this.state.currentQuestion.question_id)
            }
          else
          {alert("Something went wrong with Authorization! Please try again later");}
        });
        
        fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/questions/"+this.state.currentQuestion.question_id+"/wrong-answers", {
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

    renderCurrentQuestion = ()=>{
        return(
            <React.Fragment>
                <div className="gameContent">
                    <div className="question">{this.state.currentQuestion.question}</div>
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

    render() {
        return (
            <div className="QAsideflex-container">
                <div className="QAside-bar">
                    <div className="QAside-subject">Tárgy neve: {this.props.subject}</div>
                    <table className="QAside-points">
                        <tbody>
                            <tr>
                                <td>Összes:</td>
                                <td>{this.state.questions.length}</td>
                            </tr>
                            <tr>
                                <td>Helyes:</td>
                                <td className="correct">{this.state.correct}</td>
                            </tr>
                            <tr>
                                <td>Helytelen:</td>
                                <td className="incorrect">{this.state.inCorrect}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="QAmain-content">
                    <div className="gameHeader">
                        <div className="gameMode">
                            {this.props.gameMode}                        
                        </div>
                        <div className="questionNumbers">{this.state.qIndex+1}/{this.state.questions.length}</div>
                    </div>
                    {this.renderCurrentQuestion()}
                </div>
            </div>
        )}
}
export default QandA
