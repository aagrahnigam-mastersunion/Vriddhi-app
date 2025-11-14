import React, { useState } from 'react';
import { Video } from '../types';

interface LibraryScreenProps {
  allVideos: Video[];
  likedVideos: Video[];
  downloadingVideos: Map<number, number>;
  downloadedIds: Set<number>;
  videoSizes: Map<number, number>;
  onDownload: (videoId: number) => void;
  onDelete: (videoId: number) => void;
}

const LibraryScreen: React.FC<LibraryScreenProps> = ({
  allVideos,
  likedVideos,
  downloadingVideos,
  downloadedIds,
  videoSizes,
  onDownload,
  onDelete,
}) => {
  const [tab, setTab] = useState<'all' | 'liked' | 'downloaded'>('all');

  const getVideosForTab = () => {
    switch (tab) {
      case 'liked':
        return likedVideos;
      case 'downloaded':
        return allVideos.filter(v => downloadedIds.has(v.id));
      default:
        return allVideos;
    }
  };

  const getTotalSize = () => {
    let total = 0;
    downloadedIds.forEach(id => {
      const size = videoSizes.get(id) || 0;
      total += size;
    });
    return (total / (1024 * 1024)).toFixed(2);
  };

  const videos = getVideosForTab();

  return (
    <div className="h-full overflow-y-auto pb-20">
      <div className="flex gap-2 p-4 border-b sticky top-0 bg-white">
        {(['all', 'liked', 'downloaded'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
              tab === t
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {t === 'all' && 'सभी'}
            {t === 'liked' && 'पसंद'}
            {t === 'downloaded' && 'डाउनलोड'}
          </button>
        ))}
      </div>

      {tab === 'downloaded' && (
        <div className="p-4 bg-blue-50 border-b">
          <p className="text-sm text-blue-900">कुल उपयोग: {getTotalSize()} MB</p>
        </div>
      )}

      <div className="space-y-3 p-4">
        {videos.length === 0 ? (
          <p className="text-center text-gray-500 py-8">कोई वीडियो नहीं</p>
        ) : (
          videos.map(video => {
            const isDownloading = downloadingVideos.has(video.id);
            const isDownloaded = downloadedIds.has(video.id);
            const progress = downloadingVideos.get(video.id) || 0;
            const size = videoSizes.get(video.id);

            return (
              <div key={video.id} className="bg-white rounded-lg p-3 shadow">
                <h3 className="font-bold text-sm mb-2">{video.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{video.description}</p>

                {isDownloaded && size && (
                  <p className="text-xs text-green-600 mb-2">
                    ✓ डाउनलोड किया गया - {(size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                )}

                {isDownloading && (
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}

                <div className="flex gap-2">
                  {!isDownloaded && !isDownloading && (
                    <button
                      onClick={() => onDownload(video.id)}
                      className="flex-1 py-1 rounded text-xs font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                    >
                      ⬇️ डाउनलोड
                    </button>
                  )}
                  {isDownloading && (
                    <button disabled className="flex-1 py-1 rounded text-xs font-semibold bg-gray-300 text-gray-700">
                      डाउनलोड हो रहा है...
                    </button>
                  )}
                  {isDownloaded && (
                    <button
                      onClick={() => onDelete(video.id)}
                      className="flex-1 py-1 rounded text-xs font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                      🗑️ हटाएं
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LibraryScreen;
