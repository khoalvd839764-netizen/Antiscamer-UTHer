import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, MessageCircle, Sparkles, Shield } from 'lucide-react';

const ANTI_SCAM_TIPS = [
  "Tuyệt đối không chia sẻ mã OTP cho bất kỳ ai!",
  "Cẩn thận: Không chuyển tiền khi chưa xác minh người nhận.",
  "Cảnh giác với các cuộc gọi tự xưng là Công an, Tòa án.",
  "Không click vào đường link lạ gửi qua tin nhắn SMS/Zalo.",
  "Trợ lý AI luôn ở đây để giúp bạn kiểm tra dấu hiệu lừa đảo!"
];

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export function MiniChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Xin chào! Tôi là trợ lý AI. Tôi có thể giúp gì cho bạn?', sender: 'bot' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<string | null>(null);

  // Dragging states
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const hasMoved = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // Lắng nghe sự kiện để mở MiniChat từ các nút ở trang khác
  useEffect(() => {
    const handleOpen = (e: Event) => {
      setIsOpen(true);
      const customEvent = e as CustomEvent;
      if (customEvent.detail && typeof customEvent.detail === 'string') {
        setInputValue(customEvent.detail); // Điền sẵn tin nhắn nếu có truyền vào
      }
    };
    window.addEventListener('open-minichat', handleOpen);
    return () => window.removeEventListener('open-minichat', handleOpen);
  }, []);

  // Tự động hiển thị lời nhắc chống lừa đảo định kỳ
  useEffect(() => {
    let hideTimeout: ReturnType<typeof setTimeout>;
    
    if (isOpen) {
      setTip(null);
      return;
    }

    const showTip = (tipIndex = -1) => {
      const index = tipIndex >= 0 ? tipIndex : Math.floor(Math.random() * ANTI_SCAM_TIPS.length);
      setTip(ANTI_SCAM_TIPS[index]);
      
      hideTimeout = setTimeout(() => setTip(null), 6000); // Ẩn sau 6s
    };

    // Hiện lời nhắc đầu tiên sau 5s khi vừa vào web
    const initialTimeout = setTimeout(() => showTip(0), 5000);
    // Lặp lại việc hiện lời nhắc ngẫu nhiên mỗi 30s
    const interval = setInterval(() => showTip(), 30000);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(hideTimeout);
      clearInterval(interval);
    };
  }, [isOpen]);

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
      return 'Xin lỗi, hiện tại tôi đang gặp sự cố kết nối. Vui lòng thử lại sau.';
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setMessages((prev) => [...prev, { text: userText, sender: 'user' }]);
    setInputValue('');
    setIsTyping(true);

    const responseText = await getBotResponse(userText);

    setMessages((prev) => [...prev, { text: responseText, sender: 'bot' }]);
    setIsTyping(false);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    isDragging.current = true;
    hasMoved.current = false;
    startPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!isDragging.current) return;
    hasMoved.current = true;
    setPosition({
      x: e.clientX - startPos.current.x,
      y: e.clientY - startPos.current.y
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const toggleChat = () => {
    if (hasMoved.current) {
      hasMoved.current = false;
      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    <div 
      className="absolute z-[100] bottom-20 right-4 flex flex-col items-end"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {/* Khung chat mini */}
      {isOpen && (
        <div className="mb-4 w-[340px] max-w-[calc(100vw-2rem)] h-[480px] bg-slate-950/90 backdrop-blur-2xl border border-white/10 rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-scaleIn origin-bottom-right ring-1 ring-white/5">
          {/* Header */}
          <div className="relative px-5 py-4 flex items-center justify-between bg-white/[0.02] border-b border-white/5">
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg border border-white/20">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-sm flex items-center gap-1.5">
                  Trợ lý AI
                  <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
                </span>
                <span className="text-[10px] text-green-400 font-medium">Đang trực tuyến</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white hover:bg-white/10 w-8 h-8 flex items-center justify-center rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nội dung chat */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl rounded-tr-sm border border-blue-500/30'
                    : 'bg-slate-800/80 backdrop-blur-md text-gray-100 border border-white/10 rounded-2xl rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 text-sm shadow-sm">
                  <div className="flex gap-1.5 items-center h-3">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Khung nhập liệu */}
          <div className="p-3 bg-white/[0.02] border-t border-white/5 backdrop-blur-md">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Nhập tin nhắn..."
                className="w-full bg-slate-900/50 border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-gray-500 shadow-inner"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="absolute right-1.5 w-9 h-9 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:scale-105 transition-all"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Anti-scam Tip Bubble */}
      {!isOpen && tip && (
        <div className="mb-4 w-56 bg-slate-900/90 backdrop-blur-2xl border border-blue-500/30 p-3.5 rounded-[20px] rounded-br-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-start gap-3 pointer-events-none animate-scaleIn origin-bottom-right ring-1 ring-white/5">
          <div className="w-7 h-7 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 border border-blue-500/30">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <p className="text-[11px] leading-relaxed font-medium text-white/90 pt-0.5">{tip}</p>
        </div>
      )}

      {/* Nút bong bóng nổi (Floating Action Button) */}
      <button
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={toggleChat}
        style={{ touchAction: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none' }}
        className="relative w-14 h-14 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transition-all duration-300 active:scale-95 cursor-move select-none group border border-white/20"
      >
        <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-colors"></div>
        {isOpen ? (
          <X className="w-6 h-6 text-white relative z-10 transition-transform duration-300 rotate-90 group-hover:rotate-0" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white relative z-10 transition-transform duration-300 group-hover:scale-110" />
        )}
      </button>
    </div>
  );
}