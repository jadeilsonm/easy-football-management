
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
import { jwtDecode } from 'jwt-decode';

export interface User {
  id: string;
  name: string;
  email: string;
  exp: number;
  role: string[];
  iss?: string;
  sub?: string;
}
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userId: string;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export interface JwtPayload {
  iss: string;
  sub: string;
  role: 'ADMIN' | 'USER' | string;
  name: string;
  email: string;
  id: string;
  exp: number;
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('token');
  });

  // const [userId, setUserID] = useState<string>(() => {
  //   var token = localStorage.getItem('token');
  //   if (token == null)
  //     return "";
  //   const decoded: JwtPayload = jwtDecode<JwtPayload>(token, { header: false });
  //   return decoded.id;
  // });

  const navigate = useNavigate();

  const login = useCallback((token: string) => {
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
    setUser(decodedToken as User);
    setIsAuthenticated(true);
    console.log('Usuário autenticado:', decodedToken);
    navigate(`/${decodedToken.role.includes('admin') ? 'maneger' : 'client/seachtournament'}`, { replace: true });
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

    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
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