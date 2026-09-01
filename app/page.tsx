'use client';

import { useState } from 'react';
import TournamentCard from '@/components/TournamentCard';
import LiveMatchRoom from '@/components/LiveMatchRoom';
import VerificationModal from '@/components/VerificationModal';
import SteamAuthButton from '@/components/SteamAuthButton';

export default function Home() {
  const [showVerification, setShowVerification] = useState(false);

  return (
    <main className="min-h-screen bg-black p-8">
      {/* Hero Section */}
      <div className="mb-12 text-center pt-20 flex flex-col items-center">
        <h1 className="mb-4 text-6xl font-bold text-white">
          Esports Tournament Platform
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Premium competitive gaming experience
        </p>
        
        {/* Steam Auth Button */}
        <div className="mb-12">
          <SteamAuthButton />
        </div>
      </div>

      {/* Tournament Cards */}
      <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <TournamentCard
          title="Dota 2 Pro League"
          game="Dota 2"
          prizePool="$2,500,000"
          isLive={true}
          participants={128}
          maxParticipants={128}
          stage="Group Stage - 78% Complete"
        />
        <TournamentCard
          title="CS2 Major Finals"
          game="CS2"
          prizePool="$1,000,000"
          isLive={true}
          participants={32}
          maxParticipants={32}
          stage="Playoffs"
        />
        <TournamentCard
          title="Dota 2 Amateur Cup"
          game="Dota 2"
          prizePool="$50,000"
          isLive={false}
          participants={45}
          maxParticipants={64}
          stage="Registration Open"
        />
      </div>

      {/* Live Match Room */}
      <div className="mb-12 max-w-7xl mx-auto">
        <h2 className="mb-6 text-3xl font-bold text-white">Live Match</h2>
        <LiveMatchRoom />
      </div>

      {/* Verification Button */}
      <div className="text-center pb-20">
        <button
          onClick={() => setShowVerification(true)}
          className="rounded-xl bg-gradient-to-r from-[#50C878] to-[#81D8D0] px-8 py-4 text-lg font-semibold text-black transition-all hover:opacity-90"
        >
          Start Verification
        </button>
      </div>

      {/* Verification Modal */}
      <VerificationModal
        isOpen={showVerification}
        onClose={() => setShowVerification(false)}
      />
    </main>
  );
}