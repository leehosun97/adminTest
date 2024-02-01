import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./component/SignUp";
import Login from "./component/Login";
import { Flex } from "antd";


function App() {
  return (
    <div className="App">
      <Flex align="center" justify="center" style={{ height: "100vh", }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </Flex>
    </div>
  );
}

export default App;
