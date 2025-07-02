import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AlertTriangle, Shield, Eye, Clock, User, Mail } from 'lucide-react';

/**
 * Halaman warning yang muncul setelah user mengisi form phishing
 * Menampilkan penjelasan tentang apa yang baru saja terjadi
 */
function WarningPage() {
  const location = useLocation();
  const [showDetails, setShowDetails] = useState(false);
  const { email = '', timestamp = '' } = location.state || {};

  useEffect(() => {
    // Show details after 3 seconds for dramatic effect
    const timer = setTimeout(() => {
      setShowDetails(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const phishingTechniques = [
    {
      icon: Eye,
      title: 'Visual Deception',
      description: 'Website terlihat mirip Instagram dengan logo dan warna yang sama'
    },
    {
      icon: User,
      title: 'Social Engineering',
      description: 'Menggunakan kata-kata yang familiar dan menarik perhatian'
    },
    {
      icon: Mail,
      title: 'Data Collection',
      description: 'Mengumpulkan email dan password untuk tujuan jahat'
    }
  ];

  const preventionTips = [
    'Selalu cek URL dengan teliti - InstagramClone bukan Instagram.com',
    'Waspada dengan website yang meminta login tanpa konteks yang jelas',
    'Gunakan bookmark untuk akses ke situs penting',
    'Jangan pernah masukkan data sensitif di link yang dikirim lewat email/SMS',
    'Aktifkan 2FA di semua akun penting kamu',
    'Gunakan password manager untuk deteksi situs palsu'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Main Warning */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
            <AlertTriangle className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">
            🚨 Kamu Kena Phishing Simulasi!
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Selamat! Kamu baru aja experience firsthand gimana serangan phishing bekerja. 
            Tapi kalem aja broo, ini cuma simulasi doang kokkk!!
          </p>
        </div>

        {/* Attack Details */}
        {showDetails && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-l-4 border-red-500">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Clock className="h-6 w-6 mr-3 text-red-500" />
              Detail Serangan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 mb-2">Email yang dimasukkan:</p>
                <p className="font-mono bg-gray-100 p-3 rounded-lg text-red-600 font-semibold">
                  {email || 'Tidak ada data'}
                </p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Waktu serangan:</p>
                <p className="font-mono bg-gray-100 p-3 rounded-lg text-gray-800">
                  {timestamp ? new Date(timestamp).toLocaleString('id-ID') : 'Tidak ada data'}
                </p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-red-800 font-medium">
                ⚠️ Dalam skenario nyata, data ini udah bisa disalahgunakan untuk:
              </p>
              <ul className="mt-2 text-red-700 text-sm space-y-1">
                <li>• Akses ke akun media sosial kamu</li>
                <li>• Percobaan login ke platform lain dengan kredensial yang sama</li>
                <li>• Dijual ke pihak ketiga di dark web</li>
                <li>• Dipakai untuk serangan phishing lanjutan</li>
              </ul>
            </div>
          </div>
        )}

        {/* How It Worked */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Shield className="h-6 w-6 mr-3 text-blue-500" />
            Kira-kira gini cara nipu nya, mungkin diluar sana banyak yang lebih menipu dari ini. Jadi keep it aware broo!!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {phishingTechniques.map((technique, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <technique.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{technique.title}</h3>
                <p className="text-gray-600 text-sm">{technique.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Prevention Tips */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-6">
            🛡️ Gimana Cara Hindari Phishing Beneran?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {preventionTips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-xs font-bold">{index + 1}</span>
                </div>
                <p className="text-emerald-50 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Real World Stats */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            📊 Fakta Phishing di Dunia Nyata
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-red-50 rounded-xl">
              <div className="text-3xl font-bold text-red-600 mb-2">95%</div>
              <p className="text-gray-700">Cyber attacks dimulai dari phishing</p>
            </div>
            <div className="p-6 bg-orange-50 rounded-xl">
              <div className="text-3xl font-bold text-orange-600 mb-2">1 dari 4</div>
              <p className="text-gray-700">Orang terkena phishing setiap tahunnya</p>
            </div>
            <div className="p-6 bg-yellow-50 rounded-xl">
              <div className="text-3xl font-bold text-yellow-600 mb-2">$12K</div>
              <p className="text-gray-700">Rata-rata kerugian per korban phishing</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Sekarang Kamu Udah Tau! 🎓
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Jangan sampai kejadian ini terjadi di dunia nyata ya!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/edukasi"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Baca Artikel Lengkap
            </Link>
            <Link
              to="/quiz"
              className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Test Pengetahuan
            </Link>
            <Link
              to="/"
              className="bg-gray-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WarningPage;