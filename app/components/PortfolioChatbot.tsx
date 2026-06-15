'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend, FiRefreshCw } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

const STARTER_PROMPTS = [
    "What is Bala's experience?",
    'Tell me about his best project',
    'What tech stack does he use?',
    'How can I contact him?',
];

export default function PortfolioChatbot() {
    const pathname = usePathname();
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content:
                "Hi! I'm Bala's portfolio assistant. Ask me about his skills, projects, experience, or how to get in touch.",
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const isClassic = theme === 'classic';
    const isAnimated = theme === 'animated';

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            inputRef.current?.focus();
        }
    }, [isOpen, messages]);

    if (pathname === '/game') return null;

    const sendMessage = async (text: string) => {
        const trimmed = text.trim();
        if (!trimmed || isLoading) return;

        setError(null);
        const userMessage: Message = { role: 'user', content: trimmed };
        const nextMessages = [...messages, userMessage];
        setMessages(nextMessages);
        setInput('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: nextMessages }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send message');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    const resetChat = () => {
        setMessages([
            {
                role: 'assistant',
                content:
                    "Hi! I'm Bala's portfolio assistant. Ask me about his skills, projects, experience, or how to get in touch.",
            },
        ]);
        setError(null);
    };

    const panelClass = isClassic
        ? 'bg-white border border-gray-200 shadow-2xl text-black'
        : isAnimated
          ? 'bg-white border-[6px] border-black shadow-[12px_12px_0px_#ff007f] text-black'
          : 'glass hud-border bg-[#020202]/95 backdrop-blur-xl text-white';

    const buttonClass = isClassic
        ? 'bg-black text-white hover:bg-gray-800'
        : isAnimated
          ? 'bg-[#00f2ff] text-black border-4 border-black shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5'
          : 'bg-primary text-black hover:shadow-[0_0_30px_rgba(0,242,255,0.5)]';

    const userBubble = isClassic
        ? 'bg-black text-white ml-auto'
        : isAnimated
          ? 'bg-[#ff007f] text-white border-2 border-black ml-auto'
          : 'bg-primary/20 border border-primary/30 text-white ml-auto';

    const botBubble = isClassic
        ? 'bg-gray-100 text-gray-800'
        : isAnimated
          ? 'bg-yellow-100 text-black border-2 border-black'
          : 'bg-white/5 border border-white/10 text-gray-300';

    return (
        <div
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[200] flex flex-col items-end gap-3"
            style={{ maxHeight: 'calc(100vh - 2rem)' }}
        >
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                        className={`w-[min(380px,calc(100vw-3rem))] flex flex-col overflow-hidden ${panelClass}`}
                        style={{ height: 'min(460px, calc(100vh - 7rem))' }}
                    >
                        {/* Header */}
                        <div
                            className={`flex items-center justify-between px-4 py-3 shrink-0 ${isAnimated ? 'bg-black text-white border-b-4 border-black' : isClassic ? 'border-b border-gray-100' : 'border-b border-white/10'}`}
                        >
                            <div>
                                <p
                                    className={`font-bold text-sm uppercase tracking-wide ${isAnimated ? 'theme-title' : ''}`}
                                >
                                    Ask about Bala
                                </p>
                                <p
                                    className={`text-[10px] font-mono uppercase tracking-widest ${isClassic ? 'text-gray-400' : isAnimated ? 'text-primary' : 'text-primary/60'}`}
                                >
                                    AI Assistant
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={resetChat}
                                className={`p-2 transition-colors interactive ${isClassic ? 'hover:bg-gray-100' : isAnimated ? 'hover:bg-white/20' : 'hover:bg-white/10'}`}
                                title="New chat"
                            >
                                <FiRefreshCw size={14} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-3">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`max-w-[85%] px-3 py-2 text-sm leading-relaxed ${msg.role === 'user' ? userBubble : botBubble}`}
                                >
                                    {msg.content}
                                </div>
                            ))}

                            {isLoading && (
                                <div className={`max-w-[85%] px-3 py-2 text-sm ${botBubble}`}>
                                    <span className="inline-flex gap-1">
                                        <span className="animate-bounce">·</span>
                                        <span className="animate-bounce [animation-delay:0.1s]">·</span>
                                        <span className="animate-bounce [animation-delay:0.2s]">·</span>
                                    </span>
                                </div>
                            )}

                            {error && <p className="text-xs text-red-500 font-mono">{error}</p>}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Starter prompts */}
                        {messages.length === 1 && !isLoading && (
                            <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0">
                                {STARTER_PROMPTS.map((prompt) => (
                                    <button
                                        key={prompt}
                                        type="button"
                                        onClick={() => sendMessage(prompt)}
                                        className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 interactive transition-colors ${isClassic
                                            ? 'border border-gray-200 hover:bg-gray-50'
                                            : isAnimated
                                              ? 'border-2 border-black bg-yellow-200 hover:bg-yellow-300 font-bold'
                                              : 'border border-white/20 hover:border-primary/50 hover:text-primary'
                                        }`}
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <form
                            onSubmit={handleSubmit}
                            className={`flex gap-2 px-4 py-3 shrink-0 ${isClassic ? 'border-t border-gray-100' : isAnimated ? 'border-t-4 border-black bg-gray-50' : 'border-t border-white/10'}`}
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask anything about Bala..."
                                disabled={isLoading}
                                className={`flex-1 min-w-0 text-sm px-3 py-2 outline-none interactive ${isClassic
                                    ? 'bg-gray-50 border border-gray-200 focus:border-black'
                                    : isAnimated
                                      ? 'border-2 border-black bg-white font-bold placeholder:text-gray-400'
                                      : 'bg-white/5 border border-white/10 focus:border-primary/50 text-white placeholder:text-gray-600'
                                }`}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className={`shrink-0 p-2.5 transition-all interactive disabled:opacity-40 ${buttonClass}`}
                                aria-label="Send message"
                            >
                                <FiSend size={16} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle — always pinned to bottom-right of this dock */}
            <motion.button
                type="button"
                onClick={() => setIsOpen((o) => !o)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all interactive ${buttonClass}`}
                aria-label={isOpen ? 'Close chat' : 'Open chat assistant'}
                title="Chat with AI about Bala"
            >
                {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
            </motion.button>
        </div>
    );
}
