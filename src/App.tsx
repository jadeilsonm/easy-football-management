import { Route, Routes, BrowserRouter as Router } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import BracketTree from './components/BracketTree';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { Home } from './pages/Home';
import Manager from './pages/Manager';
import Cup from './pages/Cup';
import CreateTournament from './pages/CreateTournament';
import { EditTeam } from './pages/EditTeam';
import { SearchTournament } from './pages/SearchTournament';
import TournamentClientDetails from './pages/TournamentClientDetails';
import EditProfile from './pages/EditProfile';
import { ApolloProvider } from '@apollo/client';
import { client } from './services/graphqlClient';


const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <ToastProvider>
          <AuthProvider>
            <Routes>

              <Route path="/" element={<Login />} />

              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/manager" element={<Manager />} />
              <Route path="/manager/cup/:id" element={<Cup />} />
              <Route path="/manager/league/:id" element={<Manager />} />
              <Route path="/manager/create/tournament" element={<CreateTournament />} />

              <Route path="/client/editteam" element={<EditTeam />} />
              <Route path="/client/seachtournament" element={<SearchTournament />} />
              <Route path="/client/tournament/:tournamentId" element={<TournamentClientDetails />} />
              <Route
                path="/profile/edit"
                element={
                  <ProtectedRoute>
                    <EditProfile />
                  </ProtectedRoute>
                }
              />


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
    </ApolloProvider>
  );
}

export default App;
