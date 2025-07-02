import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Fish, 
  Lock, 
  Shield, 
  Wifi, 
  KeyRound, 
  ArrowRight, 
  Clock,
  User,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

/**
 * Halaman edukasi dengan 5 artikel tentang keamanan digital
 * Setiap artikel memiliki konten yang edukatif dengan bahasa santai
 */
function EducationPage() {
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);

  const articles = [
    {
      id: 1,
      icon: Fish,
      title: 'Phishing: Umpan Digital yang Berbahaya',
      category: 'Social Engineering',
      readTime: '3 menit',
      author: 'Tim CyberSafe',
      summary: 'Gimana cara ngenalin dan menghindari serangan phishing yang makin canggih',
      content: [
        'Phishing itu kayak mancing, tapi yang dipancing adalah data pribadi kamu! Biasanya pelaku phishing bakal kirim email, SMS, atau pesan yang keliatan legit banget, seolah-olah dari bank, sosmed, atau platform yang kamu kenal. Mereka pengen kamu klik link berbahaya atau masukkan data sensitif di website palsu.',
        'Ciri-ciri phishing yang wajib kamu tau: URL yang aneh atau typo (contoh: gmai1.com bukan gmail.com), ada ancaman urgent kayak "akun akan ditutup dalam 24 jam", minta data sensitif lewat email, dan grammar yang kacau. Pro tip: selalu cek sender email dengan teliti, hover link sebelum diklik, dan jangan pernah kasih password lewat email!'
      ],
      tips: [
        'Selalu cek URL dengan teliti sebelum login',
        'Jangan klik link suspicious di email atau SMS',
        'Verifikasi lewat channel resmi jika ada permintaan data',
        'Gunakan 2FA untuk proteksi ekstra'
      ]
    },
    {
      id: 2,
      icon: Lock,
      title: 'Password Lemah = Pintu Rumah Tanpa Gembok',
      category: 'Authentication',
      readTime: '4 menit',
      author: 'Tim CyberSafe',
      summary: 'Kenapa password "123456" atau tanggal lahir itu bahaya banget',
      content: [
        'Password lemah itu kayak nulis PIN ATM di kertas terus ditempel di kartu! Sayangnya, masih banyak yang pakai password super predictable kayak "password123", "admin", atau tanggal lahir. Hacker punya tools canggih yang bisa brute force password lemah dalam hitungan menit atau bahkan detik.',
        'Password yang kuat itu minimal 12 karakter, kombinasi huruf besar-kecil, angka, dan simbol. Jangan pakai info personal yang gampang ditebak. Contoh password kuat: "Kopi@Pagi2024!" - mudah diingat tapi susah ditebak. Dan yang paling penting: jangan pakai password yang sama untuk semua akun!'
      ],
      tips: [
        'Minimal 12 karakter dengan kombinasi lengkap',
        'Hindari info personal (nama, tanggal lahir)',
        'Satu akun satu password unik',
        'Update password secara berkala'
      ]
    },
    {
      id: 3,
      icon: Shield,
      title: '2FA: Bodyguard Digital untuk Akun Kamu',
      category: 'Security',
      readTime: '3 menit',
      author: 'Tim CyberSafe',
      summary: 'Two-Factor Authentication sebagai lapisan keamanan tambahan',
      content: [
        'Two-Factor Authentication (2FA) itu kayak punya dua kunci untuk satu pintu. Meskipun password kamu bocor, hacker tetap nggak bisa masuk karena butuh verifikasi kedua dari device kamu. 2FA bisa berupa SMS code, app authenticator (Google Authenticator, Authy), atau bahkan biometrik.',
        'Hampir semua platform major udah support 2FA: Google, Facebook, Instagram, banking apps, dll. Cara aktivasinya gampang banget - masuk ke security settings, cari "Two-Factor Authentication" atau "2-Step Verification", terus ikuti instruksinya. Lebih aman pakai authenticator app daripada SMS karena SMS bisa di-intercept.'
      ],
      tips: [
        'Aktifkan 2FA di semua akun penting',
        'Pakai authenticator app instead of SMS',
        'Simpan backup codes di tempat aman',
        'Jangan screenshot QR code 2FA'
      ]
    },
    {
      id: 4,
      icon: Wifi,
      title: 'WiFi Publik: Gratis Tapi Mahal Resikonya',
      category: 'Network Security',
      readTime: '4 menit',
      author: 'Tim CyberSafe',
      summary: 'Bahaya menggunakan WiFi publik dan cara aman internetan di luar rumah',
      content: [
        'WiFi publik itu kayak toilet umum - gratis, tapi nggak tau siapa aja yang udah pakai dan ninggalin apa. Di WiFi publik, data kamu bisa di-sniff sama orang jahat yang ada di network yang sama. Mereka bisa liat website yang kamu buka, intercept login credentials, bahkan bikin fake hotspot dengan nama yang mirip.',
        'Kalau terpaksa harus pakai WiFi publik, pastikan website yang kamu akses pakai HTTPS (ada icon gembok di address bar), hindari login ke akun sensitif kayak banking atau email penting, dan yang paling aman: pakai VPN! VPN bakal encrypt semua traffic kamu jadi meskipun di-intercept, data kamu tetap aman.'
      ],
      tips: [
        'Selalu cek HTTPS sebelum input data sensitif',
        'Hindari akses banking di WiFi publik',
        'Pakai VPN untuk enkripsi tambahan',
        'Turn off auto-connect WiFi di device'
      ]
    },
    {
      id: 5,
      icon: KeyRound,
      title: 'Password Manager: Asisten Digital yang Wajib Punya',
      category: 'Tools',
      readTime: '5 menit',
      author: 'Tim CyberSafe',
      summary: 'Kenapa password manager itu game changer untuk keamanan digital',
      content: [
        'Password manager itu kayak brankas digital yang nyimpen semua password kamu dengan aman. Kamu cuma perlu inget satu master password, sisanya biar password manager yang handle. Tools ini bisa generate password random yang super kuat untuk setiap akun, auto-fill login form, dan sync antar device.',
        'Ada banyak pilihan password manager yang bagus: Bitwarden (gratis dan open source), 1Password, LastPass, atau Dashlane. Mereka pakai enkripsi military-grade dan zero-knowledge architecture, artinya bahkan provider-nya nggak bisa liat password kamu. Plus, banyak yang udah ada fitur dark web monitoring buat ngecek apakah data kamu bocor di breach.'
      ],
      tips: [
        'Pilih password manager yang reputable',
        'Gunakan master password yang kuat',
        'Enable auto-lock setelah idle',
        'Backup vault secara berkala'
      ]
    }
  ];

  const toggleArticle = (id: number) => {
    setExpandedArticle(expandedArticle === id ? null : id);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Edukasi Keamanan Digital 📚
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Belajar cybersecurity dengan cara yang santai tapi tetap mendalam. 
            Artikel-artikel ini bakal bikin kamu jadi lebih aware soal ancaman digital!
          </p>
        </div>

        {/* Articles Grid */}
        <div className="max-w-4xl mx-auto space-y-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Article Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                      <article.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {article.title}
                      </h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                          {article.category}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{article.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{article.author}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleArticle(article.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {expandedArticle === article.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-600" />
                    )}
                  </button>
                </div>
                <p className="text-gray-600 mt-4 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              {/* Article Content */}
              {expandedArticle === article.id && (
                <div className="p-6">
                  <div className="prose max-w-none">
                    {article.content.map((paragraph, idx) => (
                      <p key={idx} className="text-gray-700 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Tips Section */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                    <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Pro Tips:
                    </h3>
                    <ul className="space-y-2">
                      {article.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-emerald-700">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Udah Paham? Saatnya Practice! 🎯
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Test pemahaman kamu dengan quiz atau coba simulasi phishing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/quiz"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg inline-flex items-center justify-center"
              >
                Ambil Quiz
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/phishing"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-200 inline-flex items-center justify-center"
              >
                Coba Simulasi
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EducationPage;