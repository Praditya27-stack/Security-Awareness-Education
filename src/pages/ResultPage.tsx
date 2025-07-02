import { useLocation, Link } from 'react-router-dom';
import { Trophy, Shield, AlertTriangle, BookOpen, Target, Home, RefreshCw } from 'lucide-react';

/**
 * Halaman hasil quiz yang menampilkan skor, kategori, dan rekomendasi
 */
function ResultPage() {
  const location = useLocation();
  const {
    score = 0,
    maxScore = 100,
    percentage = 0,
    category = 'Security Newbie',
    timeSpent = 0
  } = location.state || {};

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'from-emerald-500 to-green-600';
    if (percentage >= 60) return 'from-blue-500 to-indigo-600';
    if (percentage >= 40) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  const getScoreIcon = (percentage: number) => {
    if (percentage >= 80) return Trophy;
    if (percentage >= 60) return Shield;
    if (percentage >= 40) return Target;
    return AlertTriangle;
  };

  const getRecommendations = (percentage: number) => {
    if (percentage >= 80) {
      return {
        title: 'Cyber Warrior Level! 🏆',
        message: 'Keren banget! Kamu udah punya security awareness yang excellent. Keep it up!',
        recommendations: [
          'Bantu temen-temen buat lebih aware soal cybersecurity',
          'Stay updated dengan threat landscape terbaru',
          'Consider belajar ethical hacking atau security certification',
          'Share knowledge tentang cybersecurity di social media'
        ],
        resources: [
          { title: 'Advanced Security Topics', link: '/edukasi' },
          { title: 'Teach Others', link: '/phishing' }
        ]
      };
    } else if (percentage >= 60) {
      return {
        title: 'Digital Defender! 🛡️',
        message: 'Good job! Kamu udah cukup aware, tapi masih ada room for improvement.',
        recommendations: [
          'Perkuat password management dengan menggunakan password manager',
          'Aktifkan 2FA di semua akun penting',
          'Lebih hati-hati dengan public WiFi dan phishing attempts',
          'Regular update software dan OS'
        ],
        resources: [
          { title: 'Password Security Deep Dive', link: '/edukasi' },
          { title: 'Practice Phishing Detection', link: '/phishing' }
        ]
      };
    } else if (percentage >= 40) {
      return {
        title: 'Security Aware 📚',
        message: 'Not bad! Kamu udah aware basic security, tapi perlu diperkuat lagi.',
        recommendations: [
          'Baca artikel edukasi tentang password dan phishing',
          'Mulai pakai password manager',
          'Pelajari cara identify suspicious emails dan links',
          'Set up 2FA di akun-akun penting'
        ],
        resources: [
          { title: 'Cybersecurity Basics', link: '/edukasi' },
          { title: 'Take Quiz Again', link: '/quiz' }
        ]
      };
    } else {
      return {
        title: 'Security Newbie 🌱',
        message: 'Jangan worry! Semua orang mulai dari sini. Time to level up your security game!',
        recommendations: [
          'Start dengan baca semua artikel di halaman edukasi',
          'Ganti semua password lemah dengan yang kuat',
          'Pelajari cara recognize phishing attempts',
          'Install security updates regularly'
        ],
        resources: [
          { title: 'Start Learning', link: '/edukasi' },
          { title: 'Try Phishing Simulation', link: '/phishing' }
        ]
      };
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const ScoreIcon = getScoreIcon(percentage);
  const recommendations = getRecommendations(percentage);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Quiz Results 📊
          </h1>
          <p className="text-xl text-gray-600">
            Ini hasil cybersecurity awareness kamu!
          </p>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className={`bg-gradient-to-r ${getScoreColor(percentage)} p-8 text-white text-center`}>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <ScoreIcon className="h-10 w-10" />
            </div>
            <h2 className="text-5xl font-bold mb-2">{percentage}%</h2>
            <p className="text-2xl font-semibold mb-4">{category}</p>
            <div className="flex items-center justify-center space-x-8 text-white/90">
              <div>
                <p className="text-sm">Score</p>
                <p className="text-xl font-semibold">{score}/{maxScore}</p>
              </div>
              <div>
                <p className="text-sm">Time Spent</p>
                <p className="text-xl font-semibold">{formatTime(timeSpent)}</p>
              </div>
            </div>
          </div>

          {/* Progress Ring */}
          <div className="p-8">
            <div className="relative w-40 h-40 mx-auto mb-8">
              <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 144 144">
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeDasharray={`${(percentage / 100) * 402.1} 402.1`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800">{percentage}%</div>
                  <div className="text-sm text-gray-600">Complete</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {recommendations.title}
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {recommendations.message}
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            🎯 Action Plan untuk Kamu:
          </h3>
          <div className="space-y-4 mb-8">
            {recommendations.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                </div>
                <p className="text-gray-700 leading-relaxed flex-1">{rec}</p>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            📚 Recommended Resources:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.resources.map((resource, index) => (
              <Link
                key={index}
                to={resource.link}
                className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group"
              >
                <BookOpen className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-blue-800">{resource.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Security Tips */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-6">
            🔒 Daily Security Reminders:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-emerald-100">Quick Wins:</h3>
              <ul className="space-y-2 text-emerald-50 text-sm">
                <li>• Cek dulu linknya ke website apa</li>
                <li>• Kombinasi huruf, angka, simbol yang acak</li>
                <li>• Semua akun penting udah pakai 2FA</li>
                <li>• Otomatis ke cloud storage</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-emerald-100">Red Flags:</h3>
              <ul className="space-y-2 text-emerald-50 text-sm">
                <li>• Email keamanan yang mendesak dan bikin panik</li>
                <li>• Disuruh download file aneh dari link nggak jelas</li>
                <li>• Janji-janji hadiah yang terlalu bagus buat jadi kenyataan</li>
                <li>• Orang asing tiba-tiba minta connect atau kontak pribadi</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            What's Next? 🚀
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quiz"
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Retake Quiz</span>
            </Link>
            <Link
              to="/edukasi"
              className="flex items-center justify-center space-x-2 bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <BookOpen className="h-5 w-5" />
              <span>Learn More</span>
            </Link>
            <Link
              to="/"
              className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
          </div>
        </div>

        {/* Share Results */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Share Your Achievement! 🎉
            </h3>
            <p className="text-gray-600 mb-4">
              Ayo ajak temen-temen untuk ikut quiz cybersecurity awareness!
            </p>
            <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700">
              "Gue baru aja dapet {percentage}% di CyberSafe Quiz! 
              Yuk cek seberapa aware kalian soal cybersecurity di sini 🔒"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;