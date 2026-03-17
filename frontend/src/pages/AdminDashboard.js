import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FloatingBubbles from '../components/FloatingBubbles';
import GlassCard from '../components/GlassCard';
import JellyButton from '../components/JellyButton';
import { ChevronLeft, Users, Image, Printer, Mail, TrendingUp, Calendar } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentPhotos, setRecentPhotos] = useState([]);
  const [printJobs, setPrintJobs] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [photosRes, galleryRes, printRes] = await Promise.all([
        axios.get(`${API}/photos`),
        axios.get(`${API}/gallery`),
        axios.get(`${API}/print-jobs`)
      ]);

      const photos = photosRes.data || [];
      const gallery = galleryRes.data?.photos || [];
      const prints = printRes.data || [];

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const todayPhotos = gallery.filter(p => {
        const photoDate = new Date(p.timestamp);
        photoDate.setHours(0, 0, 0, 0);
        return photoDate.getTime() === today.getTime();
      });

      setStats({
        totalSessions: gallery.length,
        todaySessions: todayPhotos.length,
        emailsSent: photos.length,
        printJobs: prints.length,
        avgSessionsPerDay: Math.round(gallery.length / 7)
      });

      setRecentPhotos(gallery.slice(0, 10));
      setPrintJobs(prints.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Gagal memuat data dashboard');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass-card rounded-3xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-2xl bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} style={{ color }} />
        </div>
        <TrendingUp className="w-5 h-5 text-green-500" />
      </div>
      <h3 className="text-3xl font-bold text-[#592E39] mb-1">{value}</h3>
      <p className="text-[#8B5F6D] font-medium text-sm">{title}</p>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="candy-gradient-bg min-h-screen flex items-center justify-center">
        <GlassCard className="text-center p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-candy-bright-pink border-t-transparent mx-auto mb-4"></div>
          <p className="text-[#592E39] font-medium text-lg">Memuat dashboard...</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="candy-gradient-bg min-h-screen py-8 px-4">
      <FloatingBubbles />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="p-3 rounded-full bg-white/40 hover:bg-white/80 transition-all"
            data-testid="back-to-home-btn"
          >
            <ChevronLeft className="w-6 h-6 text-candy-bright-pink" />
          </button>
          
          <h2 className="text-3xl md:text-4xl font-bold text-[#592E39] font-['Fredoka']">
            Admin Dashboard 📊
          </h2>
          
          <div className="w-12"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Total Sessions"
            value={stats.totalSessions}
            color="#FF69B4"
          />
          <StatCard
            icon={Calendar}
            title="Hari Ini"
            value={stats.todaySessions}
            color="#FFD700"
          />
          <StatCard
            icon={Mail}
            title="Email Terkirim"
            value={stats.emailsSent}
            color="#4169E1"
          />
          <StatCard
            icon={Printer}
            title="Print Jobs"
            value={stats.printJobs}
            color="#32CD32"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <GlassCard>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#592E39] font-['Fredoka']">
                Recent Photos
              </h3>
              <Image className="w-6 h-6 text-candy-bright-pink" />
            </div>
            
            {recentPhotos.length === 0 ? (
              <p className="text-[#8B5F6D] text-center py-8">Belum ada foto</p>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {recentPhotos.map((photo) => (
                  <div key={photo.id} className="aspect-[3/8] rounded-xl overflow-hidden border-2 border-white/40">
                    <img
                      src={photo.photo_data}
                      alt={photo.frame_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#592E39] font-['Fredoka']">
                Print Queue
              </h3>
              <Printer className="w-6 h-6 text-candy-bright-pink" />
            </div>
            
            {printJobs.length === 0 ? (
              <p className="text-[#8B5F6D] text-center py-8">Tidak ada print job</p>
            ) : (
              <div className="space-y-3">
                {printJobs.map((job, idx) => (
                  <div key={idx} className="bg-white/40 rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-[#592E39]">{job.frame_name}</p>
                        <p className="text-xs text-[#8B5F6D]">
                          {new Date(job.timestamp).toLocaleString('id-ID')}
                        </p>
                      </div>
                      <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                        {job.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>

        <GlassCard>
          <h3 className="text-2xl font-bold text-[#592E39] mb-6 font-['Fredoka']">
            Quick Stats
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/40 rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-candy-bright-pink mb-1">
                {stats.avgSessionsPerDay}
              </p>
              <p className="text-sm text-[#8B5F6D] font-medium">Avg/Day</p>
            </div>
            <div className="bg-white/40 rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-candy-bright-pink mb-1">
                {Math.round((stats.emailsSent / stats.totalSessions) * 100 || 0)}%
              </p>
              <p className="text-sm text-[#8B5F6D] font-medium">Email Rate</p>
            </div>
            <div className="bg-white/40 rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-candy-bright-pink mb-1">
                {Math.round((stats.printJobs / stats.totalSessions) * 100 || 0)}%
              </p>
              <p className="text-sm text-[#8B5F6D] font-medium">Print Rate</p>
            </div>
            <div className="bg-white/40 rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-candy-bright-pink mb-1">
                100%
              </p>
              <p className="text-sm text-[#8B5F6D] font-medium">Uptime</p>
            </div>
          </div>
        </GlassCard>

        <div className="mt-6 text-center">
          <JellyButton onClick={() => navigate('/')} variant="secondary">
            Kembali ke Home
          </JellyButton>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;