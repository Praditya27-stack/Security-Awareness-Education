import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Camera, Heart, MessageCircle } from 'lucide-react';
import { savePhishingAttempt } from '../utils/firebase';

/**
 * Simulasi phishing yang meniru tampilan login Instagram
 * Data yang diinput akan disimpan ke Firebase untuk tracking
 */
function PhishingSimulation() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert('Mohon isi email dan password');
      return;
    }

    setIsLoading(true);

    try {
      // Simpan data phishing attempt ke Firebase
      await savePhishingAttempt({
        email,
        password,
        timestamp: new Date(),
        userAgent: navigator.userAgent,
        ipAddress: 'Hidden for privacy' // In production, you'd get this server-side
      });

      // Redirect ke halaman warning setelah 2 detik (simulate loading)
      setTimeout(() => {
        navigate('/warning', { 
          state: { 
            email,
            timestamp: new Date().toISOString()
          }
        });
      }, 2000);
    } catch (error) {
      console.error('Error saving phishing attempt:', error);
      // Still redirect to show the warning
      setTimeout(() => {
        navigate('/warning', { 
          state: { 
            email,
            timestamp: new Date().toISOString()
          }
        });
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Warning Banner - Subtle hint this is simulation */}
        <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-3 mb-6 text-center">
          <p className="text-yellow-800 text-sm">
            ⚠️ Ini adalah simulasi edukasi - Data tidak akan disalahgunakan
          </p>
        </div>

        {/* Instagram-like Login Form */}
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="text-center py-8 px-6 border-b border-gray-200">
            <div className="flex items-center justify-center mb-4">
              <Camera className="h-12 w-12 text-gradient bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              InstagramClone
            </h1>
            <p className="text-gray-600 mt-2">
              Login untuk melihat foto dan video dari teman-temanmu
            </p>
          </div>

          {/* Login Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Nomor ponsel, nama pengguna, atau email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Kata sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Memproses...' : 'Masuk'}
              </button>
            </form>

            <div className="text-center mt-6">
              <a href="#" className="text-purple-600 text-sm hover:underline">
                Lupa kata sandi?
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 text-center border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Tidak punya akun?{' '}
              <a href="#" className="text-purple-600 font-semibold hover:underline">
                Daftar
              </a>
            </p>
          </div>
        </div>

        {/* Fake Social Proof */}
        <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span>1.2M likes</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4 text-blue-500" />
              <span>854 comments</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            "Login sekarang untuk melihat konten eksklusif dari influencer favoritmu!"
          </p>
        </div>

        {/* Educational Note */}
        <div className="mt-6 text-center">
          <p className="text-white/80 text-sm">
            🎭 Simulasi ini dibuat untuk edukasi keamanan digital
          </p>
        </div>
      </div>
    </div>
  );
}

export default PhishingSimulation;