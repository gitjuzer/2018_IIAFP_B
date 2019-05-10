import React from 'react';
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

        wrongAnswers : null,
        correctAnswer : null,
        activeAnswer : null,
        currentAnswer : null
    
    }
    componentDidMount() {
       this.getQuestions();
    }

    qId = "fuc";

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
            this.qId = responsejson;
            console.table(this.qId)
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
            console.log(this.state.wrongAnswers[0].wrong_answer)
            }
          else
          {console.log("wrong answers not yet recived");}
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
          {alert("failed correct answer");}
        });
    }

    insertScore = () =>{
        const data = {
            "gained_points": this.state.correct,
            "session_id": this.props.session_id
        };

        fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/statistics", {
            method: "POST",
            headers: {
                "Authorization": "Bearer "+ this.props.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(responsejson => {
          if (responsejson.status_code === "201" || responsejson.status_code === "200")
            {
            console.log(responsejson);  
          //  console.log(this.state.correctAnswer)
            }
          else
          {(console.log(responsejson));}
        });
    }

    changeSection = (newSection) => {
        this.setState({ activeAnswer: newSection });
        console.log(this.state.correct)
    }

    checkIfAnySelected = () =>{
       
        if(this.state.activeAnswer != null)
        {
            if(this.state.qIndex+1 < this.state.questions.length){
                this.checkAnswer();
                this.setState({qIndex : this.state.qIndex+1})
                console.log(this.state.correct)
                this.setState({currentQuestion : this.state.questions[this.state.qIndex]})
                this.getCorrectAnswer();
                this.getWrongAnswers();
                this.forceUpdate();
            }
            else if(this.state.qIndex+1 === this.state.questions.length){
                this.checkAnswer();
                this.insertScore();
                alert("tha game is over");
                //insert score and exit session 
                this.props.eixtGameSess();

            }
            this.setState({activeAnswer : null})
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
        if(this.state.currentAnswer === this.state.correctAnswer)
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
    renderCurrentQuestion = ()=>{
        if(this.state.wrongAnswers){
        return(
            <React.Fragment>
                <div className="gameContent">
                    <div className="question">{this.state.currentQuestion.question}</div>
                    <div className="answers">
                                    <button className={this.state.activeAnswer === "First" ? this.selected : this.unselected} value={this.state.correctAnswer} onClick={(value) => {this.changeSection("First");  this.setAnswer(value) }}>{this.state.correctAnswer}</button>
                                    <button className={this.state.activeAnswer === "Second" ? this.selected : this.unselected} value={this.state.wrongAnswers[0].wrong_answer} onClick={(value) => {this.changeSection("Second");   this.setAnswer(value)}}>{this.state.wrongAnswers[0].wrong_answer}</button>    
                                    <br></br>        
                                    <button className={this.state.activeAnswer === "Third" ? this.selected : this.unselected} value={this.state.wrongAnswers[1].wrong_answer} onClick={(value) => {this.changeSection("Third");this.setAnswer(value)}}>{this.state.wrongAnswers[1].wrong_answer}</button>
                                    <button className={this.state.activeAnswer === "Fourth" ? this.selected : this.unselected} value={this.state.wrongAnswers[2].wrong_answer} onClick={(value) => {this.changeSection("Fourth");this.setAnswer(value)}}>{this.state.wrongAnswers[2].wrong_answer}</button>
                    </div>
                </div>
                <div className="gameFooter"><button className="answer" onClick={()=>{this.checkIfAnySelected()}}>Next Question</button>
                </div>
            </React.Fragment>
        )}
        else{
            return(<div>Loading dik he</div>)
        }
    }

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
                        Feleletválasztó                      
                        </div>
                        <div className="questionNumbers">{this.state.qIndex+1}/{this.state.questions.length}</div>
                    </div>
                    {this.renderCurrentQuestion()}
                </div>
            </div>
        )
     else{
        return(<div>Loading...</div>)
    }}
}
export default QandA
