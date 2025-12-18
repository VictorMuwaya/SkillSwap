
import React, { useState, useEffect, useRef } from 'react';
import { User, SwapRequest, ChatMessage } from '../types';
import { getChatAssistance } from '../services/geminiService';

interface ChatWindowProps {
  swap: SwapRequest;
  partner: User;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ swap, partner, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: '1', 
      senderId: partner.id, 
      text: `Hey! Thanks for the swap request. I'd love to help with ${swap.requestedSkillId} in exchange for your ${swap.offeredSkillId}.`, 
      timestamp: new Date(Date.now() - 1000 * 60 * 5) 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoadingSuggestions(true);
      const lastMsg = messages[messages.length - 1].text;
      const context = `Partner said: ${lastMsg}. We are swapping ${swap.offeredSkillId} for ${swap.requestedSkillId}.`;
      const aiSuggestions = await getChatAssistance(context, partner.name);
      setSuggestions(aiSuggestions);
      setLoadingSuggestions(false);
    };
    fetchSuggestions();
  }, [messages.length]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 animate-scaleIn">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white z-10">
        <div className="flex items-center space-x-4">
          <button onClick={onClose} className="md:hidden text-slate-400 p-1">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <div className="relative">
            <img src={partner.avatar} className="w-12 h-12 rounded-2xl object-cover border-2 border-indigo-50" alt={partner.name} />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base">{partner.name}</h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center">
              Coordinating {swap.requestedSkillId}
            </p>
          </div>
        </div>
        <div className="flex space-x-1">
          <button className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-50 hover:text-indigo-600 transition-all">
            <i className="fa-solid fa-phone text-sm"></i>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-50 hover:text-indigo-600 transition-all">
            <i className="fa-solid fa-calendar-check text-sm"></i>
          </button>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all">
            <i className="fa-solid fa-xmark text-base"></i>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-grow p-6 overflow-y-auto space-y-6 bg-slate-50/30">
        <div className="flex justify-center mb-8">
          <div className="bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100/50">
            <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">Swap coordinated • {swap.status}</p>
          </div>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
            <div className={`max-w-[75%] px-5 py-3 rounded-2xl text-sm shadow-sm leading-relaxed ${
              msg.senderId === 'me' 
                ? 'bg-slate-900 text-white rounded-tr-none' 
                : 'bg-white text-slate-700 border border-slate-200/50 rounded-tl-none'
            }`}>
              {msg.text}
              <div className={`text-[9px] mt-2 flex items-center ${msg.senderId === 'me' ? 'text-slate-400' : 'text-slate-400'}`}>
                <i className={`fa-solid ${msg.senderId === 'me' ? 'fa-check-double mr-1' : 'fa-clock mr-1'}`}></i>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Magic Drafts & Input */}
      <div className="p-5 bg-white border-t border-slate-100">
        <div className="mb-4">
          <div className="flex items-center space-x-1.5 mb-2.5">
            <i className="fa-solid fa-wand-sparkles text-[10px] text-indigo-500"></i>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Magic Drafts</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {loadingSuggestions ? (
              <div className="h-8 w-32 animate-pulse bg-slate-100 rounded-lg"></div>
            ) : (
              suggestions.map((suggestion, idx) => (
                <button 
                  key={idx}
                  onClick={() => sendMessage(suggestion)}
                  className="bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-slate-200/50 hover:border-indigo-200 transition-all whitespace-nowrap"
                >
                  {suggestion}
                </button>
              ))
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          <div className="relative flex-grow">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Message your neighbor..."
              className="w-full pl-5 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-[1.25rem] text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            />
            <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors">
              <i className="fa-regular fa-face-smile"></i>
            </button>
          </div>
          <button 
            type="submit" 
            disabled={!inputText.trim()}
            className="bg-indigo-600 text-white w-14 h-14 rounded-[1.25rem] flex items-center justify-center hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all disabled:opacity-50 disabled:shadow-none"
          >
            <i className="fa-solid fa-paper-plane text-base"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
