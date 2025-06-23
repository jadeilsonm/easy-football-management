import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import authService, { type userAuth } from '../services/authService';


const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [formMessage, setFormMessage] = useState<string>('');
  const { addToast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('O e-mail é obrigatório.');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Por favor, insira um e-mail válido.');
      return false;
    }
    setEmailError('');
    return true;
  };



  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('A senha é obrigatória.');
      return false;
    } else if (password.length < 6) {
      setPasswordError('A senha deve ter pelo menos 6 caracteres.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setFormMessage('');

      const isEmailValid = validateEmail(email);
      const isPasswordValid = validatePassword(password);

      if (isEmailValid && isPasswordValid) {
        const payload: userAuth = {
          email,
          password
        }
        const { token } = await authService.login(payload)
        addToast('Login', 'info', 'Login bem-sucedido!');
        console.log('Token:', token);
        localStorage.setItem('token', token || '');
        navigate('/manager');
      } else {
        addToast('Alert', 'warning', 'Por favor, corrija os erros no formulário.');
      }
    } catch (error) {
      if (error instanceof Error) {
        addToast('Error', 'error', error.message);
      } else {
        addToast('Error', 'error', String(error));
      }
    }

  };

  return (
    <div className="w-96 flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-md w-full">
        <img src="http://132.226.159.21:9000/asserts/logo_oficial.png" alt="logo" className='mx-auto block' />
        <h2 className="text-3xl font-bold text-center mb-4 text-green-600">Login</h2>
        <form onSubmit={handleSubmit} className='border-gray-300'>
          <div className="**mb-4**" >
            <label htmlFor="email" className="block text-decoration-color:#8b5cf6 text-sm font-bold mb-2">
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline ${emailError ? 'border-red-500' : ''
                }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateEmail(email)}
            />
            {emailError && <p className="text-red-500 text-xs italic mt-1">{emailError}</p>}
          </div>

          <div className="**mb-4**">
            <label htmlFor="password" className="block text-sm font-bold mb-2">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-green-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${passwordError ? 'border-red-500' : ''
                }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => validatePassword(password)}
            />
            {passwordError && <p className="text-red-500 text-xs italic mt-1">{passwordError}</p>}
          </div>

          {formMessage && (
            <p className={`text-center mb-4 m-8 ${formMessage.includes('sucesso') ? 'text-green-500' : 'text-red-500'}`}>
              {formMessage}
            </p>
          )}

          <div className="flex items-center justify-between **m-16**">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-300 hover:border-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border-gray-400 w-full"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;