'use client';

import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface LiveStatsProps {
  netWorth: number[];
  gpm: number;
  kills: number;
}

export default function LiveStatsWidget({ netWorth, gpm, kills }: LiveStatsProps) {
  const data = netWorth.map((value, index) => ({ time: index, value }));

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-80 rounded-2xl border border-[#81D8D0]/30 bg-white/5 backdrop-blur-xl p-6 shadow-2xl"
    >
      <div className="mb-6">
        <h3 className="mb-2 text-sm font-medium text-gray-400">Net Worth</h3>
        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#81D8D0" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mb-6 border-t border-white/10 pt-4">
        <h3 className="mb-2 text-sm font-medium text-gray-400">GPM (Gold Per Minute)</h3>
        <motion.p 
          key={gpm}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-4xl font-bold text-white"
        >
          {gpm.toLocaleString('en-US')}
        </motion.p>
      </div>

      <div className="border-t border-white/10 pt-4">
        <h3 className="mb-2 text-sm font-medium text-gray-400">Kills</h3>
        <motion.p 
          key={kills}
          initial={{ scale: 1.1, color: '#50C878' }}
          animate={{ scale: 1, color: '#50C878' }}
          className="text-4xl font-bold"
        >
          {kills}
        </motion.p>
      </div>
    </motion.div>
  );
}