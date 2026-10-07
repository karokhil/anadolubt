import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { api } from '../services/api.ts';
import { 
  Sparkles, 
  Send, 
  X, 
  Bot, 
  User, 
  Loader2 
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AiAssistantModal: React.FC = () => {
  const { 
    aiAssistantModalOpen, 
    setAiAssistantModalOpen, 
    assistantInitialPrompt, 
    setAssistantInitialPrompt,
    org,
    t
  } = useApp();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize or update welcome message with current agency & language
  useEffect(() => {
    if (aiAssistantModalOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'assistant',
          text: t.aiAssistant.welcomeMsg(org?.name || 'Ajansınız'),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    }
  }, [aiAssistantModalOpen, org?.name, t]);

  useEffect(() => {
    if (aiAssistantModalOpen && assistantInitialPrompt) {
      handleSend(assistantInitialPrompt);
      setAssistantInitialPrompt('');
    }
  }, [aiAssistantModalOpen, assistantInitialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!aiAssistantModalOpen) return null;

  const handleSend = async (messageText?: string) => {
    const query = messageText || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.askAssistant(query.trim());
      const botMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `Hata: ${err.message || 'Lütfen bağlantıyı kontrol edin.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-2xl h-[92vh] sm:h-[85vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-0 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Mobile handle indicator */}
        <div className="sm:hidden pt-2.5 pb-1 flex justify-center">
          <div className="w-10 h-1 bg-neutral-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/80">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-xs shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-sm font-bold text-neutral-900 truncate">
                  {t.aiAssistant.title}
                </h2>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-sm shrink-0">
                  {t.aiAssistant.liveCrmSync}
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 truncate">
                {t.aiAssistant.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={() => setAiAssistantModalOpen(false)}
            className="p-2 min-h-[40px] min-w-[40px] rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors flex items-center justify-center shrink-0"
            aria-label={t.common.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-neutral-50/40">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-700 shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[88%] sm:max-w-[82%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-neutral-900 text-white shadow-xs rounded-br-xs'
                    : 'bg-white text-neutral-800 border border-neutral-200/80 shadow-xs rounded-bl-xs'
                }`}
              >
                <div className="whitespace-pre-wrap font-normal">
                  {msg.text.split('\n').map((line, idx) => {
                    if (line.startsWith('### ')) {
                      return <h4 key={idx} className="font-bold text-sm text-neutral-900 mt-2 mb-1">{line.replace('### ', '')}</h4>;
                    }
                    if (line.startsWith('* ') || line.startsWith('- ')) {
                      return <li key={idx} className="ml-4 list-disc">{line.substring(2)}</li>;
                    }
                    return <p key={idx} className={line === '' ? 'h-2' : ''}>{line}</p>;
                  })}
                </div>
                <div className={`text-[10px] mt-1.5 text-right ${msg.sender === 'user' ? 'text-neutral-400' : 'text-neutral-400'}`}>
                  {msg.timestamp}
                </div>
              </div>
              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-xl bg-neutral-800 text-neutral-200 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-2.5 justify-start items-center">
              <div className="w-7 h-7 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-700 shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-neutral-200 rounded-2xl px-4 py-2.5 flex items-center gap-2 text-xs text-neutral-500 shadow-xs">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-orange-600 shrink-0" />
                <span>{t.aiAssistant.auditing}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt pills with horizontal touch scroll */}
        <div className="px-3 sm:px-4 py-2 border-t border-neutral-100 bg-white overflow-x-auto flex gap-1.5 no-scrollbar shrink-0">
          {t.aiAssistant.quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="whitespace-nowrap px-3 py-1.5 min-h-[36px] rounded-xl bg-neutral-100 hover:bg-neutral-200/80 active:bg-orange-50 text-neutral-700 text-xs font-semibold transition-colors shrink-0 border border-neutral-200/60 active:scale-95"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input form */}
        <div className="p-3 sm:p-4 bg-white border-t border-neutral-100 shrink-0 pb-safe">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={t.aiAssistant.placeholder}
              disabled={loading}
              className="flex-1 px-4 py-2.5 min-h-[44px] text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-neutral-900 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 sm:px-4 sm:py-2.5 min-h-[44px] min-w-[44px] bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-300 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 shrink-0"
              aria-label={t.aiAssistant.askBtn}
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">{t.aiAssistant.askBtn}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
