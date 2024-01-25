
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/Main.css";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
function App() {
  return (
    <div className="App">
      <div className="LoginWrap">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/SignUp" element={<SignUp/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
