import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import EducationPage from './pages/EducationPage';
import PhishingSimulation from './pages/PhishingSimulation';
import WarningPage from './pages/WarningPage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import DashboardPage from './pages/DashboardPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/edukasi" element={<EducationPage />} />
            <Route path="/phishing" element={<PhishingSimulation />} />
            <Route path="/warning" element={<WarningPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/adminlogin" element={<AdminLoginPage />} />
<Route path="/dashboard" element={
  <AdminProtectedRoute>
    <DashboardPage />
  </AdminProtectedRoute>
} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;