
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
  useCallback
} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('token');
  });
  const navigate = useNavigate();

  const login = useCallback((token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    navigate('/');
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  }, [navigate]);

  
  useEffect(() => {
    const errorInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          if (!isAuthenticated) {
            console.warn('Sessão expirada ou token inválido. Redirecionando para login.');
            logout(); 
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(errorInterceptor);
    };
  }, [isAuthenticated, logout]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};