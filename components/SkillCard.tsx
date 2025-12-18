
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { getAIPartnerAdvice } from '../services/geminiService';
import { CURRENT_USER } from '../constants';

interface SkillCardProps {
  user: User;
  onSwapRequest: (user: User) => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ user, onSwapRequest }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  useEffect(() => {
    const fetchAdvice = async () => {
      setLoadingAdvice(true);
      const res = await getAIPartnerAdvice(CURRENT_USER, user);
      setAdvice(res || "Connecting might be great!");
      setLoadingAdvice(false);
    };
    fetchAdvice();
  }, [user]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative h-32 bg-indigo-50">
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-[10px] font-bold text-indigo-700 uppercase tracking-wider flex items-center">
          <i className="fa-solid fa-location-dot mr-1"></i>
          0.8 miles away
        </div>
        <div className="absolute -bottom-6 left-6">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-16 h-16 rounded-2xl border-4 border-white shadow-sm object-cover"
          />
        </div>
      </div>
      
      <div className="pt-8 pb-6 px-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-slate-900 flex items-center">
              {user.name}
              {user.verified && <i className="fa-solid fa-circle-check text-blue-500 ml-1.5 text-xs"></i>}
            </h3>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{user.location.neighborhood}</p>
          </div>
          <div className="flex items-center text-amber-500">
            <i className="fa-solid fa-star text-xs mr-1"></i>
            <span className="text-sm font-bold">{user.rating}</span>
            <span className="text-xs text-slate-400 font-normal ml-1">({user.swapsCompleted} swaps)</span>
          </div>
        </div>

        <p className="text-sm text-slate-600 mb-4 line-clamp-2 italic">
          "{user.bio}"
        </p>

        <div className="space-y-3">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Offering</span>
            <div className="flex flex-wrap gap-2">
              {user.skillsOffered.map(skill => (
                <span key={skill.id} className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md text-xs font-semibold">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Needs</span>
            <div className="flex flex-wrap gap-2">
              {user.skillsNeeded.map(skill => (
                <span key={skill} className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-xs font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="bg-slate-50 rounded-xl p-3 mb-4">
            <div className="flex items-center mb-1 text-indigo-600">
              <i className="fa-solid fa-wand-sparkles text-[10px] mr-1.5"></i>
              <span className="text-[10px] font-bold uppercase tracking-wider">AI Match Analysis</span>
            </div>
            {loadingAdvice ? (
              <div className="h-10 animate-pulse bg-slate-200 rounded-md"></div>
            ) : (
              <p className="text-xs text-slate-600 leading-relaxed">
                {advice}
              </p>
            )}
          </div>

          <button 
            onClick={() => onSwapRequest(user)}
            className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-600 transition-colors flex items-center justify-center space-x-2"
          >
            <i className="fa-solid fa-repeat text-xs"></i>
            <span>Request Swap</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
