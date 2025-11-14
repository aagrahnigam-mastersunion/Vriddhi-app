import React, { useState } from 'react';
import { INDIA_STATES_DISTRICTS } from '../data/locations';

interface LoginScreenProps {
  onLogin: (name: string, district: string, state: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');

  const states = Object.keys(INDIA_STATES_DISTRICTS);
  const districts = state ? INDIA_STATES_DISTRICTS[state as keyof typeof INDIA_STATES_DISTRICTS] || [] : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && state && district) {
      onLogin(name, district, state);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-500 to-orange-400 p-4 max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">वृद्धि</h1>
        <p className="text-white/80">आर्थिक साक्षरता में आपका साथी</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full bg-white rounded-xl p-6 shadow-xl space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            आपका नाम
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="नाम दर्ज करें"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            राज्य
          </label>
          <select
            value={state}
            onChange={e => {
              setState(e.target.value);
              setDistrict('');
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            <option value="">राज्य चुनें</option>
            {states.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            जिला
          </label>
          <select
            value={district}
            onChange={e => setDistrict(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
            disabled={!state}
          >
            <option value="">जिला चुनें</option>
            {districts.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors mt-6"
        >
          आरंभ करें
        </button>
      </form>

      <p className="text-white/60 text-xs mt-6 text-center">
        बिना किसी साइन अप के शुरू करें। आपका डेटा स्थानीय रूप से सहेजा जाता है।
      </p>
    </div>
  );
};

export default LoginScreen;
