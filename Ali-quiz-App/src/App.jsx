import { useEffect, useState } from 'react'
import clsx from 'clsx'
import questions from '../questions'
import star from './assets/star.png'

import './App.css'

function App() {
  // let number = 0
  const randomQuestion = Math.ceil(Math.random() * questions.length)
  const [random, setRandom] = useState(0)
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(5)
  const question = questions[random]
  let isGameOver = false


  function Questions() {
    if (random < questions.length) {
      return <p key={question.id}>{question.question}</p>
    } else {
      isGameOver = true
      return <>
        <h3>Score: </h3>
        <h4>{score}/{questions.length}</h4>
      </>
    }

  }

  // countdown Bar
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime > 0 ? prevTime - 1 : 0)
    }, 1000);

    if (random < questions.length) {
      setShuffledOptions(ShuffledAnswer(question.options))
    }
    return () => clearInterval(timer)
  }, [random])

  const progressBarStyle = {
    width: `${(timeLeft / 5) * 100}%`, // Dynamic width calculation
    height: "10px",
    backgroundColor: "#1D1616",
    margin: "35px 0 0 0",
    transition: "width 1s ease-out", // Smooth transition effect
  };

  //shuffling answerson each question
  function ShuffledAnswer(answers) {
    return [...answers].sort(() => Math.random() - 0.5)
  }

  const answerQuestion = random < questions.length ? shuffledOptions.map(choices => (
    <button
      key={choices}
      className={clsx('choices', {
        green: choices === selectedAnswer && selectedAnswer === question.answer,
        wrong: choices === selectedAnswer && selectedAnswer !== question.answer
      })}
      onClick={() => CheckAnswer(choices)}>
      {choices}
    </button>
  )) : null

  // checking answer
  function CheckAnswer(answer) {
    setSelectedAnswer(answer)
    const checkAnswer = question.answer === answer
    if (random < questions.length) {
      if (checkAnswer) {
        setScore(score + 1)
      }

      setTimeout(() => {
        setSelectedAnswer(null)
        setRandom(random + 1)
        setTimeLeft(5)
      }, 1000)

    }

  }

  // under development
  function LifeStar() {
    const stars = []
    let totalLife = 0
    while (totalLife < 3) {
      totalLife++
      stars.push(<img className='life-star' src={star} alt="life-star" />)
    }
    // console.log(stars);

    return stars
  }

  function NewGame() {
    setRandom(0)
    setScore(0)
    setSelectedAnswer(null)
  }


  return (
    <>
      <header>
        <h1>Ali's Simple Quiz App</h1>
      </header>

      <main>
        <section className='question-section'>
          <div>
            {LifeStar()}
          </div>

          <div className='question'>
            {Questions()}
          </div>

          <div style={progressBarStyle}>
          </div>
        </section>
        <section className='answer-section'>
          {/* <button className='choice-1'>Choice 1</button>
          <button className='choice-2'>Choice 2</button> */}
          {answerQuestion}
          {isGameOver && <button className='new-game' onClick={() => NewGame()}>New Game</button>}
        </section>
      </main>
    </>
  )
}

export default App
