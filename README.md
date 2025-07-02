# 🛡️ CyberSafe - Cybersecurity Awareness Web App

Platform edukasi keamanan digital yang dirancang khusus untuk generasi muda Indonesia. Aplikasi ini menggunakan pendekatan interaktif dan bahasa yang santai namun edukatif untuk mengajarkan konsep-konsep penting cybersecurity.

## 🎯 Tujuan Proyek

Meningkatkan awareness cybersecurity di kalangan anak muda melalui:
- **Edukasi interaktif** tentang threats digital terkini
- **Simulasi phishing** untuk experience langsung
- **Quiz assessment** untuk evaluasi pemahaman
- **Data analytics** untuk tracking progress

## ✨ Fitur Utama

### 🏠 Landing Page
- Hero section dengan slogan menarik: "Internet itu Hutan, Jangan jadi mangsa!"
- Navigasi intuitif ke semua fitur utama
- Statistics dan testimonials untuk credibility
- Responsive design untuk semua device

### 📚 Halaman Edukasi
5 artikel komprehensif tentang:
- **Phishing**: Cara kerja dan pencegahan serangan
- **Password Security**: Best practices untuk password kuat
- **Two-Factor Authentication (2FA)**: Setup dan implementasi
- **Public WiFi Dangers**: Risiko dan cara aman berinternet
- **Password Manager**: Tools dan recommendation

### 🎣 Simulasi Phishing
- Interface yang menyerupai halaman login Instagram
- Data collection untuk analytics (education purpose)
- Warning page dengan penjelasan detail attack vector
- Real-world statistics tentang phishing

### 🧠 Interactive Quiz
- 10 pertanyaan tentang digital habits
- Scoring system yang comprehensive
- Personalized recommendations berdasarkan hasil
- Time tracking dan progress indicator

### 📊 Admin Dashboard
- Real-time analytics phishing attempts
- Quiz results dan performance metrics
- User engagement statistics
- Data visualization dengan charts

## 🚀 Teknologi Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS dengan custom components
- **Routing**: React Router v6
- **Database**: Firebase Firestore
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Hosting**: Ready for Netlify/Vercel deployment

## 🔧 Setup Instructions

### 1. Clone & Install
```bash
git clone [repository-url]
cd cybersecurity-awareness-app
npm install
```

### 2. Firebase Setup
1. Buat project baru di [Firebase Console](https://console.firebase.google.com)
2. Aktifkan Firestore Database
3. Copy Firebase config ke `src/utils/firebase.ts`
4. Update Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /phishing-attempts/{document} {
      allow create: if true;
      allow read: if false; // Admin only
    }
    match /quiz-results/{document} {
      allow create: if true;
      allow read: if false; // Admin only
    }
  }
}
```

### 3. Development
```bash
npm run dev
```

### 4. Build & Deploy
```bash
npm run build
npm run preview  # Test production build
```

## 📁 Struktur Project

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Main navigation
│   └── Footer.tsx      # Site footer
├── pages/              # Main page components
│   ├── HomePage.tsx    # Landing page
│   ├── EducationPage.tsx # Article hub
│   ├── PhishingSimulation.tsx # Fake Instagram login
│   ├── WarningPage.tsx # Post-phishing explanation
│   ├── QuizPage.tsx    # Interactive assessment
│   ├── ResultPage.tsx  # Quiz results & recommendations
│   └── DashboardPage.tsx # Admin analytics
├── utils/              # Utility functions
│   └── firebase.ts     # Firebase configuration & helpers
├── App.tsx             # Main app component with routing
└── main.tsx           # App entry point
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#1E40AF to #3B82F6)
- **Secondary**: Teal (#0891B2, #14B8A6)
- **Accent**: Purple (#8B5CF6), Orange (#F97316)
- **Status**: Success (#059669), Warning (#F59E0B), Error (#DC2626)

### Typography
- **Headers**: Bold, large sizes dengan proper hierarchy
- **Body**: 150% line height untuk readability
- **Code**: Monospace font untuk technical content

### Components
- **Cards**: Rounded corners, subtle shadows, hover effects
- **Buttons**: Gradient backgrounds, transform animations
- **Forms**: Focus states, validation feedback
- **Navigation**: Sticky header, mobile hamburger menu

## 📊 Data Structure

### Phishing Attempts
```typescript
interface PhishingAttempt {
  email: string;
  password: string;
  timestamp: Date;
  userAgent: string;
  ipAddress: string;
}
```

### Quiz Results
```typescript
interface QuizResult {
  score: number;
  maxScore: number;
  percentage: number;
  category: string;
  answers: Record<number, number>;
  timestamp: Date;
  timeSpent: number;
}
```

## 🔒 Security & Privacy

- **Data Protection**: Semua data encrypted dan stored securely
- **Educational Purpose**: Data phishing hanya untuk demo, tidak disalahgunakan
- **Privacy First**: Minimal data collection, transparent usage
- **Secure Firebase Rules**: Production-ready security configuration

## 📈 Analytics & Insights

Dashboard menyediakan insights tentang:
- **User Engagement**: Quiz completion rates, time spent
- **Security Awareness**: Score distributions, improvement trends
- **Phishing Susceptibility**: Simulation success rates
- **Content Performance**: Popular articles, effective messaging

## 🎓 Educational Value

Project ini cocok untuk:
- **Portfolio Cybersecurity Internship**: Menunjukkan pemahaman security awareness
- **Academic Projects**: Research tentang cybersecurity education
- **Community Outreach**: Platform untuk edukasi publik
- **Professional Development**: Demonstrate full-stack development skills

## 🚧 Future Enhancements

- **Multi-language Support**: English, regional languages
- **Advanced Simulations**: Different attack vectors (smishing, vishing)
- **Gamification**: Badges, leaderboards, challenges
- **Mobile App**: React Native version
- **AI Integration**: Personalized learning paths
- **Enterprise Features**: Organization dashboards, bulk training

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

Butuh help dengan setup atau development? 
- Check [Issues](https://github.com/username/repo/issues) untuk common problems
- Create new issue untuk bug reports atau feature requests
- Join [Discussions](https://github.com/username/repo/discussions) untuk community support

## 📄 License

MIT License - feel free to use this project for educational purposes, portfolio, atau commercial applications.

---

**Dibuat dengan ❤️ untuk meningkatkan cybersecurity awareness di Indonesia**

*"Internet itu hutan, jangan jadi mangsa - jadilah predator yang smart!"* 🦁🛡️