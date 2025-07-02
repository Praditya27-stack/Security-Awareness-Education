
import { Shield, Github, Linkedin, Mail } from 'lucide-react';

/**
 * Komponen footer dengan informasi kontak dan sosial media
 */
function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">CyberSafe</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Platform edukasi keamanan digital untuk generasi muda Indonesia. 
              Belajar cybersecurity dengan cara yang fun dan interaktif!
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-slate-300 hover:text-white transition-colors">Beranda</a></li>
              <li><a href="/edukasi" className="text-slate-300 hover:text-white transition-colors">Edukasi</a></li>
              <li><a href="/quiz" className="text-slate-300 hover:text-white transition-colors">Quiz</a></li>
              <li><a href="/phishing" className="text-slate-300 hover:text-white transition-colors">Simulasi</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-400">Connect</h3>
            <p className="text-slate-300">
              Project ini dibuat untuk edukasi untuk orang awam
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400">
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;