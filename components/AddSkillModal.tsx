
import React, { useState } from 'react';
import { suggestSkillCategorization } from '../services/geminiService';
import { Skill } from '../types';

interface AddSkillModalProps {
  onClose: () => void;
  onAdd: (skill: Skill) => void;
}

const AddSkillModal: React.FC<AddSkillModalProps> = ({ onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Expert'>('Intermediate');
  const [isCategorizing, setIsCategorizing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCategorizing(true);
    
    const result = await suggestSkillCategorization(description || name);
    
    const newSkill: Skill = {
      id: 's' + Math.random().toString(36).substr(2, 9),
      name,
      description,
      category: result.category || 'Other',
      level
    };

    onAdd(newSkill);
    setIsCategorizing(false);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-scaleIn">
        <form onSubmit={handleSubmit} className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Add a New Skill</h2>
            <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Skill Name</label>
              <input 
                required
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sourdough Baking"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</label>
              <textarea 
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe what you can offer..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm h-24 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Your Level</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Beginner', 'Intermediate', 'Expert'] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLevel(l)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      level === l 
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-100' 
                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isCategorizing}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all flex items-center justify-center disabled:opacity-50"
          >
            {isCategorizing ? (
              <>
                <i className="fa-solid fa-wand-sparkles mr-2 animate-pulse"></i>
                Categorizing with AI...
              </>
            ) : (
              'Save Skill'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSkillModal;
