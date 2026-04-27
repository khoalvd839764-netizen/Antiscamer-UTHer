import { useState, useEffect } from "react";
import { Shield, Phone, MessageSquare, AlertTriangle, Plus, X, ShieldCheck, Headset, HeartPulse } from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { toast } from "sonner";

export function ElderHome() {
  const navigate = useNavigate();

  // Load maxProtection from localStorage
  const [maxProtection, setMaxProtection] = useState(() => {
    const saved = localStorage.getItem('elderMaxProtection');
    return saved !== 'false'; // default true
  });

  // Save maxProtection to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('elderMaxProtection', maxProtection.toString());
  }, [maxProtection]);

  // Mock family members
  const [familyMembers] = useState([
    { id: 1, name: "Ba", phone: "0912 345 678", avatar: "👨" },
    { id: 2, name: "Mẹ", phone: "0923 456 789", avatar: "👩" },
    { id: 3, name: "Con", phone: "0934 567 890", avatar: "👧" },
  ]);

  const [showAddContact, setShowAddContact] = useState(false);

  const handleExitElderMode = () => {
    localStorage.setItem('elderMode', 'false');
    navigate('/');
    window.location.reload();
  };

  const handleSOS = () => {
    toast.error("ĐÃ GỬI TÍN HIỆU SOS!", {
      description: "Hệ thống đang thông báo khẩn cấp cho gia đình...",
      duration: 5000,
    });
    // Rung điện thoại báo hiệu đã bấm thành công (chỉ hoạt động trên mobile)
    if (navigator.vibrate) navigator.vibrate([300, 200, 300, 200, 300]);
  };

  const handleCallSupport = () => {
    toast.info("ĐANG GỌI TỔNG ĐÀI...", {
      description: "Đang kết nối với hỗ trợ viên, vui lòng chờ...",
      duration: 3000,
    });
    setTimeout(() => window.location.href = "tel:19001567", 1000);
  };

  return (
    <div className="h-full flex flex-col relative bg-slate-950">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-8">
        <div className="p-5 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-extrabold text-white">Xin chào!</h1>
            <button
              onClick={handleExitElderMode}
              className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center shadow-lg border border-white/20 transition-all active:scale-95"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Max Protection Card (Giant) */}
          <div className={`relative overflow-hidden rounded-[32px] p-6 shadow-2xl transition-all duration-500 border-2 ${maxProtection ? 'bg-green-500/20 border-green-500/40' : 'bg-red-500/20 border-red-500/40'}`}>
            {maxProtection && <div className="absolute -top-20 -right-20 w-48 h-48 bg-green-500/30 rounded-full blur-[50px]"></div>}
            
            <div className="relative z-10 flex items-center gap-5 mb-6">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 ${maxProtection ? 'bg-green-500 border-green-400 text-white' : 'bg-red-500 border-red-400 text-white'}`}>
                {maxProtection ? <ShieldCheck className="w-10 h-10" /> : <AlertTriangle className="w-10 h-10" />}
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {maxProtection ? "An Toàn" : "Nguy Hiểm"}
                </h2>
                <p className="text-lg text-gray-200 leading-tight">
                  {maxProtection ? "Máy đang được bảo vệ 24/7" : "Hãy bật bảo vệ ngay lập tức!"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setMaxProtection(!maxProtection)}
              className={`w-full py-5 rounded-2xl font-bold text-2xl transition-all shadow-xl active:scale-95 ${maxProtection ? 'bg-white/10 text-white border border-white/20' : 'bg-red-500 text-white hover:bg-red-600'}`}
            >
              {maxProtection ? "TẠM DỪNG BẢO VỆ" : "BẬT BẢO VỆ NGAY"}
            </button>
          </div>

          {/* Emergency Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleSOS}
              className="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 p-6 rounded-[28px] shadow-[0_10px_20px_rgba(220,38,38,0.4)] flex flex-col items-center justify-center gap-3 active:scale-95 transition-all border border-red-400/50"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                <HeartPulse className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-extrabold text-white">SOS</span>
              <span className="text-sm text-red-100 font-semibold text-center leading-tight">Báo Khẩn Cấp<br/>Cho Gia Đình</span>
            </button>

            <button
              onClick={handleCallSupport}
              className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 p-6 rounded-[28px] shadow-[0_10px_20px_rgba(59,130,246,0.4)] flex flex-col items-center justify-center gap-3 active:scale-95 transition-all border border-blue-400/50"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Headset className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-extrabold text-white">HỖ TRỢ</span>
              <span className="text-sm text-blue-100 font-semibold text-center leading-tight">Gọi Chuyên Gia<br/>Tư Vấn</span>
            </button>
          </div>

          {/* Contacts List */}
          <div className="bg-slate-900/80 backdrop-blur-2xl rounded-[32px] p-6 shadow-xl border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Danh bạ nhanh</h3>
              <button
                onClick={() => setShowAddContact(true)}
                className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95"
              >
                <Plus className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="space-y-4">
              {familyMembers.map((member) => (
                <div key={member.id} className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-3xl shadow-md flex-shrink-0">
                    {member.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-2xl font-bold text-white mb-1 truncate">{member.name}</h4>
                    <p className="text-lg text-gray-400 truncate">{member.phone}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <a
                      href={`sms:${member.phone.replace(/\s/g, '')}`}
                      className="w-14 h-14 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-2xl flex items-center justify-center hover:bg-blue-500/30 transition-all active:scale-95"
                    >
                      <MessageSquare className="w-6 h-6" />
                    </a>
                    <a
                      href={`tel:${member.phone.replace(/\s/g, '')}`}
                      className="w-14 h-14 bg-green-500/20 text-green-400 border border-green-500/30 rounded-2xl flex items-center justify-center hover:bg-green-500/30 transition-all active:scale-95"
                    >
                      <Phone className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Contact Popup */}
      {showAddContact && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900/90 backdrop-blur-2xl rounded-[32px] p-8 shadow-2xl border border-white/10 max-w-md w-full"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-6">Thêm người thân</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-xl font-bold text-white mb-3">Tên</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Ba"
                  className="w-full px-6 py-4 text-xl rounded-2xl bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-xl font-bold text-white mb-3">Số điện thoại</label>
                <input
                  type="tel"
                  placeholder="Ví dụ: 0912 345 678"
                  className="w-full px-6 py-4 text-xl rounded-2xl bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/50 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <button
                onClick={() => setShowAddContact(false)}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xl py-4 rounded-2xl transition-all"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  // Add contact logic here
                  setShowAddContact(false);
                }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-xl py-4 rounded-2xl shadow-lg transition-all"
              >
                Thêm
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
