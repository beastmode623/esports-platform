'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface TournamentCardProps {
  title: string;
  game: 'Dota 2' | 'CS2';
  prizePool: string;
  isLive: boolean;
  participants: number;
  maxParticipants: number;
  stage?: string;
}

export default function TournamentCard({ 
  title, game, prizePool, isLive, participants, maxParticipants, stage 
}: TournamentCardProps) {
  // Генерируем безопасный URL из названия турнира
  const slug = title.toLowerCase().replace(/\s+/g, '-');

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl transition-all hover:border-[#81D8D0]/50 hover:bg-white/10"
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#50C878]/20 blur-3xl transition-opacity opacity-0 group-hover:opacity-100" />
      
      <div className="relative z-10 mb-4 flex items-center justify-between">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-[#81D8D0]">
          {game}
        </span>
        {isLive && (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-[#50C878]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#50C878] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#50C878]"></span>
            </span>
            LIVE
          </span>
        )}
      </div>

      <h3 className="relative z-10 mb-2 text-xl font-semibold tracking-tight text-white">
        {title}
      </h3>

      <div className="relative z-10 mb-6">
        <p className="text-sm text-gray-400">Призовой фонд</p>
        <p className="text-2xl font-bold text-white">{prizePool}</p>
      </div>

      {stage && (
        <div className="relative z-10 mb-4">
          <p className="text-xs text-gray-400">{stage}</p>
        </div>
      )}

      <div className="relative z-10">
        <div className="mb-2 flex justify-between text-xs text-gray-400">
          <span>Участники</span>
          <span>{participants} / {maxParticipants}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(participants / maxParticipants) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-[#50C878] to-[#81D8D0]" 
          />
        </div>
      </div>

      <Link 
        href={`/tournament/${slug}`} 
        className="block relative z-10 mt-6 w-full rounded-xl bg-white py-3 text-center text-sm font-semibold text-black transition-all hover:bg-[#81D8D0] hover:text-black active:scale-95"
      >
        Подробнее
      </Link>
    </motion.div>
  );
}