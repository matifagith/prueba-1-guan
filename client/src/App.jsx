import { useState } from 'react'
import reactLogo from './assets/react.svg'
/* import './App.css' */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Products from './pages/Products/Products';
import Landing from './Components/Landing/Landing';
import MyComponent from './Components/Prueba/Prueba';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>      
      <Routes>
      <Route path="/" element={<Products/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/products" element={<Products/>}></Route>
      <Route path="/prueba" element={<MyComponent/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
