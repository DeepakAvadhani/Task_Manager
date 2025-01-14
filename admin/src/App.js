import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import AddAdmin from "./pages/addadmin/AddAdmin";
import Newtask from "./pages/newtask/NewTask";
import Single from "./pages/single/Single";
import Users from "./pages/users/Users";
import Notifications from "./pages/notifications/notifications";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import Profile from "./pages/profile/Profile";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const {currentUser} = useContext(AuthContext)
  

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  console.log(currentUser);
  return (
    <div className={darkMode ? "app dark" : "App"}>
      <Router>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
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
                path=":userID"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path=":userId/newtask"
                element={
                  <RequireAuth>
                    <Newtask />
                  </RequireAuth>
                }
              />
              <Route
                path=":userId/single"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              
            </Route>
            <Route
              path="addadmin"
              element={
                <RequireAuth>
                  <AddAdmin />
                </RequireAuth>
              }
            />
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
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
