import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import { Toaster } from "./components/ui/sonner";
import { useNavigate, useLocation } from "react-router";
import { MiniChat } from "./components/MiniChat";
import { motion, AnimatePresence } from "motion/react";
import { Crown } from "lucide-react";

export function Root() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get current time
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  // Detect if user is on mobile device
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile version - Full screen
  if (isMobile) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Professional Animated Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20 animate-gradient"></div>

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
        <div className="relative z-10 flex flex-col h-screen safe-area">
          {/* Status Bar */}
          <div className="h-[54px] flex items-center justify-between px-6 pt-2">
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
            <div className="absolute top-14 right-3 z-40 pointer-events-none opacity-85">
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
    );
  }

  // Desktop version - iPhone Frame
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Desktop Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {/* iPhone 14 Pro Max Frame */}
      <div className="relative w-[430px] h-[932px] bg-black rounded-[60px] shadow-2xl overflow-hidden border-[14px] border-gray-800">
        {/* Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />

        {/* Screen Content with Professional Background */}
        <div className="w-full h-full overflow-hidden flex flex-col relative">
          {/* Professional Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20 animate-gradient"></div>

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
            <div className="h-[54px] flex items-center justify-between px-8 pt-2">
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
              <div className="absolute top-14 right-5 z-40 pointer-events-none opacity-85">
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