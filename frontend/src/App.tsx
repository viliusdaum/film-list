import Login from "./pages/login/login";
import Home from "./pages/home/home";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logIn } from "./features/auth/authSlice";
import Signup from "./pages/signup/signup";

interface RootState {
  auth: {
    loggedIn: boolean;
  };
}

const App = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const dispatch = useDispatch();

  return (
    <>
      <Routes>
        <Route
          path="/"
          Component={() =>
            isLoggedIn ? (
              <Navigate to="/main" />
            ) : (
              <Login onLogin={() => dispatch(logIn())} />
            )
          }
        />
        <Route
          path="/main"
          Component={() => (isLoggedIn ? <Home /> : <Navigate to="/" />)}
        />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
