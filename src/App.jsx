import { BrowserRouter, Routes, Route } from "react-router-dom";
import Adduser from "./adduser"
import Login from "./loginuser";
import Addproduct from "./components/Addproduct";
import Getdata from './components/Getdata.jsx'







function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Adduser />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Addproduct" element={<Addproduct />} />
  <Route path="/getdata" element={<Getdata />} />


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App




