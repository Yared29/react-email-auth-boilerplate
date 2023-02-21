import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LogIn from './components/LogIn.jsx';
import Register from './components/Register.jsx';
import Home from './components/Home.jsx';
import VerifyAccountPage from './components/VerifyAccountPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/home'
          element={<Home />}
        />

        <Route
          path='/login'
          element={<LogIn />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
        <Route
          path='/user/confirm/:confirmationCode'
          element={<VerifyAccountPage />}
        />
        <Route
          path='*'
          element={
            <Navigate
              to='/login'
              replace
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
