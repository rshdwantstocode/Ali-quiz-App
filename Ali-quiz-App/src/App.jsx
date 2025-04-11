import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <h1>Ali's Simple Quiz App</h1>
      </header>

      <main>
        <section className='question-section'>
          <div>Lifelines</div>

          <div className='question'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, ut! Molestiae dolores expedita omnis at eaque, id nesciunt possimus ratione eveniet itaque accusantium libero delectus blanditiis dignissimos, autem quam deserunt!
          </div>

          <div className='countdown-bar'>
            Coun down bar
          </div>
        </section>
        <section className='answer-section'>
          <button className='choice-1'>Choice 1</button>
          <button className='choice-2'>Choice 2</button>
        </section>
      </main>
    </>
  )
}

export default App
