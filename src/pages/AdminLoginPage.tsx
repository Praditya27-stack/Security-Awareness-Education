import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, getIdTokenResult } from 'firebase/auth';
import { auth } from '../utils/firebase';

/**
 * Halaman login khusus admin dengan keamanan tinggi dan desain konsisten.
 */
function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [delay, setDelay] = useState(0);

  // Validasi input sederhana (anti XSS dan format email)
  const validateInput = () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) return false;
    if (password.length < 8) return false;
    return true;
  };

  // Fungsi login aman
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validateInput()) {
      setError('Email atau password tidak valid');
      return;
    }
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const tokenResult = await getIdTokenResult(user);
      // Cek custom claim admin
      if (tokenResult.claims.admin !== true) {
        setError('Akses hanya untuk admin');
        setLoading(false);
        return;
      }
      // Redirect ke dashboard admin
      navigate('/dashboard');
    } catch (err) {
      setError('Login gagal. Cek kembali email dan password.');
      // Proteksi brute force: delay 2 detik setiap gagal
      setDelay(2000);
      setTimeout(() => setDelay(0), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-8 mx-2">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Admin Login</h2>
        <form onSubmit={handleLogin} autoComplete="off" className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              value={email}
              onChange={e => setEmail(e.target.value.replace(/</g, ''))}
              autoComplete="username"
              required
              disabled={loading || delay > 0}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              value={password}
              onChange={e => setPassword(e.target.value.replace(/</g, ''))}
              autoComplete="current-password"
              required
              minLength={8}
              disabled={loading || delay > 0}
            />
          </div>
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-2 text-center text-sm">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-60"
            disabled={loading || delay > 0}
          >
            {loading ? 'Memproses...' : 'Login'}
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-6 text-center select-none">
          Hanya untuk admin. Aktivitas login dicatat untuk keamanan.
        </p>
      </div>
    </div>
  );
}

export default AdminLoginPage;
