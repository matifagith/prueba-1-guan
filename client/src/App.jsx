import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
