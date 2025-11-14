import React from 'react';
import { Video } from '../types';

interface HomeScreenProps {
  videos: Video[];
  onLike: (videoId: number) => void;
  onWatch: (videoId: number) => void;
  onShare: (videoId: number) => void;
  likedVideos: Set<number>;
  downloadedVideoIds: Set<number>;
  streakCount: number;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  videos,
  onLike,
  onWatch,
  onShare,
  likedVideos,
  downloadedVideoIds,
  streakCount,
}) => {
  return (
    <div className="h-full overflow-y-auto pb-20">
      <div className="p-4 bg-gradient-to-b from-orange-500 to-orange-400 text-white">
        <h1 className="text-3xl font-bold mb-2">वृद्धि</h1>
        <div className="flex items-center gap-2">
          <span>🔥 स्ट्रीक:</span>
          <span className="text-2xl font-bold">{streakCount}</span>
        </div>
      </div>

      <div className="space-y-4 p-4">
        {videos.slice(0, 5).map(video => (
          <div key={video.id} className="bg-white rounded-lg overflow-hidden shadow">
            <div className="relative bg-black h-40">
              <video
                className="w-full h-full object-cover cursor-pointer"
                src={video.url}
                onClick={() => onWatch(video.id)}
                preload="metadata"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => onWatch(video.id)}>
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-bold text-sm line-clamp-2">{video.title}</h3>
              <p className="text-xs text-gray-600 line-clamp-1">{video.description}</p>
              <p className="text-xs text-gray-500 mt-1">by {video.author}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => onLike(video.id)}
                  className={`flex-1 py-1 rounded text-xs font-semibold transition-colors ${
                    likedVideos.has(video.id)
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {likedVideos.has(video.id) ? '❤️ पसंद' : '🤍 पसंद'}
                </button>
                <button
                  onClick={() => onShare(video.id)}
                  className="flex-1 py-1 rounded text-xs font-semibold bg-gray-200 text-gray-700 transition-colors hover:bg-gray-300"
                >
                  📤 शेयर
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
