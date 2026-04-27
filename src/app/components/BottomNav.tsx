import { useNavigate, useLocation } from "react-router";
import { Home, ShieldCheck, Users, UserPlus, AlertTriangle } from "lucide-react";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { path: "/home", label: "Trang chủ", icon: Home },
    { path: "/check", label: "Kiểm tra", icon: ShieldCheck },
    { path: "/community", label: "Cộng đồng", icon: Users },
    { path: "/emergency-support", label: "Hỗ trợ 24h", icon: AlertTriangle },
    { path: "/family", label: "Người thân", icon: UserPlus },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/95 to-slate-900/90 backdrop-blur-xl border-t border-white/10 pb-6 z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center flex-1 py-2 px-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? "bg-gradient-to-br from-red-500/20 to-red-600/20 scale-105" 
                  : "hover:bg-white/5 active:bg-white/10"
              }`}
            >
              <div className={`relative ${isActive ? "mb-1" : ""}`}>
                <Icon 
                  className={`transition-all duration-300 ${
                    isActive 
                      ? "w-6 h-6 text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.6)]" 
                      : "w-5 h-5 text-gray-400"
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {isActive && (
                  <div className="absolute inset-0 bg-red-400/30 blur-lg rounded-full"></div>
                )}
              </div>
              <span 
                className={`text-[10px] font-semibold transition-all duration-300 ${
                  isActive 
                    ? "text-red-300" 
                    : "text-gray-500"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}