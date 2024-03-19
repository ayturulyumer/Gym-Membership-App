import { AuthProvider } from "./contexts/AuthContext.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Login from "./components/Login/Login.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound/NotFound.jsx";
import AuthenticationGuard from "./guards/AuthenticationGuard.jsx";
import LoggedInGuard from "./guards/LoggedInGuard.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Nav from "./components/Nav/Nav.jsx";
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Nav />
          <Routes>
            <Route element={<AuthenticationGuard />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route element={<LoggedInGuard />}>
              <Route path="/" element={<Login />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
