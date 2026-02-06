import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import { useAuth } from '../../context/AuthContext';
import { User } from '../../context/AuthContext';

async function registerUser(email: string, password: string): Promise<User> {
  try {
    const response = await fetch('http://localhost:5266/api/auth/register', {
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
      console.error('Error registering user:', errorData);
      throw new Error(errorData.message || 'Failed to register user');
    }
  } catch (error) {
    console.error('Network or server error:', error);
    throw error;
  }
}

async function loginUser(email: string, password: string): Promise<User> {
  try {
    const response = await fetch('http://localhost:5266/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('User logged in successfully:', data);

      const user: User = {
        id: data.id,
        email: data.email,
        name: data.email.split('@')[0],
        token: data.token,
      };
      return user;
    } else {
      const errorData = await response.json();
      console.error('Error logging in user:', errorData);
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
      alert('Falha no login');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await registerUser(registerEmail, registerPassword);
      login(userData);
      alert('Registro bem-sucedido! Por favor, faça login.');
      navigate('/');
    } catch (error) {
      alert('Falha no registro');
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
              name="loginEmail"
              placeholder="Seu e-mail"
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
              name="loginPassword"
              placeholder="Sua senha"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-prosseguir">Prosseguir</button>
        </form>
        <div className="forgot-password">
          <i className="fa-solid fa-lock"></i>{' '}
          <a href="#">Esqueceu a senha ou precisa criar?</a>
        </div>
      </div>

      <div className="register-box">
        <h2>
          <i className="fa-solid fa-pencil"></i> Ainda não possuo cadastro
        </h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="register-email">Digite o email que deseja cadastrar:</label>
            <input
              type="email"
              id="register-email"
              name="registerEmail"
              placeholder="Seu e-mail"
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
              name="registerPassword"
              placeholder="Sua senha"
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