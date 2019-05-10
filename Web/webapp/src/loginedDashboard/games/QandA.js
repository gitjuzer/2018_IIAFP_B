import React, { Component } from 'react';
//import { Prompt } from 'react-router';
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './QandA.css'
import './components/CurrentQuestion.css'

class QandA extends React.Component {
    state ={
        questions: {},
        currentQuestion:{},
        quest: null,
        qIndex: 0,
        correct:0,
        inCorrect: 0,

        wrongAnswers : {},
        correctAnswer : null,
        activeAnswer : null,
        currentAnswer : null
    
    }
    componentDidMount() {
       this.getQuestions();
    }


    getQuestions = () =>{
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
           // console.log(responsejson);  
            this.setState({questions : responsejson.data})
            this.setState({currentQuestion: this.state.questions[0]})
            console.table(this.state.currentQuestion)
            //console.log(this.state.questions[0]);
           // let tmp = this.state.questions[0].question;
           // this.setState({quest: tmp})
            //console.log(this.state.questions[0].question);
           // console.log(this.state.quest);
           //{this.state.wrongAnswers[0].wrong_answer}
            }
          else
          {alert("Something went wrong with Authorization! Please try again later");}
          this.getWrongAnswers();
          this.getCorrectAnswer();
        });
    }

    getWrongAnswers = () => {
       // fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/questions/"+this.state.currentQuestion.question_id+"/wrong-answers", { 
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
            console.table(responsejson.data);  
            this.setState({wrongAnswers : responsejson.data})
            }
          else
          {alert("mi?");}
        });

    }

    getCorrectAnswer = () => {
        fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/questions/"+this.state.currentQuestion.question_id+"/correct-answer", {
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
           // console.log(responsejson);  
            this.setState({correctAnswer : responsejson.data[0].correct_answer})
          //  console.log(this.state.correctAnswer)
            }
          else
          {alert("mi?");}
        });
    }

    changeSection = (newSection) => {
        this.setState({ activeAnswer: newSection });
    }

    checkIfAnySelected = () =>{
       
        if(this.state.activeAnswer != null)
        {
            if(this.state.qIndex+1 <= this.state.questions.length){
                this.checkAnswer();
                this.setState({qIndex : this.state.qIndex+1})
                this.setState({currentQuestion : this.state.questions[this.state.qIndex]})
                this.getCorrectAnswer();
                this.getWrongAnswers();
                this.forceUpdate();
            }
            else{
                this.getCorrectAnswer();
                alert("tha game is over");
            }
        }
        else{
            alert("Please select an answer first!");
        }
    }

    setAnswer = (value) => {
        this.setState({currentAnswer : value.target.value})
        console.log(this.state.currentAnswer)
    }

    checkAnswer (){
        if(this.state.currentAnswer == this.state.correctAnswer)
        {
            this.setState({correct :this.state.correct+1})
        }
        else{
            this.setState({inCorrect :this.state.inCorrect+1})
        }
    }
    
    checkStates(){
        if(this.state.wrongAnswers == null)
        {
            this.getWrongAnswers();
            return false;
        }
        else
        return true;
    }

    unselected = "answer";
    selected = "answer active";
//this.state.wrongAnswers[0].wrong_answer
//{this.state.wrongAnswers[0].wrong_answer}
    renderCurrentQuestion = ()=>{
        return(
            <React.Fragment>
                <div className="gameContent">
                    <div className="question">{this.state.currentQuestion.question}</div>
                    <div className="answers">
                                    <button className={this.state.activeAnswer === "First" ? this.selected : this.unselected} value={this.state.correctAnswer} onClick={(value) => {this.changeSection("First");  this.setAnswer(value) }}>{this.state.correctAnswer}</button>
                                    <button className={this.state.activeAnswer === "Second" ? this.selected : this.unselected} value="?xysa" onClick={(value) => {this.changeSection("Second");   this.setAnswer(value)}}></button>    
                                    <br></br>        
                                    <button className={this.state.activeAnswer === "Third" ? this.selected : this.unselected} value="meg neked is" onClick={(value) => {this.changeSection("Third");this.setAnswer(value)}}>3</button>
                                    <button className={this.state.activeAnswer === "Fourth" ? this.selected : this.unselected} value="és neki is" onClick={(value) => {this.changeSection("Fourth");this.setAnswer(value)}}>4</button>
                    </div>
                </div>
                <div className="gameFooter"><button className="answer" onClick={()=>{this.checkIfAnySelected()}}>Next Question</button>
                </div>
            </React.Fragment>
        )}

    render() {
        if(this.checkStates())
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
        )
    else{return(<div>anyád</div>)}}
}
export default QandA
