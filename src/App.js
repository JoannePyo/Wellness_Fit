import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Main from "./pages/main/Main";
import Navigation from "./components/Navigation";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Bmi from "./pages/bmi/Bmi";
import WorkoutTracker from "./pages/workoutTracker/WorkoutTracker";
import Search from "./pages/search/Search";
import ExerciseDetail from "./pages/exerciseDetail/ExerciseDetail";
//import Footer from "./components/Footer";

function App() {
  const { currentUser } = useContext(AuthContext);

  const AuthRoute = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/main"
          element={
            <AuthRoute>
              <Main />
            </AuthRoute>
          }
        />
        <Route path="/bmi" element={<Bmi />} />
        <Route path="/search" element={<Search />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
        <Route path="/workoutTracker" element={<WorkoutTracker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//Route 해줘야지 연결이 되용.
// <Footer /> 없앴음. 메인화면 이상하게 나옴
