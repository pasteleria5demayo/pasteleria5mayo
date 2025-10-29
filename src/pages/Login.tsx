import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import Swal from 'sweetalert2';
import '../Styles/loginCss.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        icon: 'success',
        title: '¡Bienvenida!',
        text: 'Has iniciado sesión correctamente 🎉',
        confirmButtonColor: '#f48fb1',
      });
      navigate('/home');
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: 'Correo o contraseña incorrectos. Por favor, intenta nuevamente.',
        confirmButtonColor: '#f48fb1',
      });
    }
  };

  return (
    <main className="login-container" role="main">
      <section className="login-box" aria-label="Formulario de inicio de sesión">
        <img src="/logo.png" alt="Logo Pastelería 5 de Mayo" className="logo" />
        <h2>Pastelería 5 de Mayo</h2>

        <form onSubmit={handleLogin}>
          <label htmlFor="email" className="sr-only">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
          <label htmlFor="password" className="sr-only">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button type="submit" aria-label="Iniciar sesión">
            Iniciar sesión
          </button>
        </form>
      </section>
    </main>
  );
}
