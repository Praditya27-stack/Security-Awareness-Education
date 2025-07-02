import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Clock, CheckCircle, X, ArrowRight } from 'lucide-react';
import { saveQuizResult } from '../utils/firebase';

/**
 * Halaman quiz dengan 10 pertanyaan tentang kebiasaan digital
 * Hasil quiz akan disimpan ke Firebase dan redirect ke halaman result
 */
function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 menit
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Quiz questions dengan scoring system
  const questions = [
    {
      id: 1,
      question: "Kamu dapet email dari 'bank' yang bilang akun akan ditutup dalam 24 jam dan minta klik link. Apa yang kamu lakuin?",
      options: [
        { text: "Langsung klik link dan isi data biar akun nggak ditutup", score: 0 },
        { text: "Telepon bank langsung untuk konfirmasi", score: 10 },
        { text: "Forward email ke temen buat minta pendapat", score: 3 },
        { text: "Ignore aja, mungkin spam", score: 7 }
      ]
    },
    {
      id: 2,
      question: "Password yang kamu pakai untuk akun penting biasanya kayak gimana?",
      options: [
        { text: "Nama + tanggal lahir, gampang diingat", score: 0 },
        { text: "Kombinasi huruf, angka, simbol yang acak", score: 10 },
        { text: "Kata favorit + 123", score: 3 },
        { text: "Password yang sama untuk semua akun", score: 0 }
      ]
    },
    {
      id: 3,
      question: "Seberapa sering kamu update password akun-akun penting?",
      options: [
        { text: "Nggak pernah, ribet ah", score: 0 },
        { text: "Setiap 3-6 bulan sekali", score: 10 },
        { text: "Cuma kalau ada notifikasi security breach", score: 7 },
        { text: "Setahun sekali pas inget", score: 3 }
      ]
    },
    {
      id: 4,
      question: "Kamu lagi di cafe dan butuh internet. WiFi 'FreeWiFi_Cafe' nggak ada password. Apa yang kamu lakuin?",
      options: [
        { text: "Connect langsung, gratis soalnya", score: 0 },
        { text: "Connect tapi nggak buka yang sensitif", score: 5 },
        { text: "Tanya staff cafe dulu ini WiFi resmi atau bukan", score: 8 },
        { text: "Pakai hotspot sendiri aja", score: 10 }
      ]
    },
    {
      id: 5,
      question: "Kamu punya 2FA (Two-Factor Authentication) di akun-akun penting nggak?",
      options: [
        { text: "Apaan tuh 2FA? Nggak tau", score: 0 },
        { text: "Ada di beberapa akun penting aja", score: 7 },
        { text: "Semua akun penting udah pakai 2FA", score: 10 },
        { text: "Pengen aktifin tapi ribet setupnya", score: 3 }
      ]
    },
    {
      id: 6,
      question: "Ada yang DM kamu di Instagram ngaku influencer dan nawarin endorse. Gimana responnya?",
      options: [
        { text: "Excited! Langsung kasih data pribadi", score: 0 },
        { text: "Cek profil mereka dulu, riset tentang brand", score: 8 },
        { text: "Tanya temen yang udah pernah endorse", score: 6 },
        { text: "Ignore, banyak scammer soalnya", score: 10 }
      ]
    },
    {
      id: 7,
      question: "Kalau download app baru, kamu biasanya gimana soal permissions yang diminta?",
      options: [
        { text: "Allow all, yang penting appnya jalan", score: 0 },
        { text: "Baca dulu permission apa aja yang diminta", score: 10 },
        { text: "Allow yang penting-penting aja", score: 7 },
        { text: "Nggak pernah perhatiin, langsung install", score: 0 }
      ]
    },
    {
      id: 8,
      question: "Kamu dapet link dari temen di WhatsApp yang katanya 'harus lihat ini, viral banget!'. Respon kamu?",
      options: [
        { text: "Langsung klik, penasaran soalnya", score: 0 },
        { text: "Tanya temen dulu ini link apaan", score: 8 },
        { text: "Cek dulu linknya ke website apa", score: 10 },
        { text: "Klik aja tapi siap-siap close kalau aneh", score: 3 }
      ]
    },
    {
      id: 9,
      question: "Seberapa sering kamu backup data penting (foto, dokumen, dll)?",
      options: [
        { text: "Never, males ribet", score: 0 },
        { text: "Otomatis ke cloud storage", score: 10 },
        { text: "Sesekali kalau inget", score: 5 },
        { text: "Cuma pas mau ganti HP", score: 3 }
      ]
    },
    {
      id: 10,
      question: "Kamu sharing info pribadi di social media sampai sejauh mana?",
      options: [
        { text: "Semua dibagi, biar temen tau kegiatan gue", score: 0 },
        { text: "Cuma yang general aja, nggak detail", score: 7 },
        { text: "Privacy setting ketat, cuma close friends", score: 10 },
        { text: "Jarang posting yang personal", score: 8 }
      ]
    }
  ];

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Auto submit when time runs out
      handleSubmit();
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    setAnswers({
      ...answers,
      [questionId]: optionIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    Object.entries(answers).forEach(([questionId, optionIndex]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (question && question.options[optionIndex]) {
        totalScore += question.options[optionIndex].score;
      }
    });
    return totalScore;
  };

  const getScoreCategory = (score: number) => {
    if (score >= 80) return 'Cyber Warrior';
    if (score >= 60) return 'Digital Defender';
    if (score >= 40) return 'Security Aware';
    if (score >= 20) return 'Beginner Safe';
    return 'Security Newbie';
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      if (!confirm('Masih ada soal yang belum dijawab. Yakin mau submit?')) {
        return;
      }
    }

    setIsSubmitting(true);

    const score = calculateScore();
    const maxScore = questions.length * 10;
    const percentage = Math.round((score / maxScore) * 100);
    const category = getScoreCategory(percentage);

    const quizResult = {
      score,
      maxScore,
      percentage,
      category,
      answers,
      timestamp: new Date(),
      timeSpent: 600 - timeLeft
    };

    try {
      await saveQuizResult(quizResult);
      navigate('/result', { state: quizResult });
    } catch (error) {
      console.error('Error saving quiz result:', error);
      // Still navigate to results even if save fails
      navigate('/result', { state: quizResult });
    }
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            CyberSecurity Quiz 🧠
          </h1>
          <p className="text-xl text-gray-600">
            Test seberapa aware kamu tentang keamanan digital!
          </p>
        </div>

        {/* Progress & Timer */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-semibold text-gray-800">
              Pertanyaan {currentQuestion + 1} dari {questions.length}
            </div>
            <div className="flex items-center space-x-2 text-blue-600">
              <Clock className="h-5 w-5" />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
            {currentQ.question}
          </h2>

          <div className="space-y-4">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQ.id, index)}
                className={`w-full p-6 text-left rounded-xl border-2 transition-all duration-200 ${
                  answers[currentQ.id] === index
                    ? 'border-blue-500 bg-blue-50 text-blue-800'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{option.text}</span>
                  {answers[currentQ.id] === index && (
                    <CheckCircle className="h-6 w-6 text-blue-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>← Sebelumnya</span>
          </button>

          <div className="flex items-center space-x-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentQuestion
                    ? 'bg-blue-500'
                    : answers[questions[index].id] !== undefined
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Menyimpan...</span>
              ) : (
                <>
                  <span>Submit Quiz</span>
                  <CheckCircle className="h-5 w-5" />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              <span>Selanjutnya</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Quiz Info */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            💡 Tips Mengerjakan Quiz:
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Jawab dengan jujur sesuai kebiasaan kamu sehari-hari</li>
            <li>• Nggak ada jawaban benar atau salah, ini untuk evaluasi diri</li>
            <li>• Kamu punya waktu 10 menit untuk menyelesaikan semua soal</li>
            <li>• Hasil quiz akan kasih rekomendasi untuk improve security awareness kamu</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;