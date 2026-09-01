'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';

// База данных турниров (в реальном проекте это будет Prisma + PostgreSQL)
const tournamentsDB: Record<string, {
  title: string;
  game: 'Dota 2' | 'CS2';
  prizePool: string;
  status: string;
  startDate: string;
  description: string;
  format: string;
  region: string;
  entryFee: string;
  teams: { name: string; logo: string; seed: number }[];
}> = {
  'dota-2-pro-league': {
    title: "Dota 2 Pro League",
    game: "Dota 2",
    prizePool: "$2,500,000",
    status: "Регистрация открыта",
    startDate: "15 Сентября 2026",
    description: "Крупнейший турнир сезона с участием лучших команд мира. Формат: Double Elimination, Best of 3 на всех стадиях кроме гранд-финала (Best of 5). Призовой фонд распределяется между топ-8 командами.",
    format: "5x5",
    region: "EEU / Global",
    entryFee: "Бесплатно",
    teams: [
      { name: "Team Spirit", logo: "🐉", seed: 1 },
      { name: "Gaimin Gladiators", logo: "🛡️", seed: 2 },
      { name: "Team Liquid", logo: "💧", seed: 3 },
      { name: "Xtreme Gaming", logo: "⚡", seed: 4 },
    ]
  },
  'cs2-major-finals': {
    title: "CS2 Major Finals",
    game: "CS2",
    prizePool: "$1,000,000",
    status: "Playoffs",
    startDate: "22 Октября 2026",
    description: "Финальная стадия мейджора по Counter-Strike 2. Легендарная арена, Sold Out билеты, трансляция на 12 языках. Формат: Single Elimination, все матчи Best of 3.",
    format: "5x5",
    region: "Global",
    entryFee: "По инвайту",
    teams: [
      { name: "Natus Vincere", logo: "🟡", seed: 1 },
      { name: "FaZe Clan", logo: "🔴", seed: 2 },
      { name: "Vitality", logo: "", seed: 3 },
      { name: "MOUZ", logo: "", seed: 4 },
    ]
  },
  'dota-2-amateur-cup': {
    title: "Dota 2 Amateur Cup",
    game: "Dota 2",
    prizePool: "$50,000",
    status: "Регистрация открыта",
    startDate: "5 Ноября 2026",
    description: "Открытый турнир для любителей и полупрофессиональных команд. Идеальная возможность заявить о себе перед скаутами. Все матчи транслируются на официальном канале.",
    format: "5x5",
    region: "CIS",
    entryFee: "$10 / команда",
    teams: [
      { name: "Team Phoenix", logo: "🔥", seed: 1 },
      { name: "Shadow Wolves", logo: "🐺", seed: 2 },
      { name: "Cyber Bears", logo: "🐻", seed: 3 },
      { name: "Digital Storm", logo: "⛈️", seed: 4 },
    ]
  }
};

export default function TournamentPage() {
  const params = useParams();
  const slug = params.id as string;
  const tournament = tournamentsDB[slug];

  // Если турнир не найден — показываем красивую 404
  if (!tournament) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-8xl font-bold text-[#81D8D0] mb-4"
          >
            404
          </motion.h1>
          <p className="text-xl text-gray-400 mb-8">Турнир не найден или был удалён</p>
          <Link 
            href="/" 
            className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold text-black transition-all hover:bg-[#81D8D0]"
          >
            ← Вернуться на главную
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Header */}
      <div className="relative h-80 w-full overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#50C878]/20 via-black to-black" />
        
        <div className="relative z-20 mx-auto max-w-7xl px-8 pt-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block rounded-full bg-[#81D8D0]/10 px-4 py-1.5 text-sm font-medium text-[#81D8D0] mb-4 border border-[#81D8D0]/20">
              {tournament.game}
            </span>
            <h1 className="text-5xl font-bold tracking-tight mb-4">{tournament.title}</h1>
            <div className="flex items-center gap-6 text-gray-400">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#50C878] animate-pulse" />
                {tournament.status}
              </span>
              <span>📅 {tournament.startDate}</span>
              <span className="text-2xl font-semibold text-white">{tournament.prizePool}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="mx-auto max-w-7xl px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Description & Teams */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">О турнире</h2>
            <p className="text-gray-400 leading-relaxed text-lg">{tournament.description}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 text-white">Участники (Посев)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tournament.teams.map((team, index) => (
                <motion.div 
                  key={team.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm hover:border-[#81D8D0]/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{team.logo}</span>
                    <span className="font-medium text-lg">{team.name}</span>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-gray-400">Seed #{team.seed}</span>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Registration Card */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="sticky top-8 rounded-3xl border border-[#81D8D0]/30 bg-white/5 backdrop-blur-xl p-8 shadow-2xl"
          >
            <h3 className="text-xl font-semibold mb-6">Регистрация</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Взнос</span>
                <span className="text-white font-medium">{tournament.entryFee}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Формат</span>
                <span className="text-white font-medium">{tournament.format}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Регион</span>
                <span className="text-white font-medium">{tournament.region}</span>
              </div>
            </div>

            <button className="w-full rounded-xl bg-gradient-to-r from-[#50C878] to-[#81D8D0] py-4 text-base font-bold text-black transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-[#50C878]/20">
              Подать заявку
            </button>
            
            <p className="mt-4 text-xs text-center text-gray-500">
              Требуется верификация Steam аккаунта
            </p>
          </motion.div>
        </div>

      </div>

      {/* Back Button */}
      <div className="fixed bottom-8 left-8">
        <Link href="/" className="flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/20">
          ← На главную
        </Link>
      </div>
    </main>
  );
}