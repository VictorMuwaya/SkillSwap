
import React, { useState } from 'react';
import Layout from './components/Layout';
import SkillCard from './components/SkillCard';
import AvailabilityPicker from './components/AvailabilityPicker';
import ChatWindow from './components/ChatWindow';
import AddSkillModal from './components/AddSkillModal';
import { MOCK_USERS, CATEGORIES, CURRENT_USER, DAYS } from './constants';
import { User, Availability, SwapRequest, Skill } from './types';

// Discover View
const DiscoverView: React.FC<{ onSwap: (u: User) => void }> = ({ onSwap }) => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [showMap, setShowMap] = useState(false);
  
  const filteredUsers = MOCK_USERS.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || 
                          u.skillsOffered.some(s => s.name.toLowerCase().includes(search.toLowerCase()));
    const matchesFilter = filter === 'All' || u.skillsOffered.some(s => s.category === filter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="relative">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Swap skills, <span className="text-indigo-600">grow together.</span></h1>
            <p className="text-slate-500 max-w-lg mb-6">Trade gardening for tutoring, or tech support for baking. No money, just time.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
              <div className="flex-grow relative">
                <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input 
                  type="text" 
                  placeholder="What are you looking for?"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button 
                onClick={() => setShowMap(!showMap)}
                className={`px-8 py-3.5 rounded-2xl font-bold transition-all whitespace-nowrap ${
                  showMap ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-slate-900 text-white shadow-lg shadow-slate-200 hover:bg-slate-800'
                }`}
              >
                <i className={`fa-solid ${showMap ? 'fa-list' : 'fa-map-location-dot'} mr-2`}></i>
                {showMap ? 'Show List' : 'Map View'}
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none hidden lg:block">
            <i className="fa-solid fa-handshake text-[240px] rotate-12 -mr-20"></i>
          </div>
        </div>
      </div>

      {showMap ? (
        <div className="bg-slate-100 h-[500px] rounded-3xl relative overflow-hidden flex items-center justify-center border border-slate-200">
          <div className="text-center p-8">
            <i className="fa-solid fa-compass text-4xl text-slate-300 mb-4 animate-spin-slow"></i>
            <h3 className="text-lg font-bold text-slate-600">Loading hyper-local map...</h3>
            <p className="text-sm text-slate-400 mt-1">Showing 12 active neighbors in your area.</p>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Recommended Neighbors</h2>
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide max-w-[60vw]">
              {['All', ...CATEGORIES].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border whitespace-nowrap ${filter === cat ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <SkillCard key={user.id} user={user} onSwapRequest={onSwap} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <i className="fa-solid fa-face-sad-tear text-4xl text-slate-300 mb-4"></i>
                <h3 className="text-lg font-bold text-slate-600">No matches found</h3>
                <p className="text-sm text-slate-400">Try a different search or clear your filters.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Swaps View
const MySwapsView: React.FC<{ swaps: SwapRequest[]; onOpenChat: (s: SwapRequest) => void }> = ({ swaps, onOpenChat }) => {
  if (swaps.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-8 text-center animate-fadeIn">
        <div className="bg-white p-16 rounded-3xl border border-dashed border-slate-300">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-calendar-check text-slate-300 text-3xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">No active swaps yet</h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">Discover skills in your neighborhood and start trading today!</p>
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            Explore Your Community
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Your Exchanges</h1>
        <div className="flex space-x-2">
          <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">{swaps.length} Active</span>
        </div>
      </div>

      <div className="grid gap-6">
        {swaps.map(swap => {
          // Identify partner: either sender or receiver, who is not 'me'
          const partnerId = swap.senderId === 'me' ? swap.receiverId : swap.senderId;
          const partner = MOCK_USERS.find(u => u.id === partnerId) || MOCK_USERS[0];
          
          return (
            <div key={swap.id} className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col md:flex-row items-center gap-6 hover:shadow-md transition-all group">
              <div className="relative">
                <img src={partner.avatar} className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100" alt={partner.name} />
                <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${swap.status === 'accepted' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
              </div>
              
              <div className="flex-grow text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <h3 className="font-bold text-slate-900">{partner.name}</h3>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold uppercase">{swap.status}</span>
                </div>
                <p className="text-sm text-slate-500">
                  Trading <span className="font-semibold text-slate-700">{swap.offeredSkillId}</span> for <span className="font-semibold text-slate-700">{swap.requestedSkillId}</span>
                </p>
                {swap.proposedTime && (
                  <p className="text-xs text-indigo-600 font-medium mt-2 flex items-center justify-center md:justify-start">
                    <i className="fa-solid fa-clock mr-1.5"></i>
                    Suggested: {swap.proposedTime}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => onOpenChat(swap)}
                  className="bg-slate-50 text-slate-700 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors flex items-center"
                >
                  <i className="fa-solid fa-message mr-2"></i>
                  Message
                </button>
                <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-600 transition-colors">
                  Complete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Profile View
const ProfileView: React.FC = () => {
  const [availability, setAvailability] = useState<Availability>(CURRENT_USER.availability);
  const [skills, setSkills] = useState<Skill[]>(CURRENT_USER.skillsOffered);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const user = CURRENT_USER;

  const handleAddSkill = (newSkill: Skill) => {
    setSkills([...skills, newSkill]);
    setShowAddSkill(false);
  };

  return (
    <div className="max-w-3xl mx-auto animate-fadeIn pb-24">
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="h-40 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6 flex justify-between items-end">
            <img src={user.avatar} className="w-32 h-32 rounded-[2.5rem] border-8 border-white shadow-xl object-cover" alt="Profile" />
            <div className="flex space-x-2">
              <button className="bg-slate-50 border border-slate-200 px-6 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100 shadow-sm transition-all">
                Edit Profile
              </button>
            </div>
          </div>
          
          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-900 flex items-center tracking-tight">
              {user.name}
              <i className="fa-solid fa-circle-check text-blue-500 ml-2 text-lg"></i>
            </h1>
            <p className="text-slate-500 font-medium">{user.location.neighborhood} • Active Swapper</p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-10">
            <div className="bg-slate-50/80 p-5 rounded-3xl text-center border border-slate-100">
              <span className="block text-2xl font-black text-indigo-600">{user.rating}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Trust Rating</span>
            </div>
            <div className="bg-slate-50/80 p-5 rounded-3xl text-center border border-slate-100">
              <span className="block text-2xl font-black text-indigo-600">{user.swapsCompleted}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Success Swaps</span>
            </div>
            <div className="bg-slate-50/80 p-5 rounded-3xl text-center border border-slate-100">
              <span className="block text-2xl font-black text-emerald-600">48h</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Time Credits</span>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-[0.2em]">Bio</h3>
              <p className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-6 rounded-3xl border border-slate-100 italic">
                "{user.bio}"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                   <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Skills I Offer</h3>
                   <button onClick={() => setShowAddSkill(true)} className="text-indigo-600 hover:text-indigo-700">
                     <i className="fa-solid fa-circle-plus"></i>
                   </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map(s => (
                    <div key={s.id} className="bg-white border border-slate-200 pl-3 pr-2 py-1.5 rounded-xl flex items-center group shadow-sm">
                      <span className="text-xs font-bold text-slate-700">{s.name}</span>
                      <button className="ml-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                        <i className="fa-solid fa-xmark text-[10px]"></i>
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => setShowAddSkill(true)}
                    className="border-2 border-dashed border-slate-200 text-slate-400 px-4 py-1.5 rounded-xl text-xs font-bold hover:border-indigo-400 hover:text-indigo-500 transition-all"
                  >
                    + Add New
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-[0.2em]">Skills I'm Seeking</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skillsNeeded.map(s => (
                    <span key={s} className="bg-indigo-50/50 text-indigo-700 px-4 py-1.5 rounded-xl text-xs font-bold border border-indigo-100">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Weekly Window</h3>
                <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">Personal Schedule</span>
              </div>
              <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-inner">
                <AvailabilityPicker availability={availability} onChange={setAvailability} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddSkill && <AddSkillModal onClose={() => setShowAddSkill(false)} onAdd={handleAddSkill} />}
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [mySwaps, setMySwaps] = useState<SwapRequest[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeChatSwap, setActiveChatSwap] = useState<SwapRequest | null>(null);
  const [requestSent, setRequestSent] = useState(false);
  const [proposedSlot, setProposedSlot] = useState<string | null>(null);
  const [offeredSkill, setOfferedSkill] = useState('');
  const [neededSkill, setNeededSkill] = useState('');

  const handleSwapRequest = (user: User) => {
    setSelectedUser(user);
    setOfferedSkill(CURRENT_USER.skillsOffered[0]?.name || '');
    setNeededSkill(user.skillsOffered[0]?.name || '');
    setProposedSlot(null);
  };

  const confirmSwap = () => {
    if (!selectedUser) return;
    
    const newRequest: SwapRequest = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: 'me',
      receiverId: selectedUser.id,
      offeredSkillId: offeredSkill,
      requestedSkillId: neededSkill,
      status: 'pending',
      timestamp: new Date(),
      message: 'Initial request',
      proposedTime: proposedSlot || undefined
    };

    setRequestSent(true);
    setTimeout(() => {
      setMySwaps(prev => [...prev, newRequest]);
      setSelectedUser(null);
      setRequestSent(false);
      setActiveTab('messages');
    }, 2000);
  };

  const openChat = (swap: SwapRequest) => {
    setActiveChatSwap(swap);
  };

  const currentChatPartner = activeChatSwap 
    ? (MOCK_USERS.find(u => u.id === (activeChatSwap.senderId === 'me' ? activeChatSwap.receiverId : activeChatSwap.senderId)) || MOCK_USERS[0]) 
    : null;

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="pb-12">
        {activeTab === 'discover' && <DiscoverView onSwap={handleSwapRequest} />}
        {activeTab === 'messages' && <MySwapsView swaps={mySwaps} onOpenChat={openChat} />}
        {activeTab === 'profile' && <ProfileView />}
      </div>

      {selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-scaleIn flex flex-col max-h-[90vh]">
            {!requestSent ? (
              <div className="overflow-y-auto p-10">
                <div className="flex justify-between items-start mb-8">
                   <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Request a Swap</h2>
                    <p className="text-slate-500 mt-1">Connecting with <span className="text-indigo-600 font-bold">{selectedUser.name}</span></p>
                   </div>
                  <button onClick={() => setSelectedUser(null)} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                    <i className="fa-solid fa-xmark text-2xl"></i>
                  </button>
                </div>

                <div className="flex items-center p-6 bg-indigo-50/50 rounded-3xl mb-8 border border-indigo-100">
                  <div className="flex -space-x-4 mr-6">
                    <img src={CURRENT_USER.avatar} className="w-16 h-16 rounded-2xl border-4 border-white shadow-lg" alt="Me" />
                    <img src={selectedUser.avatar} className="w-16 h-16 rounded-2xl border-4 border-white shadow-lg" alt="Partner" />
                  </div>
                  <div>
                    <p className="text-sm text-indigo-900 font-medium leading-relaxed">
                      You're about to initiate a community exchange. 
                      <span className="block text-[10px] text-indigo-400 uppercase font-bold tracking-widest mt-1">No money, just direct help.</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">I will provide</label>
                    <div className="relative">
                      <select 
                        value={offeredSkill}
                        onChange={(e) => setOfferedSkill(e.target.value)}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none"
                      >
                        {CURRENT_USER.skillsOffered.map(s => (
                          <option key={s.id} value={s.name}>{s.name}</option>
                        ))}
                      </select>
                      <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">In exchange for</label>
                    <div className="relative">
                      <select 
                        value={neededSkill}
                        onChange={(e) => setNeededSkill(e.target.value)}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none"
                      >
                        {selectedUser.skillsOffered.map(s => (
                          <option key={s.id} value={s.name}>{s.name}</option>
                        ))}
                      </select>
                      <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Propose a Meeting</label>
                    <span className="text-[10px] text-emerald-600 font-black bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                      {selectedUser.name}'s Free Time
                    </span>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner">
                    <div className="flex flex-wrap gap-3">
                      {DAYS.map(day => {
                        const slots = selectedUser.availability[day] || [];
                        if (slots.length === 0) return null;
                        return slots.map(slot => (
                          <button
                            key={`${day}-${slot}`}
                            type="button"
                            onClick={() => setProposedSlot(`${day} ${slot}`)}
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center
                              ${proposedSlot === `${day} ${slot}`
                                ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100'
                                : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-400 hover:text-indigo-600'}`}
                          >
                            <i className="fa-solid fa-calendar-day mr-2 opacity-50"></i>
                            {day.slice(0,3)}, {slot}
                          </button>
                        ));
                      })}
                      {Object.values(selectedUser.availability).every(v => v.length === 0) && (
                        <p className="text-xs text-slate-400 italic">No specific availability listed. Suggest a time anyway!</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-10">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Intro Message</label>
                  <textarea 
                    placeholder={`Hi ${selectedUser.name}! I saw you need help with your skills. I'd love to swap my ${offeredSkill} for your ${neededSkill}...`}
                    className="w-full p-5 bg-slate-50 border border-slate-200 rounded-3xl text-sm font-medium h-32 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                  ></textarea>
                </div>

                <button 
                  onClick={confirmSwap}
                  className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-bold shadow-2xl shadow-slate-200 hover:bg-indigo-600 transition-all flex items-center justify-center text-lg"
                >
                  <i className="fa-solid fa-paper-plane mr-3"></i>
                  Send Swap Request
                </button>
              </div>
            ) : (
              <div className="p-20 text-center bg-white">
                <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 animate-bounce border-2 border-emerald-100">
                  <i className="fa-solid fa-check text-4xl"></i>
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Request Broadcasted!</h2>
                <p className="text-slate-500 max-w-xs mx-auto text-sm leading-relaxed">
                  We've sent your proposal to {selectedUser.name}. We'll alert you as soon as they respond!
                </p>
                <div className="mt-10 h-1 bg-slate-100 rounded-full overflow-hidden w-48 mx-auto">
                  <div className="h-full bg-emerald-500 animate-progress"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeChatSwap && currentChatPartner && (
        <div className="fixed inset-0 z-[120] flex items-end md:items-center justify-center p-0 md:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl h-[90vh] md:h-[80vh]">
            <ChatWindow 
              swap={activeChatSwap} 
              partner={currentChatPartner} 
              onClose={() => setActiveChatSwap(null)} 
            />
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-fadeIn { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-scaleIn { animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-progress { animation: progress 2s ease-in-out forwards; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </Layout>
  );
};

export default App;
