import React from 'react';
import { Star, Send } from 'lucide-react';
import { motion } from 'motion/react';

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void;
}

export default function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [rating, setRating] = React.useState(5);
  const [hover, setHover] = React.useState(0);
  const [comment, setComment] = React.useState('');
  const [satisfaction, setSatisfaction] = React.useState({
    performance: 5,
    reliability: 5,
    support: 5
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      // Calculate weighted satisfaction average
      const weightedRating = (rating + satisfaction.performance + satisfaction.reliability + satisfaction.support) / 4;
      onSubmit(weightedRating, comment);
      setComment('');
      setRating(5);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 bg-[#141414] rounded-3xl border border-yellow-500/20"
    >
      <div className="mb-6">
        <h3 className="text-xl font-black uppercase tracking-tighter text-white">แบบสอบถามความพึงพอใจ</h3>
        <p className="text-xs text-gray-500 mt-1">ความคิดเห็นของคุณนำมาคิดเป็นอัตราชนะของ EA โดยละเอียด</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">ภาพรวมความพึงพอใจ</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-transform active:scale-90"
                >
                  <Star 
                    className={`w-6 h-6 ${
                      (hover || rating) >= star 
                        ? 'text-yellow-500 fill-yellow-500' 
                        : 'text-gray-700'
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {[
              { key: 'performance', label: 'ผลกำไร / อัตราชนะ' },
              { key: 'reliability', label: 'ความเสถียรของระบบ' },
              { key: 'support', label: 'การดูแลหลังการเช่า' }
            ].map((item) => (
              <div key={item.key}>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{item.label}</p>
                  <span className="text-[9px] font-black text-yellow-500">{satisfaction[item.key as keyof typeof satisfaction]}/5</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={satisfaction[item.key as keyof typeof satisfaction]}
                  onChange={(e) => setSatisfaction(prev => ({ ...prev, [item.key]: parseInt(e.target.value) }))}
                  className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">แชร์ประสบการณ์การใช้งาน</p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="แชร์ประสบการณ์การใช้งาน EA ตัวนี้..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-500/50 transition-colors min-h-[120px] resize-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!comment.trim()}
          className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:hover:bg-yellow-500 text-black font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
        >
          ส่งรีวิว
          <Send className="w-4 h-4" />
        </button>
      </form>
    </motion.div>
  );
}
