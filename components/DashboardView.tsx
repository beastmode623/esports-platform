'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { signOut } from 'next-auth/react';

interface DashboardProps {
  session: any;
}

// Моковые данные для демонстрации (в будущем будут подтягиваться из БД)
const playerStats = {
  tournamentsPlayed: 47,
  winRate: 68,
  totalEarnings: '$12,450',
  currentRank: 'Diamond II',
  matchesWon: 128,
  matchesLost: 61,
};

const tournamentHistory = [
  {
    id: 1,
    name: 'Dota 2 Pro League - Qualifier',
    date: '20 Августа 2026',
    result: '1-е место',
    prize: '$2,500',
    status: 'won',
  },
  {
    id: 2,
    name: 'CS2 Weekly Cup #14',
    date: '15 Августа 2026',
    result: '3-е место',
    prize: '$450',
    status: 'won',
  },
  {
    id: 3,
    name: 'Dota 2 Amateur Cup',
    date: '10 Августа 2026',
    result: 'Топ-8',
    prize: '$0',
    status: 'participated',
  },
  {
    id: 4,
    name: 'ESL One Fall Qualifier',
    date: '5 Августа 2026',
    result: '2-е место',
    prize: '$1,200',
    status: 'won',
  },
];

export default function DashboardView({ session }: DashboardProps) {
  const userName = session.user?.name || 'Игрок';
  const userImage = session.user?.image || 'https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cd6_full.jpg';
  const steamId = session.user?.id || 'Unknown';

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Header с профилем */}
      <div className="relative border-b border-white/10 bg-gradient-to-b from-[#81D8D0]/5 to-black">
        <div className="mx-auto max-w-7xl px-8 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <img 
                  src={userImage} 
                  alt={userName}
                  className="h-24 w-24 rounded-2xl border-2 border-[#81D8D0]/50 object-cover shadow-2xl shadow-[#81D8D0]/20"
                />
                <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[#50C878] border-2 border-black flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
              </motion.div>
              <div>
                <p className="text-sm text-[#81D8D0] font-medium mb-1">Добро пожаловать</p>
                <h1 className="text-4xl font-bold tracking-tight mb-2">{userName}</h1>
                <p className="text-sm text-gray-400 font-mono">SteamID: {steamId}</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-gray-300 transition-all hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30"
              >
                Выйти
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mx-auto max-w-7xl px-8 py-12">
        <h2 className="text-2xl font-semibold mb-6">Статистика</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Сыграно турниров', value: playerStats.tournamentsPlayed, color: 'text-[#81D8D0]' },
            { label: 'Винрейт', value: `${playerStats.winRate}%`, color: 'text-[#50C878]' },
            { label: 'Всего заработано', value: playerStats.totalEarnings, color: 'text-white' },
            { label: 'Текущий ранг', value: playerStats.currentRank, color: 'text-[#81D8D0]' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:border-[#81D8D0]/30 transition-colors"
            >
              <p className="text-xs text-gray-400 mb-2">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Tournament History */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">История турниров</h2>
            <button className="text-sm text-[#81D8D0] hover:underline">Показать все →</button>
          </div>
          <div className="space-y-3">
            {tournamentHistory.map((tournament, index) => (
              <motion.div
                key={tournament.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm hover:border-[#81D8D0]/30 hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-xl ${
                    tournament.status === 'won' 
                      ? 'bg-[#50C878]/10 border border-[#50C878]/30' 
                      : 'bg-white/5 border border-white/10'
                  }`}>
                    {tournament.status === 'won' ? '🏆' : '🎮'}
                  </div>
                  <div>
                    <h3 className="font-medium text-white group-hover:text-[#81D8D0] transition-colors">
                      {tournament.name}
                    </h3>
                    <p className="text-sm text-gray-400">{tournament.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${
                    tournament.status === 'won' ? 'text-[#50C878]' : 'text-gray-400'
                  }`}>
                    {tournament.result}
                  </p>
                  <p className="text-xs text-gray-400">{tournament.prize}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Быстрые действия</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-2xl border border-[#81D8D0]/30 bg-gradient-to-br from-[#81D8D0]/10 to-[#50C878]/10 p-6 text-left hover:border-[#81D8D0]/50 transition-all"
            >
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold mb-1">Найти турнир</h3>
              <p className="text-sm text-gray-400">Посмотреть доступные соревнования</p>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left hover:border-white/30 transition-all"
            >
              <div className="text-3xl mb-3">👥</div>
              <h3 className="font-semibold mb-1">Моя команда</h3>
              <p className="text-sm text-gray-400">Управление составом</p>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left hover:border-white/30 transition-all"
            >
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-semibold mb-1">Кошелёк</h3>
              <p className="text-sm text-gray-400">Баланс: $450.00</p>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="fixed bottom-8 left-8 z-50">
        <Link 
          href="/" 
          className="flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/20 border border-white/10"
        >
          ← На главную
        </Link>
      </div>
    </main>
  );
}