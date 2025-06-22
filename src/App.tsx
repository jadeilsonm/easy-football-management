import { AuthProvider } from './context/AuthContext';
import { Route, Routes, BrowserRouter as Router } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import BracketTree from './components/BracketTree';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';
import { Title } from './components/Title';
import { ToastProvider } from './context/ToastContext';
import { Home } from './pages/Home';


const App: React.FC = () => {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <BracketTree />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
