import React, { useState, useMemo } from 'react';
import { User, LeaderboardEntry } from '../types';
import { MOCK_ALL_USERS } from '../constants';

interface RankScreenProps {
  currentUser: User;
  currentUserSikka: number;
}

const RankScreen: React.FC<RankScreenProps> = ({ currentUser, currentUserSikka }) => {
  const [filter, setFilter] = useState<'all' | 'state' | 'district'>('all');

  const leaderboard = useMemo(() => {
    let users = MOCK_ALL_USERS;

    if (filter === 'state') {
      users = users.filter(u => u.state === currentUser.state);
    } else if (filter === 'district') {
      users = users.filter(u => u.district === currentUser.district);
    }

    const sorted = users
      .sort((a, b) => b.sikka - a.sikka)
      .map((user, index) => ({
        rank: index + 1,
        ...user,
        isCurrentUser: user.name === currentUser.name && user.district === currentUser.district,
      }));

    return sorted;
  }, [filter, currentUser]);

  const currentUserRank = leaderboard.find(u => u.isCurrentUser);

  return (
    <div className="h-full flex flex-col pb-20">
      <div className="bg-gradient-to-b from-orange-500 to-orange-400 text-white p-4">
        <h1 className="text-2xl font-bold mb-3">लीडरबोर्ड</h1>
        {currentUserRank && (
          <div className="bg-white/20 rounded-lg p-3 mb-3">
            <p className="text-xs opacity-90">तुम्हारा रैंक</p>
            <div className="flex justify-between items-center mt-1">
              <span className="text-2xl font-bold">#{currentUserRank.rank}</span>
              <span className="text-xl font-bold">{currentUserSikka} सिक्का</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 p-4 border-b sticky top-0 bg-white">
        {(['all', 'state', 'district'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
              filter === f
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {f === 'all' && 'सभी'}
            {f === 'state' && 'राज्य'}
            {f === 'district' && 'जिला'}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2 p-4">
          {leaderboard.slice(0, 50).map(entry => (
            <div
              key={`${entry.rank}-${entry.name}`}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                entry.isCurrentUser
                  ? 'bg-orange-100 border-2 border-orange-500'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <div className="text-xl font-bold w-8 text-center">
                {entry.rank === 1 && '🥇'}
                {entry.rank === 2 && '🥈'}
                {entry.rank === 3 && '🥉'}
                {entry.rank > 3 && <span className="text-sm">{entry.rank}</span>}
              </div>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${entry.isCurrentUser ? 'text-orange-700' : ''}`}>
                  {entry.name}
                </p>
                <p className="text-xs text-gray-600">{entry.district}, {entry.state}</p>
              </div>
              <div className="font-bold text-orange-500 text-lg">{entry.sikka}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RankScreen;
