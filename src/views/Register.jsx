import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Obtener usuarios existentes de localStorage
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    // Verificar si el correo ya existe
    const userExists = storedUsers.find(user => user.email === email);
    if (userExists) {
      alert('El correo ya está registrado');
      return;
    }

    // Crear nuevo usuario
    const newUser = { email, password };
    storedUsers.push(newUser);

    // Guardar en localStorage
    localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));

    // También iniciar sesión automáticamente
    dispatch(login(newUser));
    localStorage.setItem('sessionUser', JSON.stringify(newUser));

    navigate('/');
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Registro</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
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
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
