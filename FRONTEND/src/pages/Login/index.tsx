import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import { useAuth } from '../../context/AuthContext';
import { User } from '../../context/AuthContext';

// URL backend no Render
//const API_BASE_URL = 'https://fitness-store-backend-kn2k.onrender.com';
const API_BASE_URL = "http://localhost:5266";

async function registerUser(email: string, password: string): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('User registered successfully:', data);

      const user: User = {
        id: data.id,
        email: data.email,
        name: data.email.split('@')[0],
        token: data.token,
      };
      return user;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to register user');
    }
  } catch (error) {
    console.error('Network or server error:', error);
    throw error;
  }
}

async function loginUser(email: string, password: string): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const user: User = {
        id: data.id,
        email: data.email,
        name: data.email.split('@')[0],
        token: data.token,
      };
      return user;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to log in user');
    }
  } catch (error) {
    console.error('Network or server error:', error);
    throw error;
  }
}

const Login = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await loginUser(loginEmail, loginPassword);
      login(userData);
      alert('Login bem-sucedido!');
      navigate('/');
    } catch (error) {
      alert('Falha no login: verifique suas credenciais.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await registerUser(registerEmail, registerPassword);
      login(userData);
      alert('Registro bem-sucedido!');
      navigate('/');
    } catch (error) {
      alert('Falha no registro: este e-mail já pode estar em uso.');
    }
  };

  return (
    <div className="form-container">
      <div className="login-box">
        <h2>
          <i className="fa-solid fa-user"></i> Já sou cadastrado
        </h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="login-email">E-mail:</label>
            <input
              type="email"
              id="login-email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Senha:</label>
            <input
              type="password"
              id="login-password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-prosseguir">Prosseguir</button>
        </form>
      </div>

      <div className="register-box">
        <h2>
          <i className="fa-solid fa-pencil"></i> Ainda não possuo cadastro
        </h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="register-email">E-mail para cadastro:</label>
            <input
              type="email"
              id="register-email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="register-password">Senha:</label>
            <input
              type="password"
              id="register-password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-cadastrar">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;