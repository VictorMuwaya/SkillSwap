
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onTabChange('discover')}>
              <div className="bg-indigo-600 p-2 rounded-lg">
                <i className="fa-solid fa-handshake text-white text-xl"></i>
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">SkillSwap</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => onTabChange('discover')}
                className={`${activeTab === 'discover' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-indigo-600'} px-1 py-4 text-sm font-medium transition-colors`}
              >
                Discover
              </button>
              <button 
                onClick={() => onTabChange('messages')}
                className={`${activeTab === 'messages' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-indigo-600'} px-1 py-4 text-sm font-medium transition-colors`}
              >
                My Swaps
              </button>
              <button 
                onClick={() => onTabChange('profile')}
                className={`${activeTab === 'profile' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-indigo-600'} px-1 py-4 text-sm font-medium transition-colors`}
              >
                Profile
              </button>
            </nav>

            <div className="flex items-center space-x-4">
               <button className="bg-slate-100 p-2 rounded-full hover:bg-slate-200 transition-colors">
                 <i className="fa-solid fa-bell text-slate-600"></i>
               </button>
               <img src="https://picsum.photos/id/177/32/32" className="w-8 h-8 rounded-full border border-slate-200" alt="Avatar" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="md:hidden bg-white border-t border-slate-200 fixed bottom-0 left-0 right-0 z-50">
        <div className="flex justify-around items-center h-16">
          <button onClick={() => onTabChange('discover')} className={`flex flex-col items-center ${activeTab === 'discover' ? 'text-indigo-600' : 'text-slate-400'}`}>
            <i className="fa-solid fa-magnifying-glass text-lg"></i>
            <span className="text-[10px] mt-1">Discover</span>
          </button>
          <button onClick={() => onTabChange('messages')} className={`flex flex-col items-center ${activeTab === 'messages' ? 'text-indigo-600' : 'text-slate-400'}`}>
            <i className="fa-solid fa-repeat text-lg"></i>
            <span className="text-[10px] mt-1">My Swaps</span>
          </button>
          <button onClick={() => onTabChange('profile')} className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-indigo-600' : 'text-slate-400'}`}>
            <i className="fa-solid fa-user text-lg"></i>
            <span className="text-[10px] mt-1">Profile</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
