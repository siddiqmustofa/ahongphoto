import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FloatingBubbles from '../components/FloatingBubbles';
import GlassCard from '../components/GlassCard';
import JellyButton from '../components/JellyButton';
import { ChevronLeft, Trash2, Download, Share2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Gallery = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await axios.get(`${API}/gallery`);
      if (response.data.success) {
        setPhotos(response.data.photos);
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
      toast.error('Gagal memuat galeri');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (photoId) => {
    try {
      await axios.delete(`${API}/gallery/${photoId}`);
      setPhotos(photos.filter(p => p.id !== photoId));
      setSelectedPhoto(null);
      toast.success('Foto berhasil dihapus!');
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast.error('Gagal menghapus foto');
    }
  };

  const handleDownload = (photo) => {
    const link = document.createElement('a');
    link.href = photo.photo_data;
    link.download = `glowbox-${photo.frame_name}-${Date.now()}.jpg`;
    link.click();
    toast.success('Foto berhasil diunduh!');
  };

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
            Gallery Foto 🖼️
          </h2>
          
          <div className="w-12"></div>
        </div>

        {loading ? (
          <GlassCard className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-candy-bright-pink border-t-transparent mx-auto mb-4"></div>
            <p className="text-[#592E39] font-medium text-lg">Memuat galeri...</p>
          </GlassCard>
        ) : photos.length === 0 ? (
          <GlassCard className="text-center py-20">
            <p className="text-[#592E39] font-bold text-2xl mb-4">Belum ada foto 😢</p>
            <p className="text-[#8B5F6D] mb-6">Ambil foto pertama Anda sekarang!</p>
            <JellyButton onClick={() => navigate('/')}>Mulai Photobooth</JellyButton>
          </GlassCard>
        ) : (
          <>
            <GlassCard className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[#592E39] font-bold text-lg">
                  Total: {photos.length} foto
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <motion.div
                    key={photo.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPhoto(photo)}
                    className="cursor-pointer relative aspect-[3/8] rounded-2xl overflow-hidden border-2 border-white/40 hover:border-candy-bright-pink transition-all"
                    data-testid={`gallery-photo-${photo.id}`}
                  >
                    <img
                      src={photo.photo_data}
                      alt={photo.frame_name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                      <p className="text-white text-xs font-bold truncate">{photo.frame_name}</p>
                      <p className="text-white/80 text-[10px]">{photo.frame_category}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </>
        )}
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full"
            >
              <GlassCard>
                <div className="aspect-[3/8] rounded-2xl overflow-hidden mb-4">
                  <img
                    src={selectedPhoto.photo_data}
                    alt={selectedPhoto.frame_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center mb-4">
                  <p className="text-[#592E39] font-bold text-xl">{selectedPhoto.frame_name}</p>
                  <p className="text-[#8B5F6D] text-sm">{selectedPhoto.frame_category}</p>
                  <p className="text-[#8B5F6D] text-xs mt-1">
                    {new Date(selectedPhoto.timestamp).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <JellyButton
                    variant="secondary"
                    onClick={() => handleDownload(selectedPhoto)}
                    className="inline-flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </JellyButton>
                  <JellyButton
                    variant="secondary"
                    onClick={() => {
                      navigator.share({
                        title: 'GlowBox Photo',
                        text: `Check out my ${selectedPhoto.frame_name} photo!`,
                        url: selectedPhoto.photo_data
                      }).catch(() => toast.error('Share tidak didukung'));
                    }}
                    className="inline-flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </JellyButton>
                  <JellyButton
                    variant="secondary"
                    onClick={() => handleDelete(selectedPhoto.id)}
                    className="inline-flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                    Hapus
                  </JellyButton>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;