import { useState, useRef, useEffect } from "react";
import { Shield, AlertTriangle, TrendingUp, Users, Bell, Phone, MessageSquare, ChevronRight, Star, X, CheckCircle, ArrowLeft, Search, Image as ImageIcon, Flame, Crown, Lightbulb, MessageCircle, Send, Bot, Sparkles, Lock, Activity, Globe } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";

interface MiniChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function Home() {
  const navigate = useNavigate();
  const [showAllTips, setShowAllTips] = useState(false);
  const [reportType, setReportType] = useState<"phone" | "website">("phone");
  const [reportInput, setReportInput] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [realTimeAlerts, setRealTimeAlerts] = useState(true);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showFeedbackSuccess, setShowFeedbackSuccess] = useState(false);
  const [maxProtection, setMaxProtection] = useState(false);
  const [showProtectionPopup, setShowProtectionPopup] = useState(false);
  const [protectionPopupType, setProtectionPopupType] = useState<"enabled" | "disabled">("enabled");
  
  // Mini Chat State
  const [showMiniChat, setShowMiniChat] = useState(false);
  const [miniChatMessages, setMiniChatMessages] = useState<MiniChatMessage[]>([
    {
      id: 1,
      text: 'Xin chào! 👋 Tôi có thể giúp bạn về chống lừa đảo. Hãy hỏi tôi nhé!',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [miniChatInput, setMiniChatInput] = useState('');
  const [miniChatTyping, setMiniChatTyping] = useState(false);
  const miniChatEndRef = useRef<HTMLDivElement>(null);

  const scrollToMiniChatBottom = () => {
    miniChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToMiniChatBottom();
  }, [miniChatMessages]);

  const getMiniChatBotResponse = async (userMessage: string): Promise<string> => {
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

  const handleSendMiniChat = async () => {
    if (!miniChatInput.trim()) return;

    const userMessage: MiniChatMessage = {
      id: miniChatMessages.length + 1,
      text: miniChatInput,
      sender: 'user',
      timestamp: new Date()
    };

    setMiniChatMessages(prev => [...prev, userMessage]);
    setMiniChatInput('');
    setMiniChatTyping(true);

    try {
      const responseText = await getMiniChatBotResponse(miniChatInput);
      const botResponse: MiniChatMessage = {
        id: miniChatMessages.length + 2,
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMiniChatMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorResponse: MiniChatMessage = {
        id: miniChatMessages.length + 2,
        text: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại!',
        sender: 'bot',
        timestamp: new Date()
      };
      setMiniChatMessages(prev => [...prev, errorResponse]);
    } finally {
      setMiniChatTyping(false);
    }
  };

  const handleMiniChatKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMiniChat();
    }
  };

  const handleSubmitReport = () => {
    if (reportInput.trim()) {
      // Show success popup
      setShowSuccessPopup(true);
      // Reset form
      setReportInput("");
      setReportDescription("");
      // Auto close popup after 3 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
    }
  };

  const handleSubmitFeedback = () => {
    if (feedbackRating > 0 && feedbackMessage.trim()) {
      // Show success popup
      setShowFeedbackSuccess(true);
      // Reset form
      setFeedbackRating(0);
      setFeedbackMessage("");
      // Auto close popup after 3 seconds
      setTimeout(() => {
        setShowFeedbackSuccess(false);
      }, 3000);
    }
  };

  const handleToggleMaxProtection = () => {
    const newState = !maxProtection;
    setMaxProtection(newState);
    setProtectionPopupType(newState ? "enabled" : "disabled");
    setShowProtectionPopup(true);
    // Auto close popup after 3 seconds
    setTimeout(() => {
      setShowProtectionPopup(false);
    }, 3000);
  };

  const antiScamTips = [
    {
      icon: "⭐",
      title: "Không bao giờ cung cấp mã OTP",
      description: "Ngân hàng không bao giờ yêu cầu mã OTP qua điện thoại",
      color: "from-yellow-400 to-yellow-500"
    },
    {
      icon: "🔒",
      title: "Kiểm tra kỹ đờng link trước khi click",
      description: "Lừa đảo thường dùng domain giả mạo rất giống thật",
      color: "from-blue-400 to-blue-500"
    },
    {
      icon: "📞",
      title: "Cẩn thận với cuộc gọi lạ",
      description: "Không tin tưởng người tự xưng nhân viên ngân hàng, công an",
      color: "from-purple-400 to-purple-500"
    },
    {
      icon: "💳",
      title: "Không chia sẻ thông tin thẻ ngân hàng",
      description: "Số thẻ, CVV, ngày hết hạn là thông tin tuyệt mật",
      color: "from-red-400 to-red-500"
    },
    {
      icon: "🎁",
      title: "Nghi ngờ các chương trình quà tặng hấp dẫn",
      description: "Trúng thưởng đột xuất thường là chiêu lừa đảo phổ biến",
      color: "from-green-400 to-green-500"
    },
    {
      icon: "👨‍👩‍👧",
      title: "Chia sẻ với người thân",
      description: "Giúp ba mẹ, ông bà nhận biết các thủ đoạn lừa đảo mới",
      color: "from-pink-400 to-pink-500"
    }
  ];

  const displayedTips = showAllTips ? antiScamTips : antiScamTips.slice(0, 1);

  return (
    <div className="h-full flex flex-col relative">
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="p-6 space-y-6">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Tổng quan</h1>
              <p className="text-sm text-gray-400">Trạng thái bảo mật thiết bị</p>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border shadow-inner transition-colors duration-500 ${maxProtection ? 'bg-green-500/20 border-green-500/30' : 'bg-red-500/20 border-red-500/30'}`}>
              <Shield className={`w-5 h-5 ${maxProtection ? 'text-green-400' : 'text-red-400'}`} />
            </div>
          </div>

          {/* SECURITY STATUS CARD */}
          <div className="relative bg-slate-900/80 backdrop-blur-2xl rounded-[24px] p-6 border border-white/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[60px] opacity-40 transition-colors duration-700 pointer-events-none ${maxProtection ? 'bg-green-500' : 'bg-red-500'}`}></div>

            <div className="relative z-10 flex items-center justify-between mb-6">
              <div className="flex-1">
                <h2 className="text-lg font-bold text-white mb-1.5">Bảo vệ toàn diện</h2>
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    {maxProtection && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${maxProtection ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  </span>
                  <span className={`text-xs font-semibold ${maxProtection ? 'text-green-400' : 'text-red-400'}`}>
                    {maxProtection ? 'Hệ thống đang an toàn' : 'Phát hiện rủi ro - Cần bật'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleToggleMaxProtection}
              className={`w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 active:scale-95 border flex items-center justify-center gap-2 ${
                maxProtection
                  ? "bg-white/5 text-white border-white/10 hover:bg-white/10"
                  : "bg-gradient-to-r from-red-500 to-rose-600 text-white border-red-500/50 shadow-[0_0_20px_rgba(244,63,94,0.4)]"
              }`}
            >
              {maxProtection ? <Lock className="w-4 h-4"/> : <AlertTriangle className="w-4 h-4"/>}
              {maxProtection ? "TẠM DỪNG BẢO VỆ" : "BẬT BẢO VỆ NGAY"}
            </button>

            <div className="mt-5 pt-5 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${realTimeAlerts ? 'bg-blue-500/20' : 'bg-white/5'}`}>
                  <Activity className={`w-4 h-4 ${realTimeAlerts ? 'text-blue-400' : 'text-gray-500'}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-white">Quét Real-time</p>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded text-[8px] font-bold text-amber-400 border border-amber-500/20 uppercase tracking-wider">Premium</div>
                  </div>
                  <p className="text-[10px] text-gray-400">Giám sát nền liên tục 24/7</p>
                </div>
              </div>
              
              <button
                onClick={() => setRealTimeAlerts(!realTimeAlerts)}
                className={`relative w-12 h-7 rounded-full transition-all duration-300 flex-shrink-0 border ${
                  realTimeAlerts
                    ? "bg-blue-500 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                    : "bg-white/10 border-white/5"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300 ${
                    realTimeAlerts ? "left-6" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* QUICK TOOLS */}
          <div>
            <h2 className="text-xs font-bold text-gray-400 tracking-wider mb-3 px-1">CÔNG CỤ NHANH</h2>
            <div className="grid grid-cols-3 gap-3">
              <button onClick={() => navigate("/check")} className="bg-slate-900/50 backdrop-blur-sm border border-white/[0.05] hover:bg-white/[0.05] transition-all rounded-[20px] p-4 flex flex-col items-center gap-3 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/20">
                  <Globe className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-xs font-semibold text-gray-300">Link lạ</span>
              </button>
              <button onClick={() => navigate("/check")} className="bg-slate-900/50 backdrop-blur-sm border border-white/[0.05] hover:bg-white/[0.05] transition-all rounded-[20px] p-4 flex flex-col items-center gap-3 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/20">
                  <Phone className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-xs font-semibold text-gray-300">Số điện thoại</span>
              </button>
              <button onClick={() => navigate("/check")} className="bg-slate-900/50 backdrop-blur-sm border border-white/[0.05] hover:bg-white/[0.05] transition-all rounded-[20px] p-4 flex flex-col items-center gap-3 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20">
                  <ImageIcon className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-xs font-semibold text-gray-300">Ảnh AI</span>
              </button>
            </div>
          </div>

          {/* FAMILY BANNER */}
          <button onClick={() => navigate("/family")} className="w-full relative bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-xl rounded-[24px] p-5 border border-indigo-500/20 overflow-hidden group hover:border-indigo-500/40 transition-all text-left">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-500/30 rounded-xl flex items-center justify-center border border-indigo-400/30">
                  <Users className="w-6 h-6 text-indigo-300" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base mb-0.5">Bảo vệ gia đình</h3>
                  <p className="text-xs text-indigo-200">Giám sát & cảnh báo cho người thân</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </button>

          {/* COMMUNITY ALERTS (Top 2) */}
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-[24px] border border-white/[0.05] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                <h2 className="text-sm font-bold text-white">Cảnh báo mới nhất</h2>
              </div>
              <button onClick={() => navigate("/community")} className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors">Xem tất cả</button>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-3.5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/20 rounded text-[9px] font-bold text-red-400 uppercase">Domain lạ</span>
                  <span className="text-[10px] text-gray-500">15 phút trước</span>
                </div>
                <p className="text-xs font-medium text-gray-200 mb-2 leading-relaxed">vietcombank-secure-login<span className="text-red-400">[.]</span>xyz</p>
                <div className="flex items-center gap-1.5">
                  <Flame className="w-3 h-3 text-orange-500" />
                  <span className="text-[10px] text-gray-400"><strong className="text-orange-400">47</strong> người đã báo cáo</span>
                </div>
              </div>

              <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-3.5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-orange-500/20 border border-orange-500/20 rounded text-[9px] font-bold text-orange-400 uppercase">Số lạ</span>
                  <span className="text-[10px] text-gray-500">1 giờ trước</span>
                </div>
                <p className="text-xs font-medium text-gray-200 mb-2 leading-relaxed">Số <span className="text-orange-400 font-bold">0886 234 567</span> giả danh bưu điện lừa đảo</p>
                <div className="flex items-center gap-1.5">
                  <Flame className="w-3 h-3 text-orange-500" />
                  <span className="text-[10px] text-gray-400"><strong className="text-orange-400">23</strong> người đã báo cáo</span>
                </div>
              </div>
            </div>
          </div>

          {/* REPORT FORM */}
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-[24px] border border-white/[0.05] p-5">
            <h3 className="text-sm font-bold text-white mb-4">Gửi báo cáo nghi ngờ</h3>
            
            <div className="flex bg-white/[0.03] p-1 rounded-xl mb-4 border border-white/5">
              <button
                onClick={() => setReportType("phone")}
                className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  reportType === "phone" ? "bg-white/10 text-white shadow-sm" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                Số điện thoại
              </button>
              <button
                onClick={() => setReportType("website")}
                className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  reportType === "website" ? "bg-white/10 text-white shadow-sm" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                Website (Link)
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <input
                type="text"
                value={reportInput}
                onChange={(e) => setReportInput(e.target.value)}
                placeholder={reportType === "phone" ? "Nhập số điện thoại lừa đảo..." : "Nhập đường link (VD: https://...)"}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
              />
              <textarea
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                placeholder="Mô tả ngắn gọn (Tùy chọn)"
                rows={2}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
              />
            </div>

            <button
              onClick={handleSubmitReport}
              disabled={!reportInput.trim()}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_5px_20px_rgba(79,70,229,0.3)] flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Gửi cho hệ thống
            </button>
          </div>

          {/* ANTI SCAM TIPS (Collapsible) */}
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-[24px] border border-white/[0.05] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-400" />
                <h3 className="text-sm font-bold text-white">Mẹo chống lừa đảo</h3>
              </div>
              <button onClick={() => setShowAllTips(!showAllTips)} className="text-[11px] font-semibold text-gray-400 hover:text-white transition-colors">
                {showAllTips ? "Ẩn bớt" : "Xem tất cả"}
              </button>
            </div>
            
            <div className="space-y-2">
              {displayedTips.map((tip, index) => (
                <div key={index} className={`flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.02] ${showAllTips && index > 0 ? 'animate-fadeIn' : ''}`}>
                  <span className="text-base leading-none mt-0.5">{tip.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold text-gray-200 mb-0.5">{tip.title}</h4>
                    <p className="text-[10px] text-gray-500 leading-relaxed">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FEEDBACK FORM */}
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-[24px] border border-white/[0.05] p-5">
            <h3 className="text-sm font-bold text-white mb-1">Góp ý ứng dụng</h3>
            <p className="text-[10px] text-gray-400 mb-4">Giúp chúng tôi cải thiện trải nghiệm của bạn</p>
            
            <div className="flex gap-2 justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setFeedbackRating(star)} className="p-1 hover:scale-110 transition-transform">
                  <Star className={`w-6 h-6 ${feedbackRating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`} />
                </button>
              ))}
            </div>

            <textarea
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
              placeholder="Nhập ý kiến của bạn..."
              rows={2}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none mb-3"
            />

            <button
              onClick={handleSubmitFeedback}
              disabled={feedbackRating <= 0 || !feedbackMessage.trim()}
              className="w-full py-3 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Gửi góp ý
            </button>
          </div>

        </div>
      </div>

      <BottomNav />

      {showSuccessPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900/90 backdrop-blur-2xl rounded-[24px] p-8 shadow-2xl border border-white/10 max-w-sm w-full animate-scaleIn relative overflow-hidden">
            <button onClick={() => setShowSuccessPopup(false)} className="absolute top-4 right-4 w-8 h-8 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all">
              <X className="w-5 h-5 text-gray-400" />
            </button>
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-2">Đã nhận báo cáo!</h3>
            <p className="text-sm text-gray-400 text-center mb-6">Hệ thống sẽ phân tích và cập nhật cảnh báo sớm nhất.</p>
            <button onClick={() => setShowSuccessPopup(false)} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl transition-all">Đóng</button>
          </div>
        </div>
      )}

      {showFeedbackSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900/90 backdrop-blur-2xl rounded-[24px] p-8 shadow-2xl border border-white/10 max-w-sm w-full animate-scaleIn relative overflow-hidden">
            <button onClick={() => setShowFeedbackSuccess(false)} className="absolute top-4 right-4 w-8 h-8 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all">
              <X className="w-5 h-5 text-gray-400" />
            </button>
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                <MessageCircle className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-2">Cảm ơn bạn!</h3>
            <p className="text-sm text-gray-400 text-center mb-6">Phản hồi của bạn đã được ghi nhận.</p>
            <button onClick={() => setShowFeedbackSuccess(false)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all">Đóng</button>
          </div>
        </div>
      )}

      {showProtectionPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900/90 backdrop-blur-2xl rounded-[24px] p-8 shadow-2xl border border-white/10 max-w-sm w-full animate-scaleIn relative overflow-hidden">
            <button onClick={() => setShowProtectionPopup(false)} className="absolute top-4 right-4 w-8 h-8 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all">
              <X className="w-5 h-5 text-gray-400" />
            </button>
            <div className="flex justify-center mb-5">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center border ${protectionPopupType === "enabled" ? "bg-green-500/20 border-green-500/30" : "bg-red-500/20 border-red-500/30"}`}>
                <Shield className={`w-8 h-8 ${protectionPopupType === "enabled" ? "text-green-400" : "text-red-400"}`} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-2">{protectionPopupType === "enabled" ? "Đã bật bảo vệ" : "Đã tạm dừng bảo vệ"}</h3>
            <p className="text-sm text-gray-400 text-center mb-6">
              {protectionPopupType === "enabled" ? "Thiết bị của bạn đang được giám sát chặt chẽ." : "Cảnh báo tự động đã bị vô hiệu hóa."}
            </p>
            <button onClick={() => setShowProtectionPopup(false)} className={`w-full text-white font-bold py-3.5 rounded-xl transition-all ${protectionPopupType === "enabled" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}