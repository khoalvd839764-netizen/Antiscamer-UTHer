import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Shield, Crown, ArrowRight, Sparkles, Users, Heart } from "lucide-react";
import { motion } from "motion/react";

// --- SVG Components for Vietnamese Theme ---
const LacBird = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 104 94" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M55.693 18.016V28.836L51.461 39.656L43.005 52.68L37.419 63.5L36.349 76.524L40.869 83.036L47.525 87.344L55.693 90.068L63.861 87.344L70.517 83.036L74.925 76.524L73.967 63.5L68.381 52.68L59.925 39.656L55.693 28.836V18.016Z" stroke="url(#paint1_linear_lac)" strokeWidth="4"/>
    <path d="M55.693 15.812C55.693 15.812 46.556 22.324 37.419 28.836C28.282 35.348 22.714 38.604 20.578 38.604C18.442 38.604 16.65 36.468 15.192 34.332C13.744 32.196 12.64 29.716 11.88 26.892C11.12 24.068 10.704 20.904 10.704 17.396C10.704 13.888 11.12 10.38 11.88 6.872C12.64 3.364 13.744 0.884 15.192 -0.596C16.65 -2.076 18.442 -2.576 20.578 -2.576C22.714 -2.576 28.282 0.68 37.419 7.192C46.556 13.704 55.693 20.216 55.693 20.216" stroke="url(#paint0_linear_lac)" strokeWidth="4"/>
    <defs>
      <linearGradient id="paint0_linear_lac" x1="55.693" y1="-2.576" x2="55.693" y2="38.604" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBBF24" stopOpacity="0.8"/>
        <stop offset="1" stopColor="#F59E0B" stopOpacity="0.3"/>
      </linearGradient>
      <linearGradient id="paint1_linear_lac" x1="55.693" y1="18.016" x2="55.693" y2="90.068" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBBF24" stopOpacity="0.8"/>
        <stop offset="1" stopColor="#F59E0B" stopOpacity="0.3"/>
      </linearGradient>
    </defs>
  </svg>
);

const Bamboo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 30 250" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 250C15 208.333 2.5 187.5 2.5 150C2.5 112.5 15 91.6667 15 50C15 8.33333 2.5 -12.5 2.5 0" stroke="currentColor" strokeWidth="3"/>
    <path d="M2.5 33.5L-12.5 25.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2.5 41.5L-9.5 45.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M15 91.5L30.5 83.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M15 99.5L27.5 103.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2.5 183.5L-12.5 175.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2.5 191.5L-9.5 195.5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export function Welcome() {
  const navigate = useNavigate();
  const [showModeSelector, setShowModeSelector] = useState(false);

  const handleStartProtection = () => {
    setShowModeSelector(true);
  };

  const handleSelectMode = (mode: "normal" | "elder") => {
    if (mode === "elder") {
      localStorage.setItem('elderMode', 'true');
      navigate("/elder-home");
    } else {
      localStorage.setItem('elderMode', 'false');
      navigate("/home");
    }
  };

  return (
    <div className="h-full flex flex-col justify-between px-6 py-8 overflow-y-auto relative">
      {/* --- Background Elements --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Flying Lac Birds */}
        <motion.div
          className="absolute opacity-20"
          initial={{ top: '15%', right: '-20%' }}
          animate={{ right: '120%' }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear', delay: 0 }}
        >
          <LacBird className="w-24 h-24 -scale-x-100" />
        </motion.div>
        <motion.div
          className="absolute opacity-15"
          initial={{ top: '25%', right: '-25%' }}
          animate={{ right: '120%' }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear', delay: 8 }}
        >
          <LacBird className="w-16 h-16 -scale-x-100" />
        </motion.div>

        {/* Swaying Bamboo */}
        <motion.div
          className="absolute -bottom-10 -left-8 text-green-400/10"
          animate={{ rotate: [-2, 1, -2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Bamboo className="w-20 h-auto" />
        </motion.div>
        <motion.div
          className="absolute -bottom-12 -right-5 text-green-400/15"
          animate={{ rotate: [2, -1, 2] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <Bamboo className="w-24 h-auto" />
        </motion.div>
      </div>

      {/* Logo and Title */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10"
      >
        <div className="flex justify-center mb-4">
          {/* Original 3D Shield Logo */}
          <motion.div 
            className="relative"
            animate={{ rotateY: [0, 5, 0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Outer glow rings */}
            <div className="absolute inset-0 w-24 h-24 -left-2 -top-2">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/30 to-orange-500/30 blur-2xl animate-pulse"></div>
              <div className="absolute inset-2 rounded-full border-2 border-red-400/20 animate-spin" style={{ animationDuration: '8s' }}></div>
            </div>
            
            {/* Main logo container */}
            <div className="relative w-20 h-20 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full animate-shine"></div>
              
              {/* 3D depth layers */}
              <div className="absolute inset-1 bg-gradient-to-br from-red-400/50 to-transparent rounded-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
              
              {/* Shield with checkmark icon */}
              <div className="relative z-10">
                <svg className="w-12 h-12 text-white drop-shadow-2xl" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                
                {/* Inner glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white/30 rounded-full blur-md"></div>
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-1 right-1 w-3 h-3 bg-gradient-to-br from-white/60 to-transparent rounded-full"></div>
              <div className="absolute bottom-1 left-1 w-2 h-2 bg-gradient-to-tr from-white/40 to-transparent rounded-full"></div>
            </div>
            
            {/* Floating particles */}
            <motion.div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full shadow-lg shadow-orange-500/50" animate={{ y: [-3, 3, -3], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}></motion.div>
            <motion.div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-red-300 rounded-full shadow-lg shadow-red-400/50" animate={{ y: [3, -3, 3], opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}></motion.div>
          </motion.div>
        </div>

        <div className="relative inline-block mb-3">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
            Anti Scamer
          </h1>
          <Sparkles className="absolute -top-3 -right-6 w-5 h-5 text-yellow-400 animate-pulse" />
        </div>
        
        <div className="bg-white/[0.03] border border-white/[0.05] backdrop-blur-md rounded-2xl p-4 mb-4 shadow-inner">
          <p className="text-[13px] text-gray-300 font-medium leading-relaxed">
            Không chỉ bảo vệ cá nhân bạn, mà còn bảo vệ <span className="text-yellow-400 font-bold drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]">gia đình</span> và <span className="text-red-400 font-bold drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]">cộng đồng người Việt</span>
          </p>
        </div>

        {/* Vietnam Badge */}
        <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600/20 to-yellow-500/20 backdrop-blur-xl border border-red-500/30 rounded-full px-4 py-1.5 shadow-[0_0_15px_rgba(220,38,38,0.2)] inline-flex">
          <div className="relative flex items-center justify-center w-6 h-6 bg-[#DA251D] rounded-full shadow-[0_0_5px_rgba(218,37,29,0.8)] border border-yellow-400/50 flex-shrink-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              <svg className="w-3.5 h-3.5 text-[#FFFF00] drop-shadow-[0_0_2px_rgba(255,255,0,0.8)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
              </svg>
            </motion.div>
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_4px_rgba(255,255,0,0.4)]"></div>
          </div>
          <span className="text-[11px] font-bold text-red-100 tracking-wide uppercase">Tự hào app người Việt</span>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="space-y-3 relative z-10"
      >
        <h2 className="text-center text-xs font-bold text-gray-400 mb-2 tracking-widest uppercase">Hệ sinh thái bảo vệ</h2>
        <div className="grid grid-cols-3 gap-3">
          {/* Feature 1: Cá nhân */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] rounded-[20px] p-3 text-center shadow-lg hover:bg-white/[0.05] transition-all"
          >
            <div className="w-10 h-10 mx-auto mb-2 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/20">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-xs font-bold text-white mb-1">Cá nhân</h3>
            <p className="text-[9px] text-gray-400 leading-tight">Chặn lừa đảo<br/>tức thì</p>
          </motion.div>

          {/* Feature 2: Gia đình */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] rounded-[20px] p-3 text-center shadow-lg hover:bg-white/[0.05] transition-all"
          >
            <div className="w-10 h-10 mx-auto mb-2 bg-pink-500/20 rounded-full flex items-center justify-center border border-pink-500/20">
              <Heart className="w-5 h-5 text-pink-400" />
            </div>
            <h3 className="text-xs font-bold text-white mb-1">Gia đình</h3>
            <p className="text-[9px] text-gray-400 leading-tight">Liên kết bảo vệ<br/>người thân</p>
          </motion.div>

          {/* Feature 3: Cộng đồng */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] rounded-[20px] p-3 text-center shadow-lg hover:bg-white/[0.05] transition-all"
          >
            <div className="w-10 h-10 mx-auto mb-2 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-500/20">
              <Users className="w-5 h-5 text-orange-400" />
            </div>
            <h3 className="text-xs font-bold text-white mb-1">Cộng đồng</h3>
            <p className="text-[9px] text-gray-400 leading-tight">Mạng lưới cảnh báo<br/>rộng khắp</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Account Info Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-slate-900/60 backdrop-blur-xl rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.3)] p-5 border border-white/[0.08] relative overflow-hidden z-10"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg border border-blue-400/30">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-0.5">Nguyễn Văn An</h3>
              <p className="text-[10px] text-gray-400">ID: VN-847291</p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full px-2.5 py-1 shadow-sm">
            <Crown className="w-3 h-3 text-yellow-400" />
            <span className="text-[10px] font-bold text-yellow-400 tracking-wider">PREMIUM</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl py-2 relative z-10">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-400 font-semibold">Trạng thái: Sẵn sàng bảo vệ</span>
        </div>
      </motion.div>

      {/* Start Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative z-10"
      >
        {/* Glow effect - Always animated */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-red-700 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
        
        <Button
          onClick={handleStartProtection}
          className="relative w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white py-6 text-lg font-bold rounded-[20px] shadow-[0_10px_30px_rgba(220,38,38,0.4)] transition-all duration-300 flex items-center justify-center gap-2 border border-red-500/50 overflow-hidden group"
        >
          {/* Shine effect - Continuous animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
          
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Shield className="w-5 h-5" />
          </motion.div>
          
          <span className="relative z-10">Bắt đầu bảo vệ</span>
          
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </Button>
      </motion.div>

      {/* Mode Selector Popup */}
      {showModeSelector && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/70 backdrop-blur-md animate-fadeIn">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900/90 backdrop-blur-2xl rounded-[24px] p-6 shadow-2xl border border-white/10 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold text-white text-center mb-3">Chọn chế độ sử dụng</h2>
            <p className="text-sm text-gray-300 text-center mb-6">
              Chọn giao diện phù hợp với bạn
            </p>

            {/* Normal Mode */}
            <button
              onClick={() => handleSelectMode("normal")}
              className="w-full bg-slate-800/50 hover:bg-slate-800 border border-white/[0.05] hover:border-blue-500/50 text-white rounded-[20px] p-4 mb-3 shadow-lg transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border border-blue-500/20">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-base font-bold mb-0.5 text-white">Bảng điều khiển</h3>
                  <p className="text-xs text-gray-400">Đầy đủ tính năng chuyên sâu</p>
                </div>
              </div>
            </button>

            {/* Elder Mode */}
            <button
              onClick={() => handleSelectMode("elder")}
              className="w-full bg-slate-800/50 hover:bg-slate-800 border border-white/[0.05] hover:border-green-500/50 text-white rounded-[20px] p-4 shadow-lg transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border border-green-500/20">
                  <span className="text-2xl">👴</span>
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-base font-bold mb-0.5 text-white">Chế độ người lớn tuổi</h3>
                  <p className="text-xs text-gray-400">Giao diện tối giản, chữ to rõ</p>
                </div>
              </div>
            </button>

            {/* Cancel Button */}
            <button
              onClick={() => setShowModeSelector(false)}
              className="w-full mt-4 bg-white/5 hover:bg-white/10 text-white font-semibold py-3.5 rounded-xl transition-all"
            >
              Hủy
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
