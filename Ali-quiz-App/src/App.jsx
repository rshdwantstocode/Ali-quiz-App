import { useEffect, useState } from 'react'
import clsx from 'clsx'
import questions from '../questions'
import ReactConfetti from 'react-confetti'
import passedSound from './assets/win_sound_effect.m4a'
import loseSound from './assets/lose_sound_effect.m4a'

import './App.css'

function App() {
  // let number = 0
  // const randomQuestion = Math.ceil(Math.random() * questions.length)
  const [random, setRandom] = useState(0)
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(5)
  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false);

  const question = questions[random]
  // let isGameOver = false


  function Questions() {

    useEffect(() => {
      if (random >= questions.length) {
        if (score >= questions.length / 2) {
          setIsGameWon(true)
          const audio = new Audio(passedSound)
          audio.play();
        } else {
          const audio = new Audio(loseSound)
          audio.play();
        }
        setIsGameOver(true)
      }
    }, [random, score])

    if (timeLeft <= 0) {
      setRandom(random + 1)
      setTimeLeft(5)
    }

    if (random < questions.length) {
      return <p key={question.id}>{question.question}</p>
    } else {
      // isGameOver = true
      return <>
        <h3>Score: </h3>

        <h4 className={clsx('total-score', {
          passed: score >= questions.length / 2,
          failed: score < questions.length / 2
        })}>

          {score}/{questions.length}</h4>
      </>
    }

  }

  // countdown Bar
  useEffect(() => {
    let timer;

    if (random < questions.length) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime > 0 ? prevTime - 1 : 0)
      }, 1000);

      setShuffledOptions(ShuffledAnswer(question.options))
    }
    return () => clearInterval(timer)
  }, [random])

  const progressBarStyle = {
    width: `${(timeLeft / 5) * 100}%`,
    height: "10px",
    backgroundColor: "#1D1616",
    margin: "35px 0 0 0",
    transition: "width 1s linear",
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

  function NewGame() {
    setRandom(0)
    setScore(0)
    setSelectedAnswer(null)
    setIsGameOver(false)
  }


  return (
    <>
      <header>
        <h1>Ali's Simple Quiz App</h1>
      </header>

      {isGameWon && <ReactConfetti recycle={false} numberOfPieces={2000} />}

      <main>
        <section className='question-section'>
          <h3 className={clsx('question-number', { hidden: isGameOver })}>Question: {random + 1} </h3>
          <div className='question'>
            {Questions()}
          </div>

          {!isGameOver && <div style={progressBarStyle}></div>}
        </section>
        <section className='answer-section'>
          {answerQuestion}
          {isGameOver && <button className='new-game' onClick={() => NewGame()}>New Game</button>}
        </section>
      </main>
    </>
  )
}

export default App
