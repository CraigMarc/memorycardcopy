import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Card } from './Card'
import { Header } from './Header'
import { NewGame } from './NewGame'

function App() {


  //states
  const [clickedOn, setClickedOn] = useState([])
  const [loose, setLoose] = useState()
  const [bestGame, setBestGame] = useState(0)
  const [data, setData] = useState({ hits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] })
  const [error, setError] = useState()


  const fetchInfo = async () => {
    try {
      //return fetch(picUrl)
      const res = await fetch("https://pixabay.com/api/?key=40272701-d1f0bb34d10cfd0d1c847f1fd&q=mountains&image_type=photo")
        .then((res) => res.json())
        .then((d) => setData(d))
        .then(() => setError())
    }
    catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
      //add error message to dom
      setError("true")
    }
  }
  

  useEffect(() => {
    fetchInfo();
  }, [])



  //event handlers
  const handleClick = (e) => {
    let card = e.currentTarget.id
    if (clickedOn.indexOf(card) != -1 && clickedOn.length > 0) {
      setLoose("true")
    }

   
    if (clickedOn.indexOf(card) == -1 || clickedOn.length == 0) {
      setClickedOn((clickedOn) => ([...clickedOn, card]));
    }

  }


  const handleStart = () => {

    setBestGame(clickedOn.length)
    setClickedOn([])
    setLoose()

  }





  //render

  return (
    <>
      <Header
        clickedOn={clickedOn}
        loose={loose}
        bestGame={bestGame}
        error={error}
      />

      <NewGame
        clickedOn={clickedOn}
        loose={loose}
        handleStart={handleStart}
      />

      <Card
        handleClick={handleClick}
        clickedOn={clickedOn}
        loose={loose}
        data={data}
      />



    </>
  )
}

export default App
