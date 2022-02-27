import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/pages/Nav";
import Login from "./components/pages/Login";
import Homepage from "./components/pages/Homepage";
import PostDetail from "./components/pages/PostDetail";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/"
          element={
            <RequireAuth redirectTo="/login">
              <Homepage />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/post"
          element={
            <RequireAuth redirectTo="/login">
              <PostDetail />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

// Auth to force the admin user to log-in to see and make changes.
const RequireAuth = ({ children, redirectTo }) => {
  const user = useSelector((state) => state.user.value);

  const isAuthenticated = (user) => {
    return user.admin && user.username !== "";
  };

  return isAuthenticated(user) ? children : <Navigate to={redirectTo} />;
};

export default App;
