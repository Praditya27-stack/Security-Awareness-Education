import { useState, useEffect } from 'react';
import { 
  Users, 
  AlertTriangle, 
  Brain, 
  TrendingUp, 
  Calendar,
  Clock,
  Mail,
  Shield,
  BarChart3
} from 'lucide-react';
import { getPhishingAttempts, getQuizResults } from '../utils/firebase';

/**
 * Dashboard admin untuk melihat statistik phishing attempts dan quiz results
 * Menampilkan data dalam bentuk chart dan tabel
 */
function DashboardPage() {
  const [phishingData, setPhishingData] = useState<any[]>([]);
  const [quizData, setQuizData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setError(null); // reset error before loading
    console.log('Loading dashboard data...');
    try {
      const [phishing, quiz] = await Promise.all([
        getPhishingAttempts(),
        getQuizResults()
      ]);
      console.log('Phishing data:', phishing);
      console.log('Quiz data:', quiz);
      setPhishingData(Array.isArray(phishing) ? phishing : []);
      setQuizData(Array.isArray(quiz) ? quiz : []);
    } catch (error: any) {
      setError(error?.message || 'Gagal memuat data dashboard.');
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalPhishingAttempts: phishingData?.length || 0,
    totalQuizTaken: quizData?.length || 0,
    averageQuizScore: quizData?.length > 0 
      ? Math.round(quizData.reduce((sum, quiz) => sum + (quiz?.percentage || 0), 0) / quizData.length)
      : 0,
    todayPhishing: phishingData?.filter(attempt => {
      const today = new Date().toDateString();
      try {
        // Defensive: attempt.timestamp might not exist or toDate might not be a function
        return attempt?.timestamp?.toDate && new Date(attempt.timestamp.toDate()).toDateString() === today;
      } catch {
        return false;
      }
    }).length || 0
  };

  const quizCategories = {
    'Cyber Warrior': quizData?.filter(q => q?.percentage >= 80).length || 0,
    'Digital Defender': quizData?.filter(q => q?.percentage >= 60 && q?.percentage < 80).length || 0,
    'Security Aware': quizData?.filter(q => q?.percentage >= 40 && q?.percentage < 60).length || 0,
    'Security Newbie': quizData?.filter(q => q?.percentage < 40).length || 0,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-bold">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={loadDashboardData}
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            CyberSafe Dashboard 📊
          </h1>
          <p className="text-xl text-gray-600">
            Analytics dan insights dari platform edukasi cybersecurity
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">Phishing Attempts</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalPhishingAttempts}</p>
              </div>
              <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>
            <p className="text-gray-600 text-sm mt-2">
              {stats.todayPhishing} attempts today
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Quiz Completed</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalQuizTaken}</p>
              </div>
              <Brain className="h-12 w-12 text-blue-500" />
            </div>
            <p className="text-gray-600 text-sm mt-2">
              Total assessments taken
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Avg Quiz Score</p>
                <p className="text-3xl font-bold text-gray-800">{stats.averageQuizScore}%</p>
              </div>
              <TrendingUp className="h-12 w-12 text-green-500" />
            </div>
            <p className="text-gray-600 text-sm mt-2">
              Overall awareness level
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Active Users</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalQuizTaken + stats.totalPhishingAttempts}</p>
              </div>
              <Users className="h-12 w-12 text-purple-500" />
            </div>
            <p className="text-gray-600 text-sm mt-2">
              Unique interactions
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'phishing', label: 'Phishing Data', icon: AlertTriangle },
                { id: 'quiz', label: 'Quiz Results', icon: Brain }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Quiz Categories Chart */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Quiz Performance Distribution</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(quizCategories).map(([category, count]) => (
                      <div key={category} className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-gray-800 mb-2">{count}</div>
                        <div className="text-sm text-gray-600">{category}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${stats.totalQuizTaken > 0 ? (count / stats.totalQuizTaken) * 100 : 0}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    {[...phishingData, ...quizData]
                      .sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate())
                      .slice(0, 5)
                      .map((activity, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0">
                            {activity.email ? (
                              <AlertTriangle className="h-6 w-6 text-red-500" />
                            ) : (
                              <Brain className="h-6 w-6 text-blue-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">
                              {activity.email ? 'Phishing Attempt' : 'Quiz Completed'}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {activity.email || `Score: ${activity.percentage}%`}
                            </p>
                          </div>
                          <div className="text-gray-500 text-sm">
                            {new Date(activity.timestamp.toDate()).toLocaleDateString('id-ID')}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'phishing' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Phishing Simulation Data</h3>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Timestamp</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">User Agent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {phishingData.map((attempt, index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <span className="font-mono">{attempt.email}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span>{new Date(attempt.timestamp.toDate()).toLocaleString('id-ID')}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                            {attempt.userAgent}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Quiz Results Data</h3>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Score</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Category</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Time Spent</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quizData.map((result, index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${
                                result.percentage >= 80 ? 'bg-green-500' :
                                result.percentage >= 60 ? 'bg-blue-500' :
                                result.percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}></div>
                              <span className="font-semibold">{result.percentage}%</span>
                              <span className="text-gray-500">({result.score}/{result.maxScore})</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                              {result.category}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {Math.floor(result.timeSpent / 60)}m {result.timeSpent % 60}s
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span>{new Date(result.timestamp.toDate()).toLocaleDateString('id-ID')}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-6 w-6 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">
                🔒 Security & Privacy Notice
              </h3>
              <p className="text-yellow-700 text-sm leading-relaxed">
                Dashboard ini menampilkan data untuk tujuan edukasi dan analisis cybersecurity awareness. 
                Semua data phishing simulation disimpan dengan aman dan hanya digunakan untuk keperluan 
                demonstrasi keamanan digital. Data pribadi pengguna dilindungi sesuai dengan standar keamanan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;