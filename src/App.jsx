import { BrowserRouter, Routes, Route } from "react-router-dom";
import Adduser from "./adduser"
import Login from "./loginuser";
import Home from "./components/Home";
import Addproduct from "./components/Addproduct";
// import Update from "./components/update";






function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Adduser />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Addproduct" element={<Addproduct />} />
          {/* <Route path="/update" element={<Update/>} /> */}

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App



