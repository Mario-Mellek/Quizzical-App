import React from 'react'
import Confetti from 'react-confetti'
import Loader from './loader'

function App(){

  const [questions, setQuestions]= React.useState('')
  const [selection, setSelection]= React.useState(false)
  const [warning, setWarning]= React.useState('')
  const [playerScore, setPlayerScore]= React.useState(0)
  const [questionsCount, setQuestionsCount ]= React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    selection? 
    setIsLoading(true) &
    setTimeout(()=>{
      startGame()
    },1200)
    : null;
  }, [playerScore]);


  function startGame (){
    setIsLoading(true);
    fetch('https://opentdb.com/api.php?amount=1')
    .then(res=> res.json())
    .then(data=>{
      setQuestions(data.results)
      setIsLoading(false)
    })
    setSelection('')
    setWarning('')
  };

  const dataArr= Array.from(questions);
  const questionElements= dataArr.map((ele, index)=>{
    const answers= [ele.correct_answer].concat(ele.incorrect_answers).sort();
    const answersElements= answers.map((ans, index)=>{

      function answerClick(){
        setQuestionsCount(prev=> prev+1)
        setWarning("");
        setSelection(ans === ele.correct_answer)
        if (ans !== ele.correct_answer){
          setWarning((`${ans} is incorrect.\nTry Again`))
        }else {setWarning(`${ans} is Correct!`)
        setPlayerScore(prev=> prev+1)
      }
      }

let className;

      if((selection) && (ans === ele.correct_answer)) {
        className= "correct"
      }else if((selection) && (ans !== ele.correct_answer)){
        className="wrong"
      }else{
      className="default"
    }
      return <div
      className={className}
      onClick={!isLoading? answerClick : null}
      dangerouslySetInnerHTML={{__html: ans}}
      key={index}
      />
    });
    return(
      <div key={index}>
        <br />
      <h1 dangerouslySetInnerHTML={{__html: ele.question}} />
      {answersElements}
        <br />
        {warning && <h2
        className={selection? "correct-selection": "wrong-selection"}
        style={{whiteSpace:'pre'}}
        dangerouslySetInnerHTML={{__html: warning}}
        />}
      </div>
    )
  })

  function replay(){
    setQuestions('')
    setQuestionsCount(0)
    setPlayerScore(0)
  }

if (playerScore===5){
  return<>
  {questionsCount > 8 && <iframe src="https://giphy.com/embed/cr9vIO7NsP5cY" width="780" height="684" frameBorder="0"></iframe>}
  {questionsCount <= 8 && <Confetti
    />}
    {questionsCount <= 8 && <iframe src="https://giphy.com/embed/SABpzb2ivrS0g4Hgbb" width="780" height="684" frameBorder="0" allowFullScreen></iframe>}
  <h1>You answered {playerScore} out of {questionsCount}</h1>
  <br />
  <button onClick= {replay}>
      Play Again
    </button>
  </>
}else return(
    <>
    {isLoading? <Loader />: null}
    {questions? 
    <>
    {questionElements}
    </>: 
    <h1>Press the button to start</h1>}
    <br />
    <button className='button' disabled={isLoading} onClick= {startGame}>
      {questions.length>0? "Change Question": "Start Game"}
    </button>
    </>
  )
}


export default App
