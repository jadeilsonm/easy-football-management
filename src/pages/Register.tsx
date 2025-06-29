import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import authService, { type user } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confPassword, setConfPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [formMessage, setFormMessage] = useState<string>('');
  const [isManager, setIsManager] = useState<boolean>(false);
  const navigate = useNavigate();

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



  const validatePassword = (psw: string, isConf: boolean = false) => {
    if (!password) {
      setPasswordError('A senha é obrigatória.');
      return false;
    } else if (password.length < 6) {
      setPasswordError('A senha deve ter pelo menos 6 caracteres.');
      return false;
    } else if (psw == password && isConf) {
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
        const payload: Omit<user, 'id'> = {
          email,
          password,
          name,
          isAdmin: isManager
        }
        const { token } = await authService.register(payload);
        addToast('Register', 'info', 'Registro inserido com sucesso!');
        localStorage.setItem('token', token || '');
        const rota = isManager ? '/manager' : '/';
        navigate(rota)
      } else {
        addToast('Alerta', 'warning', 'Por favor, corrija os erros no formulário.');
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
    <div className="flex items-center justify-center w-96">
      <div className="p-8 rounded-lg shadow-md w-full">
        <img src="http://132.226.159.21:9000/asserts/logo_oficial.png" alt="logo" className='mx-auto block w-38' />
        <h2 className="text-xl font-bold text-center mb-2 text-green-800">Registrar</h2>
        <h4 className="text-sm font-bold text-center mb-2 text-green-600">Bem vindo!<br />Crie agora a sua conta</h4>
        <form onSubmit={handleSubmit} className='border-gray-300'>
          <div className="*mb-2*" >
            <label htmlFor="name" className="block text-decoration-color:#8b5cf6 text-sm font-bold mb-2">
              Nome:
            </label>
            <input
              type="text"
              id="name"
              className={`shadow appearance-none border rounded w-full py-2 px-2 text-green-700 leading-tight focus:outline-none focus:shadow-outline ${name.length <= 3 && name.length > 1 ? 'border-red-500' : ''
                }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="*mb-2*" >
            <label htmlFor="email" className="block text-decoration-color:#8b5cf6 text-sm font-bold mb-2">
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              className={`shadow appearance-none border rounded w-full py-2 px-2 text-green-700 leading-tight focus:outline-none focus:shadow-outline ${emailError ? 'border-red-500' : ''
                }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateEmail(email)}
            />
            {emailError && <p className="text-red-500 text-xs italic mt-1">{emailError}</p>}
          </div>

          <div className="*mb-2*">
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


          <div className="*mb-4*">
            <label htmlFor="confPassword" className="block text-sm font-bold mb-2">
              Confirmar Senha:
            </label>
            <input
              type="password"
              id="confPassword"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-green-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${passwordError ? 'border-red-500' : ''
                }`}
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              onBlur={() => validatePassword(confPassword, true)}
            />
            {passwordError && <p className="text-red-500 text-xs italic mt-1">{passwordError}</p>}
          </div>

          {formMessage && (
            <p className={`text-center mb-4 m-8 ${formMessage.includes('sucesso') ? 'text-green-500' : 'text-red-500'}`}>
              {formMessage}
            </p>
          )}

          <div className="*mb-4* flex justify-center items-center">
            <label htmlFor="isManager" className="block text-sm font-bold mb-2">
              <input
                id="isManager"
                type="checkbox"
                className="accent-green-600 w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-600 m-2"
                checked={isManager}
                onChange={(e) => setIsManager(e.target.checked)}
              />
              Administrador campeonato
            </label>
          </div>



          <div className="flex items-center justify-between *m-16*">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-300 hover:border-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border-gray-400 w-full"
            >
              Criar conta
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register;