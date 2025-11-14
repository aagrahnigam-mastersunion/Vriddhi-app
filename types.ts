
export enum Tab {
  Home = 'गृह',
  Library = 'ज्ञान',
  Quiz = 'खेल',
  Rank = 'लीडरबोर्ड',
  Rewards = 'बाज़ार',
}

export interface User {
  id: number;
  name: string;
  district: string;
  state: string;
}

export interface Video {
  id: number;
  url: string;
  title: string;
  description: string;
  author: string;
  topic: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Quiz {
  id: number;
  title: string;
  topic: string;
  questions: Question[];
}

export interface Reward {
  id: number;
  name: string;
  description: string;
  sikkaCost: number;
  iapCost: number; // in INR
  value: number; // in INR
  imageUrl: string;
}

export interface ClaimedReward extends Reward {
    claimDate: Date;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  district: string;
  state: string;
  sikka: number;
  isCurrentUser?: boolean;
}
