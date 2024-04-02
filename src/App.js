import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RegisterScreen from "./userScreens/RegisterScreen";
import LoginUser from "./userScreens/LoginScreen";
import ObjectDetect from "./components/ObjectDetect";

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        {/* <Route exact path="/face" element={<FaceRecognition />} /> */}
        <Route exact path="/login" element={<LoginUser />} />
        <Route exact path="/register" element={<RegisterScreen />} />
        <Route exact path="/detect" element={<ObjectDetect />} />

        {/* <Route exact path="/object-detect" element={<ObjectDetect />} /> */}

        {/* Add more routes and components as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
