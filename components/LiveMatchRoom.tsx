'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LiveStatsWidget from './LiveStatsWidget';

interface MatchData {
  netWorth: number[];
  gpm: number;
  kills: number;
  twitchUrl: string;
}

export default function LiveMatchRoom() {
  const [matchData, setMatchData] = useState<MatchData>({
    netWorth: [10000, 12000, 15000, 18000, 22000, 25000],
    gpm: 18203,
    kills: 50,
    twitchUrl: 'https://player.twitch.tv/?channel=your_channel&parent=localhost'
  });

  useEffect(() => {
    // Симуляция WebSocket подключения
    // В реальном проекте: const ws = new WebSocket('wss://api.yourplatform.com/live');
    
    const interval = setInterval(() => {
      setMatchData(prev => ({
        ...prev,
        netWorth: [...prev.netWorth.slice(-19), prev.netWorth[prev.netWorth.length - 1] + Math.random() * 1000],
        gpm: Math.floor(18000 + Math.random() * 500),
        kills: prev.kills + (Math.random() > 0.7 ? 1 : 0)
      }));
    }, 3000); // Обновление каждые 3 секунды

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex gap-8">
          {/* Twitch Player */}
          <div className="flex-1">
            <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
              <iframe
                src={matchData.twitchUrl}
                className="h-full w-full"
                allowFullScreen
              />
            </div>
          </div>

          {/* Live Stats Widget */}
          <LiveStatsWidget
            netWorth={matchData.netWorth}
            gpm={matchData.gpm}
            kills={matchData.kills}
          />
        </div>
      </div>
    </div>
  );
}