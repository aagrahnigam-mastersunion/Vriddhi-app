import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Tab, User, Video, Reward, ClaimedReward } from './types';
import { TABS, MOCK_VIDEOS, MOCK_REWARDS } from './constants';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import LibraryScreen from './screens/LibraryScreen';
import QuizScreen from './screens/QuizScreen';
import RankScreen from './screens/RankScreen';
import RewardsScreen from './screens/RewardsScreen';
import LoginScreen from './screens/LoginScreen';
import Notification from './components/Notification';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);
  const [user, setUser] = useState<User | null>(null);
  const [sikka, setSikka] = useState<number>(100);
  const [likedVideos, setLikedVideos] = useState<Set<number>>(new Set());
  const [watchedVideos, setWatchedVideos] = useState<Set<number>>(new Set());
  const [claimedRewards, setClaimedRewards] = useState<ClaimedReward[]>([]);
  const [streakCount, setStreakCount] = useState<number>(0);
  const [lastWatchedDate, setLastWatchedDate] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // --- Offline Mode State ---
  const [downloadingVideos, setDownloadingVideos] = useState<Map<number, number>>(new Map()); // videoId -> progress %
  const [downloadedVideoIds, setDownloadedVideoIds] = useState<Set<number>>(new Set());
  const [videoBlobUrls, setVideoBlobUrls] = useState<Map<number, string>>(new Map());
  const [videoSizes, setVideoSizes] = useState<Map<number, number>>(new Map()); // videoId -> size in bytes

  // --- Offline Mode Logic ---

  const updateDownloadProgress = (videoId: number, progress: number) => {
    setDownloadingVideos(prev => new Map(prev).set(videoId, progress));
  };

  // Helper function to simulate downloading a single video
  const downloadVideo = useCallback(async (video: Video) => {
    if (downloadedVideoIds.has(video.id) || downloadingVideos.has(video.id)) {
      return;
    }

    setDownloadingVideos(prev => new Map(prev).set(video.id, 0));

    try {
      // Simulate download progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 150));
        updateDownloadProgress(video.id, progress);
      }

      const response = await fetch(video.url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      setVideoBlobUrls(prev => new Map(prev).set(video.id, blobUrl));
      
      setDownloadedVideoIds(prev => {
          const newSet = new Set(prev);
          newSet.add(video.id);
          localStorage.setItem('vriddhi-downloaded', JSON.stringify(Array.from(newSet)));
          return newSet;
      });

      setVideoSizes(prev => {
          const newMap = new Map(prev).set(video.id, blob.size);
          localStorage.setItem('vriddhi-video-sizes', JSON.stringify(Array.from(newMap.entries())));
          return newMap;
      });

    } catch (error) {
      console.error('Failed to download video:', error);
    } finally {
      setDownloadingVideos(prev => {
        const newMap = new Map(prev);
        newMap.delete(video.id);
        return newMap;
      });
    }
  }, [downloadedVideoIds, downloadingVideos]);

  // Load downloaded video data from localStorage on initial load
  useEffect(() => {
    const savedDownloads = localStorage.getItem('vriddhi-downloaded');
    const savedSizes = localStorage.getItem('vriddhi-video-sizes');

    if (savedSizes) {
        try {
            const sizesArray: [number, number][] = JSON.parse(savedSizes);
            setVideoSizes(new Map(sizesArray));
        } catch (e) {
            console.error("Failed to parse video sizes from localStorage", e);
        }
    }

    if (savedDownloads) {
      try {
        const downloadedIds: number[] = JSON.parse(savedDownloads);
        setDownloadedVideoIds(new Set(downloadedIds));
        
        console.log('Restoring offline videos...');
        downloadedIds.forEach(id => {
            const videoToDownload = MOCK_VIDEOS.find(v => v.id === id);
            // Re-fetch to create blob URLs, but don't show progress for already downloaded files
            if(videoToDownload && !videoBlobUrls.has(id)) {
              fetch(videoToDownload.url)
                .then(res => res.blob())
                .then(blob => {
                    const blobUrl = URL.createObjectURL(blob);
                    setVideoBlobUrls(prev => new Map(prev).set(videoToDownload.id, blobUrl));
                });
            }
        });
      } catch(e) {
          console.error("Failed to parse downloaded videos from localStorage", e);
      }
    }
  }, []);

  const handleDownloadVideo = useCallback((videoId: number) => {
    const video = MOCK_VIDEOS.find(v => v.id === videoId);
    if (video) {
      downloadVideo(video);
    }
  }, [downloadVideo]);

  const handleDeleteVideo = useCallback((videoId: number) => {
    const blobUrl = videoBlobUrls.get(videoId);
    if (blobUrl) {
      URL.revokeObjectURL(blobUrl);
    }
    setVideoBlobUrls(prev => {
      const newMap = new Map(prev);
      newMap.delete(videoId);
      return newMap;
    });
    setDownloadedVideoIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(videoId);
      localStorage.setItem('vriddhi-downloaded', JSON.stringify(Array.from(newSet)));
      return newSet;
    });
    setVideoSizes(prev => {
        const newMap = new Map(prev);
        newMap.delete(videoId);
        localStorage.setItem('vriddhi-video-sizes', JSON.stringify(Array.from(newMap.entries())));
        return newMap;
    })
  }, [videoBlobUrls]);

  // Load streak data and check for validity
  useEffect(() => {
    const savedStreak = localStorage.getItem('vriddhi-streak');
    const savedDate = localStorage.getItem('vriddhi-lastWatched');
    
    if (savedStreak && savedDate) {
        const today = new Date();
        const lastDate = new Date(savedDate);
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        // Reset streak if the last watch was before yesterday
        if (lastDate.toDateString() !== today.toDateString() && lastDate.toDateString() !== yesterday.toDateString()) {
            setStreakCount(0);
            setLastWatchedDate(null);
            localStorage.removeItem('vriddhi-streak');
            localStorage.removeItem('vriddhi-lastWatched');
        } else {
            setStreakCount(parseInt(savedStreak, 10));
            setLastWatchedDate(savedDate);
        }
    }
  }, []);


  useEffect(() => {
    // Daily login bonus
    if (user) {
      const today = new Date().toDateString();
      const lastLogin = localStorage.getItem('lastLogin');
      if (lastLogin !== today) {
        setSikka(prev => prev + 20);
        localStorage.setItem('lastLogin', today);
      }
    }
  }, [user]);

  const handleLogin = (name: string, district: string, state: string) => {
    setUser({ id: 1, name, district, state });
  };
  
  const handleLikeVideo = useCallback((videoId: number) => {
    setLikedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  }, []);

  const handleShareVideo = useCallback(async (videoId: number) => {
    const video = MOCK_VIDEOS.find(v => v.id === videoId);
    if (!video) return;

    const shareData = {
        title: 'वृद्धि के साथ ज्ञान साझा करें',
        text: `यह उपयोगी वीडियो देखें: "${video.title}"`,
        url: `https://vriddhi.app/video/${video.id}`, // A dummy URL for sharing context
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            // Avoid alerting the user if they simply closed the share sheet
            if ((err as Error).name !== 'AbortError') {
                console.error('Error sharing video:', err);
                alert('वीडियो साझा नहीं किया जा सका।');
            }
        }
    } else {
        alert('आपका ब्राउज़र इस सुविधा का समर्थन नहीं करता है।');
    }
  }, []);

  const handleWatchVideo = useCallback((videoId: number) => {
    // Sikka for first watch
    if (!watchedVideos.has(videoId)) {
      setWatchedVideos(prev => new Set(prev).add(videoId));
      setSikka(prev => prev + 10);
    }

    // Streak logic
    const today = new Date();
    const todayStr = today.toDateString();

    if (lastWatchedDate !== todayStr) {
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        let newStreak = 1;
        if (lastWatchedDate === yesterdayStr) {
            newStreak = streakCount + 1;
        }

        setStreakCount(newStreak);
        setLastWatchedDate(todayStr);
        localStorage.setItem('vriddhi-streak', newStreak.toString());
        localStorage.setItem('vriddhi-lastWatched', todayStr);

        // Bonus Sikka logic & notification
        let bonus = 0;
        let message = `🔥 आपका ${newStreak} दिन का स्ट्रीक!`;

        if (newStreak > 1) { // Only show bonus notifications after the first day
            if (newStreak % 7 === 0) {
                bonus = 150;
                message = `🎉 +${bonus} सिक्का! 7-दिन का स्ट्रीक बोनस!`;
            } else if (newStreak % 3 === 0) {
                bonus = 50;
                message = `🎉 +${bonus} सिक्का! 3-दिन का स्ट्रीक बोनस!`;
            }
        }
        
        if (bonus > 0) {
            setSikka(prev => prev + bonus);
        }
        
        // Show notification for any streak update on a new day
        if (newStreak > 0) setNotification(message);
    }
  }, [watchedVideos, lastWatchedDate, streakCount]);

  const handleClaimReward = useCallback((reward: Reward) => {
    if (sikka >= reward.sikkaCost) {
      setSikka(prev => prev - reward.sikkaCost);
      const newClaimedReward = { ...reward, claimDate: new Date() };
      setClaimedRewards(prev => [...prev, newClaimedReward]);
      return true;
    }
    return false;
  }, [sikka]);

  // Create a video list where remote URLs are replaced by local blob URLs for downloaded videos
  const videosWithOfflineUrls = useMemo(() => {
    return MOCK_VIDEOS.map(video => {
      if (downloadedVideoIds.has(video.id) && videoBlobUrls.has(video.id)) {
        return { ...video, url: videoBlobUrls.get(video.id)! };
      }
      return video;
    });
  }, [downloadedVideoIds, videoBlobUrls]);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.Home:
        return <HomeScreen 
                  videos={videosWithOfflineUrls} 
                  onLike={handleLikeVideo} 
                  onWatch={handleWatchVideo}
                  onShare={handleShareVideo}
                  likedVideos={likedVideos} 
                  downloadedVideoIds={downloadedVideoIds}
                  streakCount={streakCount}
                />;
      case Tab.Library:
        return <LibraryScreen 
                  allVideos={MOCK_VIDEOS}
                  likedVideos={MOCK_VIDEOS.filter(v => likedVideos.has(v.id))}
                  downloadingVideos={downloadingVideos}
                  downloadedIds={downloadedVideoIds}
                  videoSizes={videoSizes}
                  onDownload={handleDownloadVideo}
                  onDelete={handleDeleteVideo}
                />;
      case Tab.Quiz:
        return <QuizScreen onQuizComplete={(score) => setSikka(prev => prev + score)} />;
      case Tab.Rank:
        return user ? <RankScreen currentUser={user} currentUserSikka={sikka} /> : null;
      case Tab.Rewards:
        return <RewardsScreen 
                  sikkaBalance={sikka} 
                  rewards={MOCK_REWARDS} 
                  onClaim={handleClaimReward}
                  claimedRewards={claimedRewards} 
                />;
      default:
        return <HomeScreen videos={videosWithOfflineUrls} onLike={handleLikeVideo} onWatch={handleWatchVideo} onShare={handleShareVideo} likedVideos={likedVideos} downloadedVideoIds={downloadedVideoIds} streakCount={streakCount} />;
    }
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-black max-w-md mx-auto shadow-2xl">
      {notification && (
          <Notification message={notification} onClose={() => setNotification(null)} />
      )}
      <main className="flex-1 overflow-y-hidden relative">
        {renderContent()}
      </main>
      <BottomNav tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;