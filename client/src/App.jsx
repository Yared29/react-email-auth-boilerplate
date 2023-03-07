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
import PublicRoutes from './utils/PublicRoutes';
import PrivateRoutes from './utils/PrivateRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          oute
          element={<PrivateRoutes />}
        >
          <Route
            path='/home'
            element={<Home />}
          />
          <Route
            path='*'
            element={
              <Navigate
                to='/home'
                replace
              />
            }
          />
        </Route>

        <Route
          oute
          element={<PublicRoutes />}
        >
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
