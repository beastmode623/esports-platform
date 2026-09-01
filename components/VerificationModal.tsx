'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'email' | 'phone' | 'steam';

export default function VerificationModal({ isOpen, onClose }: VerificationModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [steamId, setSteamId] = useState('');
  const [loading, setLoading] = useState(false);

  const steps: Step[] = ['email', 'phone', 'steam'];
  const currentStepIndex = steps.indexOf(currentStep);

  const handleNext = async () => {
    setLoading(true);
    
    // Симуляция API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex < steps.length) {
      setCurrentStep(steps[nextStepIndex]);
    } else {
      // Верификация завершена
      console.log('Verification complete:', { email, phone, steamId });
      onClose();
    }
    
    setLoading(false);
  };

  const handleBack = () => {
    const prevStepIndex = currentStepIndex - 1;
    if (prevStepIndex >= 0) {
      setCurrentStep(steps[prevStepIndex]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl"
          >
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="mb-4 flex justify-between">
                {steps.map((step, index) => (
                  <span
                    key={step}
                    className={`text-sm font-medium capitalize transition-colors ${
                      index <= currentStepIndex ? 'text-[#50C878]' : 'text-gray-500'
                    }`}
                  >
                    {step}
                  </span>
                ))}
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full rounded-full bg-gradient-to-r from-[#50C878] to-[#81D8D0]"
                />
              </div>
            </div>

            {/* Form Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {currentStep === 'email' && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">Email</h2>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-[#81D8D0] focus:outline-none"
                    />
                  </div>
                )}

                {currentStep === 'phone' && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">Phone</h2>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-[#81D8D0] focus:outline-none"
                    />
                  </div>
                )}

                {currentStep === 'steam' && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">Steam Account</h2>
                    <input
                      type="text"
                      value={steamId}
                      onChange={(e) => setSteamId(e.target.value)}
                      placeholder="Steam ID or Profile URL"
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-[#81D8D0] focus:outline-none"
                    />
                    <p className="text-xs text-gray-400">
                      We'll verify your account through Steam API
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleBack}
                disabled={currentStepIndex === 0}
                className="flex-1 rounded-xl border border-white/10 py-3 text-sm font-semibold text-white transition-all hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={loading}
                className="flex-1 rounded-xl bg-gradient-to-r from-[#50C878] to-[#81D8D0] py-3 text-sm font-semibold text-black transition-all hover:opacity-90 disabled:opacity-50"
              >
                {loading ? 'Verifying...' : currentStepIndex === steps.length - 1 ? 'Complete' : 'Continue'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}