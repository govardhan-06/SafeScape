import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import LandscapeComponent from "./components/Landscape";

const App = () => {
  // const user = {
  //   name: "Jane Doe",
  //   email: "jane.doe@example.com",
  //   lastLoggedIn: "2024-09-01T15:30:00Z",
  //   designation: "Software Engineer",
  //   gender: "Female",
  // };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<LandscapeComponent />}>
          <Route path="camera1" element={<Profile />} />
          <Route path="camera2" element={<Profile />} />
          <Route path="camera3" element={<Profile />} />
          <Route path="camera4" element={<Profile />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
