"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I am the Shiksha Prabhat Assistant. How can I help you today? (e.g. 'What are the admission fees?', 'What classes do you teach?')",
      sender: "bot",
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: Message = { id: Date.now().toString(), text: textToSend, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      // Simulate typing delay for realism
      await new Promise(r => setTimeout(r, 400));
      // Use standard fetch but with dynamic URL env var
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/chatbot/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMsg.text }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { id: Date.now().toString(), text: data.answer || "Sorry, I couldn't understand that.", sender: "bot" }]);
    } catch (err) {
      setMessages((prev) => [...prev, { id: Date.now().toString(), text: "Sorry, the server is currently unavailable.", sender: "bot" }]);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#eab308] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:bg-[#ca9a04] hover:scale-110 transition-all z-50 text-[#181818]"
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[500px] bg-[#1a1a1a] border border-[#333] rounded-sm shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#111] p-4 border-b border-[#333] flex items-center gap-3">
              <div className="w-10 h-10 bg-[#eab308] rounded-sm flex items-center justify-center text-[#181818]">
                <Bot size={24} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-white text-lg leading-tight">SPPS Assistant</h3>
                <p className="text-xs text-[#eab308]">Online & Ready to help</p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 custom-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-8 h-8 rounded-sm flex items-center justify-center shrink-0 ${msg.sender === "user" ? "bg-[#333] text-gray-300" : "bg-[#eab308] text-[#181818]"}`}>
                    {msg.sender === "user" ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-3 text-sm max-w-[75%] ${msg.sender === "user" ? "bg-[#333] text-white rounded-l-lg rounded-br-lg" : "bg-[#111] border border-[#333] text-gray-300 rounded-r-lg rounded-bl-lg"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-4 pb-2 bg-[#1a1a1a] flex gap-2 overflow-x-auto custom-scrollbar whitespace-nowrap">
              {["What is the admission fee?", "Show me the toppers", "Who are the teachers?", "Are there coaching classes?"].map((q) => (
                <button
                  key={q}
                  onClick={() => { setInput(q); setTimeout(() => handleSend(q), 50); }}
                  className="text-xs bg-[#333] hover:bg-[#eab308] text-gray-300 hover:text-[#111] px-3 py-1.5 rounded-full transition-colors shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#111] border-t border-[#333]">
              <div className="relative flex items-center">
                <input suppressHydrationWarning
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                  placeholder="Type your question..."
                  className="w-full bg-[#1a1a1a] border border-[#333] text-white rounded-sm pl-4 pr-12 py-3 text-sm outline-none focus:border-[#eab308] transition-colors"
                />
                <button suppressHydrationWarning 
                  onClick={() => handleSend(input)}
                  className="absolute right-2 p-2 text-[#eab308] hover:text-[#ca9a04] transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
