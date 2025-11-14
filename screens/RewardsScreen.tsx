import React from 'react';
import { Reward, ClaimedReward } from '../types';

interface RewardsScreenProps {
  sikkaBalance: number;
  rewards: Reward[];
  onClaim: (reward: Reward) => boolean;
  claimedRewards: ClaimedReward[];
}

const RewardsScreen: React.FC<RewardsScreenProps> = ({
  sikkaBalance,
  rewards,
  onClaim,
  claimedRewards,
}) => {
  const handleClaim = (reward: Reward) => {
    const success = onClaim(reward);
    if (!success) {
      alert('पर्याप्त सिक्का नहीं है');
    }
  };

  return (
    <div className="h-full overflow-y-auto pb-20">
      <div className="bg-gradient-to-b from-orange-500 to-orange-400 text-white p-4">
        <h1 className="text-2xl font-bold mb-2">बाज़ार</h1>
        <div className="text-3xl font-bold">💰 {sikkaBalance}</div>
        <p className="text-sm opacity-90">उपलब्ध सिक्का</p>
      </div>

      <div className="space-y-3 p-4">
        {rewards.map(reward => (
          <div key={reward.id} className="bg-white rounded-lg overflow-hidden shadow">
            <div className="flex gap-3">
              <img
                src={reward.imageUrl}
                alt={reward.name}
                className="w-24 h-24 object-cover"
              />
              <div className="flex-1 p-3 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm">{reward.name}</h3>
                  <p className="text-xs text-gray-600 line-clamp-2">{reward.description}</p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-lg font-bold text-orange-500">{reward.sikkaCost}</span>
                  <button
                    onClick={() => handleClaim(reward)}
                    disabled={sikkaBalance < reward.sikkaCost}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                      sikkaBalance >= reward.sikkaCost
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    दावा करें
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {claimedRewards.length > 0 && (
        <div className="p-4 border-t-2">
          <h2 className="font-bold text-sm mb-3">दावा किए गए पुरस्कार</h2>
          <div className="space-y-2">
            {claimedRewards.map((reward, index) => (
              <div key={index} className="bg-green-50 rounded p-2 text-xs border border-green-200">
                <p className="font-semibold text-green-900">✓ {reward.name}</p>
                <p className="text-green-700">
                  {new Date(reward.claimDate).toLocaleDateString('hi-IN')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsScreen;
