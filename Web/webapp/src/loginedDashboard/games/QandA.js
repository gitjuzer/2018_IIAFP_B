import React from 'react';
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
        console.clear();
       this.getQuestions();
    }
    //global variables
    qId = 0;
    correct = 0;
    questionIndex = 0;
    currentQuestion = null;
    wrongAnswers = null;

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
            this.setState({questions : responsejson.data})
            this.setState({currentQuestion: this.state.questions[0]})
            this.currentQuestion = responsejson.data[0];
            console.table(this.currentQuestion)
            this.qId = responsejson.data[0].question_id;
            }
          else
          {alert("Something went wrong with Authorization! Please try again later");}
          this.getWrongAnswers();
          this.getCorrectAnswer();
        });
    }

    getWrongAnswers = () => {
        fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/questions/"+this.qId+"/wrong-answers", {
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
            this.setState({wrongAnswers : responsejson.data})
            this.wrongAnswers =  responsejson.data;
            }
          else
          {console.log("wrong answers not yet recived");}
        });
    }
    

    getCorrectAnswer = () => {
        fetch("https://oktatoappapi.herokuapp.com/OktatoAppAPI/questions/"+this.qId+"/correct-answer", {
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
            this.setState({correctAnswer : responsejson.data[0].correct_answer})
            }
          else
          {alert("failed to fetch correct answer");}
        });
    }

    insertScore = () =>{
        const data = {
            "gained_points": this.correct,
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
            }
          else
          {(console.log(responsejson));}
        });
    }

    changeSection = (newSection) => {
        this.setState({ activeAnswer: newSection });
    }

    checkIfAnySelected = () =>{
       
        if(this.state.activeAnswer != null)
        {
            if(this.questionIndex+1 < this.state.questions.length){
                this.checkAnswer();
                this.questionIndex = this.questionIndex+1;
                this.currentQuestion = this.state.questions[this.questionIndex]
                this.qId = this.currentQuestion.question_id;
                //this.setState({currentQuestion : this.state.questions[this.questionIndex]})
                this.getCorrectAnswer();
                this.getWrongAnswers();
                this.forceUpdate();
            }
            else if(this.questionIndex + 1 === this.state.questions.length){
                this.checkAnswer();
                this.insertScore();
                this.props.exitGameSess();

            }
            this.setState({activeAnswer : null})
        }
        else{
            alert("Please select an answer first!");
        }
    }

    setAnswer = (value) => {
        this.setState({currentAnswer : value.target.value})
    }

    checkAnswer (){
        if(this.state.currentAnswer === this.state.correctAnswer)
        {
          this.correct = this.correct+1;
        }
        else{
            this.setState({inCorrect :this.state.inCorrect+1})
        }
    }
    
    checkStates(){
        if(this.wrongAnswers == null)
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
        if(this.wrongAnswers){
        return(
            <React.Fragment>
                <div className="gameContent">
                    <div className="question">{this.currentQuestion.question}</div>
                    <div className="answers">
                                    <button className={this.state.activeAnswer === "First" ? this.selected : this.unselected} value={this.state.correctAnswer} onClick={(value) => {this.changeSection("First");  this.setAnswer(value) }}>{this.state.correctAnswer}</button>
                                    <button className={this.state.activeAnswer === "Second" ? this.selected : this.unselected} value={this.wrongAnswers[0].wrong_answer} onClick={(value) => {this.changeSection("Second");   this.setAnswer(value)}}>{this.wrongAnswers[0].wrong_answer}</button>    
                                    <br></br>        
                                    <button className={this.state.activeAnswer === "Third" ? this.selected : this.unselected} value={this.wrongAnswers[1].wrong_answer} onClick={(value) => {this.changeSection("Third");this.setAnswer(value)}}>{this.wrongAnswers[1].wrong_answer}</button>
                                    <button className={this.state.activeAnswer === "Fourth" ? this.selected : this.unselected} value={this.wrongAnswers[2].wrong_answer} onClick={(value) => {this.changeSection("Fourth");this.setAnswer(value)}}>{this.wrongAnswers[2].wrong_answer}</button>
                    </div>
                </div>
                <div className="gameFooter"><button className="answer" onClick={()=>{this.checkIfAnySelected()}}>Next Question</button>
                </div>
            </React.Fragment>
        )}
        else{
            return(<div>Loading...</div>)
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
                                <td className="correct">{this.correct}</td>
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
                        <div className="questionNumbers">{this.questionIndex+1}/{this.state.questions.length}</div>
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
