import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import Users from "./pages/users/Users";
import Register from "./pages/register/Register";
import Notifications from "./pages/notifications/Notifications";
import Profile from "./pages/profile/Profile";
import Edit from "./pages/edit/Edit";

import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import ViewTask from "./pages/viewtask/ViewTask";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  console.log(currentUser);
  return (
    <div className={darkMode ? "app dark" : "App"}>
      <Router>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="register" element={<Register />} />
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <Users />
                  </RequireAuth>
                }
              />
              <Route
                path="/users/:userID"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
            </Route>
            <Route
              path="notifications"
              element={
                <RequireAuth>
                  <Notifications />
                </RequireAuth>
              }
            />
            <Route
              path="profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />

            <Route
              path="edit"
              element={
                <RequireAuth>
                  <Edit />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
