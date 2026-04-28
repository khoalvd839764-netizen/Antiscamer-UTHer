import { useEffect } from "react";
import { Outlet } from "react-router";
import { Toaster } from "./components/ui/sonner";
import { useNavigate, useLocation } from "react-router";
import { MiniChat } from "./components/MiniChat";
import { motion, AnimatePresence } from "motion/react";
import { Crown } from "lucide-react";
import chimLacImg from "../../chimlachinh.png";

export function Root() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get current time
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  // Hiệu ứng âm thanh mộc mạc truyền thống Việt Nam (Âm giai Ngũ Cung)
  useEffect(() => {
    const playVietnameseChime = () => {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        // Thang âm ngũ cung Việt Nam (G4, A4, C5, D5, E5) - Tương đương Hò, Sự, Xang, Xê, Cống
        const pentatonicScale = [392.00, 440.00, 523.25, 587.33, 659.25];
        const randomNote = pentatonicScale[Math.floor(Math.random() * pentatonicScale.length)];
        
        osc.type = 'sine'; // Âm thanh tròn, ấm giống tiếng đàn mộc mạc
        osc.frequency.setValueAtTime(randomNote, ctx.currentTime);
        
        // Envelope mô phỏng tiếng gảy đàn (Đàn tranh/Đàn bầu)
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.02); // Gảy mạnh nhẹ
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2); // Ngân vang
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      } catch (e) {
        console.log("Audio API not supported");
      }
    };

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Phát âm thanh tiếng đàn khi nhấp vào các phần tử tương tác (button, svg icon, thẻ a)
      if (target.closest('button') || target.closest('a') || target.closest('svg')) {
        playVietnameseChime();
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center md:p-4 relative overflow-hidden">
      {/* Desktop Background Effects (Hidden on Mobile) */}
      <div className="hidden md:block absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {/* Device Frame (Full screen on mobile, iPhone 14 Pro Max frame on desktop) */}
      <div className="relative w-full h-screen md:w-[430px] md:h-[932px] bg-black md:rounded-[60px] md:shadow-2xl overflow-hidden md:border-[14px] md:border-gray-800 safe-area">
        {/* Dynamic Island (Hidden on Mobile) */}
        <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />

        {/* Screen Content with Professional Background */}
        <div className="w-full h-full overflow-hidden flex flex-col relative">
          {/* Professional Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20 animate-gradient"></div>

            {/* Họa tiết Trống Đồng & Chim Lạc (Watermark bản sắc Việt) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none">
              <svg viewBox="0 0 500 500" className="w-[800px] h-[800px]" style={{ animation: 'spin 120s linear infinite' }}>
                {/* Ngôi sao 14 cánh giữa trống đồng */}
                <path d="M250,150 L265,220 L335,205 L285,245 L345,285 L275,275 L285,345 L245,295 L195,345 L215,275 L145,285 L205,245 L155,205 L225,220 Z" fill="currentColor" className="text-white"/>
                
                {/* Các vòng tròn đồng tâm */}
                <circle cx="250" cy="250" r="120" fill="none" stroke="currentColor" strokeWidth="2" className="text-white" strokeDasharray="4 4"/>
                <circle cx="250" cy="250" r="160" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white"/>
                <circle cx="250" cy="250" r="200" fill="none" stroke="currentColor" strokeWidth="6" className="text-white" strokeDasharray="12 18"/>
                
                {/* Họa tiết Chim Lạc bay ngược chiều kim đồng hồ (tượng trưng) */}
                <g className="text-white" fill="currentColor">
                  <path d="M250,30 Q270,50 290,40 Q270,60 250,55 Z" transform="rotate(0 250 250)" />
                  <path d="M250,30 Q270,50 290,40 Q270,60 250,55 Z" transform="rotate(45 250 250)" />
                  <path d="M250,30 Q270,50 290,40 Q270,60 250,55 Z" transform="rotate(90 250 250)" />
                  <path d="M250,30 Q270,50 290,40 Q270,60 250,55 Z" transform="rotate(135 250 250)" />
                  <path d="M250,30 Q270,50 290,40 Q270,60 250,55 Z" transform="rotate(180 250 250)" />
                  <path d="M250,30 Q270,50 290,40 Q270,60 250,55 Z" transform="rotate(225 250 250)" />
                  <path d="M250,30 Q270,50 290,40 Q270,60 250,55 Z" transform="rotate(270 250 250)" />
                  <path d="M250,30 Q270,50 290,40 Q270,60 250,55 Z" transform="rotate(315 250 250)" />
                </g>
              </svg>
            </div>

            {/* Đàn Chim Lạc bay lượn ngang qua các trang */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.25] z-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`chim-lac-bay-${i}`}
                  className="absolute"
                  initial={{ left: '-20%', top: `${15 + i * 12}%` }}
                  animate={{ left: '120%', top: `${5 + i * 12}%` }}
                  transition={{
                    duration: 25 + (i % 3) * 8, // Tốc độ bay chậm rãi, cổ kính
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 3.5 // Chim bay so le nhau thành đàn
                  }}
                >
                <img 
                  src={chimLacImg} 
                  alt="Chim Lạc" 
                  className="w-16 h-auto mix-blend-screen"
                  style={{ filter: 'invert(1) hue-rotate(180deg) brightness(1.5)' }}
                />
                </motion.div>
              ))}
            </div>

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} />

            {/* Floating orbs - subtle and professional */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-32 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>

            {/* Cyber security particles */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `twinkle ${3 + Math.random() * 4}s infinite ${Math.random() * 2}s`
                  }}
                ></div>
              ))}
            </div>

            {/* Radial gradient vignette */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-950/30 to-slate-950/60"></div>
          </div>

          {/* Content Layer */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Status Bar */}
            <div className="h-[54px] flex items-center justify-between px-6 md:px-8 pt-2">
              {/* Left: Time */}
              <div className="text-sm font-semibold text-white drop-shadow-lg">
                {hours}:{minutes}
              </div>

              {/* Right: WiFi, Battery */}
              <div className="flex items-center gap-1.5">
                {/* WiFi Icon */}
                <svg className="w-4 h-4 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3C5.58 3 1.73 5.61.28 9.35a.75.75 0 0 0 1.38.6C3.14 6.78 6.35 4.5 10 4.5s6.86 2.28 8.34 5.45a.75.75 0 0 0 1.38-.6C18.27 5.61 14.42 3 10 3z"/>
                  <path d="M10 7c-2.76 0-5.21 1.4-6.65 3.53a.75.75 0 0 0 1.3.75A6.97 6.97 0 0 1 10 8.5a6.97 6.97 0 0 1 5.35 2.78.75.75 0 0 0 1.3-.75C15.21 8.4 12.76 7 10 7z"/>
                  <path d="M10 11.5a3.5 3.5 0 0 0-2.8 1.4.75.75 0 1 0 1.2.9c.4-.54 1.02-.8 1.6-.8s1.2.26 1.6.8a.75.75 0 1 0 1.2-.9 3.5 3.5 0 0 0-2.8-1.4z"/>
                  <circle cx="10" cy="16" r="1.25"/>
                </svg>

                {/* Battery Icon */}
                <svg className="w-6 h-4 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 16">
                  <rect x="1" y="3" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <rect x="3" y="5" width="14" height="6" rx="1" fill="currentColor"/>
                  <rect x="20" y="6" width="2" height="4" rx="1" fill="currentColor"/>
                </svg>
                <span className="text-xs font-semibold text-white drop-shadow-lg">95%</span>
              </div>
            </div>

            {/* Global User Profile - Top Right Corner */}
            {location.pathname !== '/' && location.pathname !== '/elder-home' && (
              <div className="absolute top-14 right-3 md:right-5 z-40 pointer-events-none opacity-85">
                <div className="flex items-center gap-2 bg-slate-900/40 backdrop-blur-md border border-white/10 pl-2.5 pr-1 py-1 rounded-full shadow-lg">
                  <div className="flex flex-col items-end">
                    <span className="text-[11px] font-bold text-white/90 leading-tight drop-shadow-md">Nguyễn Văn An</span>
                    <div className="flex items-center gap-1">
                      <Crown className="w-2.5 h-2.5 text-yellow-400" />
                      <span className="text-[8px] font-bold text-yellow-400 tracking-wider">PREMIUM</span>
                    </div>
                  </div>
                  
                  {/* Spinning Vietnam Avatar */}
                  <div className="relative flex items-center justify-center w-7 h-7 bg-[#DA251D] rounded-full shadow-[0_0_10px_rgba(218,37,29,0.6)] border border-yellow-400/50 flex-shrink-0">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    >
                      <svg className="w-3.5 h-3.5 text-[#FFFF00] drop-shadow-[0_0_5px_rgba(255,255,0,0.8)]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                      </svg>
                    </motion.div>
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_0_8px_rgba(255,255,0,0.4)]"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="h-full"
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>

            <MiniChat />
            <Toaster richColors position="top-center" />

            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[140px] h-[5px] bg-white bg-opacity-60 rounded-full z-50" />
          </div>
        </div>
      </div>
    </div>
  );
}