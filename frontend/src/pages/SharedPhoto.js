import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FloatingBubbles from '../components/FloatingBubbles';
import GlassCard from '../components/GlassCard';
import JellyButton from '../components/JellyButton';
import { Download, Home } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SharedPhoto = () => {
  const { shareId } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSharedPhoto();
  }, [shareId]);

  const fetchSharedPhoto = async () => {
    try {
      const response = await axios.get(`${API}/share/${shareId}`);
      if (response.data.success) {
        setPhoto(response.data.photo);
      }
    } catch (error) {
      console.error('Error fetching shared photo:', error);
      toast.error('Foto tidak ditemukan atau sudah expired');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!photo) return;
    
    const link = document.createElement('a');
    link.href = photo.photo_data;
    link.download = `glowbox-${photo.frame_name}-${Date.now()}.jpg`;
    link.click();
    toast.success('Foto berhasil diunduh!');
  };

  if (loading) {
    return (
      <div className="candy-gradient-bg min-h-screen flex items-center justify-center">
        <FloatingBubbles />
        <GlassCard className="text-center p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-candy-bright-pink border-t-transparent mx-auto mb-4" />
          <p className="text-gray-700 font-medium text-lg">Memuat foto...</p>
        </GlassCard>
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="candy-gradient-bg min-h-screen flex items-center justify-center">
        <FloatingBubbles />
        <GlassCard className="text-center p-8">
          <p className="text-3xl mb-4">😢</p>
          <p className="text-gray-700 font-bold text-xl mb-2">Foto Tidak Ditemukan</p>
          <p className="text-gray-600 mb-6">Link mungkin sudah expired atau tidak valid</p>
          <JellyButton onClick={() => navigate('/')}>
            Kembali ke Home
          </JellyButton>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="candy-gradient-bg min-h-screen py-8 px-4">
      <FloatingBubbles />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Fredoka, cursive' }}>
            GlowBox
          </h1>
          <p className="text-xl text-pink-600 font-bold">Shared Photo ✨</p>
        </div>

        <div className="grid md:grid-cols-[2fr,1fr] gap-6">
          <GlassCard>
            <div className="bg-white p-4 rounded-2xl shadow-xl">
              <img
                src={photo.photo_data}
                alt={photo.frame_name}
                className="w-full rounded-lg"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-800 font-bold text-lg">{photo.frame_name}</p>
              <p className="text-gray-600 text-sm">
                Created: {new Date(photo.created_at).toLocaleDateString('id-ID')}
              </p>
            </div>
          </GlassCard>

          <div className="space-y-4">
            <GlassCard>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Download Foto
              </h3>
              <JellyButton
                onClick={handleDownload}
                className="w-full inline-flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download
              </JellyButton>
            </GlassCard>

            <GlassCard>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Info
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>✅ Foto tersimpan aman</p>
                <p>⏰ Link valid 7 hari</p>
                <p>🎨 Frame: {photo.frame_name}</p>
              </div>
            </GlassCard>

            <JellyButton
              onClick={() => navigate('/')}
              variant="secondary"
              className="w-full inline-flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Buat Foto Sendiri
            </JellyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedPhoto;
