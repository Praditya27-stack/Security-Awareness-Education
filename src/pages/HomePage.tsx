import { Link } from 'react-router-dom';
import { BookOpen, Brain, AlertTriangle } from 'lucide-react';

/**
 * Halaman beranda dengan hero section, fitur utama, dan statistik
 */
function HomePage() {
  const features = [
    {
      icon: BookOpen,
      title: 'Edukasi Interaktif',
      description: 'Artikel ringan dan mudah dipahami tentang keamanan digital',
      link: '/edukasi'
    },
    {
      icon: Brain,
      title: 'Quiz Seru',
      description: 'Uji pengetahuan cybersecurity-mu dengan quiz menarik',
      link: '/quiz'
    },
    {
      icon: AlertTriangle,
      title: 'Simulasi Phishing',
      description: 'Experience langsung gimana cara kerja serangan phishing',
      link: '/phishing'
    }
  ];


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Internet itu Hutan
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-semibold">
              Jangan jadi mangsa! 🦁
            </p>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Belajar keamanan digital dengan cara yang fun dan gampang dipahami. 
              Dari phishing sampai password management, semua ada di sini!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/edukasi"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Mulai Belajar 🚀
              </Link>
              <Link
                to="/quiz"
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Coba Quiz 🧠
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Kenapa Harus CyberSafe? 🤔
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Platform yang bikin belajar cybersecurity jadi asik dan nggak boring!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-blue-100"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-200">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Siap Jadi Cyber Warrior? ⚔️
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join komunitas yang peduli keamanan digital. Mulai dari sekarang!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/edukasi"
                className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Baca Artikel
              </Link>
              <Link
                to="/phishing"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-emerald-600 transform hover:scale-105 transition-all duration-200"
              >
                Coba Simulasi
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;