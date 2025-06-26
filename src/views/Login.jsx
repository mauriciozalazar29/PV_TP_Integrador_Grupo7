import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Agregar usuario de prueba automáticamente si no está registrado
  useEffect(() => {
    const testUser = { email: 'test@demo.com', password: '1234' };
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    const alreadyExists = storedUsers.some(u => u.email === testUser.email);

    if (!alreadyExists) {
      localStorage.setItem('registeredUsers', JSON.stringify([...storedUsers, testUser]));
      console.log('Usuario de prueba cargado:', testUser);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    const existingUser = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!existingUser) {
      alert('Correo o contraseña inválidos');
      return;
    }

    dispatch(login(existingUser));
    localStorage.setItem('sessionUser', JSON.stringify(existingUser));
    navigate('/');
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Iniciar Sesión
        </button>
      </form>
      <div className="mt-4 text-sm text-gray-600">
        <strong>Usuario de prueba:</strong><br />
        Email: <code>test@demo.com</code><br />
        Contraseña: <code>1234</code>
      </div>
    </div>
  );
};

export default Login;
