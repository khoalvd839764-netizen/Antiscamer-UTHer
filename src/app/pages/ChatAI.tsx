import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatAI() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Xin chào! 👋 Tôi là trợ lý AI chống lừa đảo. Tôi có thể giúp bạn nhận biết và xử lý các tình huống lừa đảo. Hãy hỏi tôi bất kỳ điều gì!',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

const getBotResponse = async (userMessage: string): Promise<string> => {
  try {
    const res = await fetch('https://api-demo-app.vercel.app/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        messages: [
          { role: 'system', content: 'Bạn là trợ lý AI chống lừa đảo tiếng Việt. Hãy trả lời ngắn gọn, hữu ích.' },
          { role: 'user', content: userMessage }
        ]
      }),
    });
    const data = await res.json();
    return data.text || 'Không nhận được phản hồi từ AI.';
  } catch (error) {
    return 'Xin lỗi, hiện tại tôi đang gặp sự cố kết nối. Vui lòng thử lại sau hoặc liên hệ hotline 113 để được hỗ trợ.';
  }
};

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Gọi Gemini API
    try {
      const responseText = await getBotResponse(inputValue);
      const botResponse: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorResponse: Message = {
        id: messages.length + 2,
        text: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại!',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    { icon: '⚠️', text: 'Dấu hiệu lừa đảo' },
    { icon: '🆘', text: 'Bị lừa phải làm gì?' },
    { icon: '👮', text: 'Báo công an' },
    { icon: '🛡️', text: 'Cách phòng tránh' }
  ];

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900/50 to-slate-900/80">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/home')}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/10"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white flex items-center gap-2">
              Trợ lý AI Chống Lừa Đảo
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            </h1>
            <p className="text-xs text-blue-300">Luôn sẵn sàng hỗ trợ bạn 24/7</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg'
                  : 'bg-white/10 backdrop-blur-md text-white border border-white/10'
              }`}
            >
              {message.sender === 'bot' && (
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-semibold text-blue-400">AI Assistant</span>
                </div>
              )}
              <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
              <p className={`text-xs mt-2 ${
                message.sender === 'user' ? 'text-blue-200' : 'text-gray-400'
              }`}>
                {message.timestamp.toLocaleTimeString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/10 backdrop-blur-md text-white border border-white/10 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-3">
                <Bot className="w-4 h-4 text-blue-400" />
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-3">
          <p className="text-xs text-gray-400 mb-3">Câu hỏi nhanh:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question.text)}
                className="bg-white/5 backdrop-blur-sm text-white px-3 py-2.5 rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10 text-xs font-medium flex items-center gap-2 hover:scale-105"
              >
                <span className="text-base">{question.icon}</span>
                <span className="text-left">{question.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="px-4 pb-24 pt-3 bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent backdrop-blur-xl border-t border-white/10">
        <div className="flex gap-2 items-end">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập câu hỏi của bạn..."
            className="flex-1 resize-none bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white placeholder-gray-400 max-h-24"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-3 rounded-2xl hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300 shadow-lg disabled:shadow-none hover:scale-105 disabled:scale-100"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
