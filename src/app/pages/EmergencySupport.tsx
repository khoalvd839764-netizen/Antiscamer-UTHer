import { useNavigate } from "react-router";
import { AlertTriangle, Shield, Phone, MessageSquare, Scale, Heart, ChevronLeft, Clock } from "lucide-react";
import { toast } from "sonner";

export function EmergencySupport() {
  const navigate = useNavigate();

  const emergencyOptions = [
    {
      id: 1,
      title: "Báo cáo lừa đảo khẩn cấp",
      description: "Bạn đang bị lừa đảo ngay lúc này",
      icon: AlertTriangle,
      color: "from-red-500 to-red-600",
      action: () => {
        toast.error("Đang kết nối với bộ phận khẩn cấp!", {
          description: "Vui lòng giữ máy...",
          duration: 3000,
        });
        setTimeout(() => {
          window.location.href = "tel:113";
        }, 1000);
      },
    },
    {
      id: 2,
      title: "Hỗ trợ mất tiền/tài khoản",
      description: "Tài khoản bị xâm nhập hoặc mất tiền",
      icon: Shield,
      color: "from-orange-500 to-orange-600",
      action: () => {
        window.dispatchEvent(new CustomEvent('open-minichat', { detail: 'Tài khoản của tôi bị xâm nhập/mất tiền, tôi cần hỗ trợ ngay!' }));
        toast.success("Đã kết nối với Trợ lý AI bảo mật", {
          duration: 2000,
        });
      },
    },
    {
      id: 3,
      title: "Gọi công an 113",
      description: "Kết nối trực tiếp với công an",
      icon: Phone,
      color: "from-blue-600 to-blue-700",
      action: () => {
        toast.success("Đang gọi công an 113...", {
          duration: 2000,
        });
        setTimeout(() => {
          window.location.href = "tel:113";
        }, 500);
      },
    },
    {
      id: 4,
      title: "Tư vấn pháp lý",
      description: "Hỗ trợ về quyền lợi và pháp luật",
      icon: Scale,
      color: "from-purple-500 to-purple-600",
      action: () => {
        toast.info("Đang kết nối với luật sư tư vấn...", {
          description: "Dịch vụ miễn phí cho nạn nhân lừa đảo",
          duration: 3000,
        });
      },
    },
    {
      id: 5,
      title: "Hỗ trợ tâm lý",
      description: "Tư vấn tinh thần cho nạn nhân",
      icon: Heart,
      color: "from-pink-500 to-pink-600",
      action: () => {
        toast.info("Đang kết nối với chuyên gia tâm lý...", {
          description: "Bạn không đơn độc, chúng tôi luôn ở đây",
          duration: 3000,
        });
      },
    },
    {
      id: 6,
      title: "Chat trực tiếp",
      description: "Nhắn tin với chuyên gia ngay",
      icon: MessageSquare,
      color: "from-green-500 to-green-600",
      action: () => {
        window.dispatchEvent(new CustomEvent('open-minichat', { detail: 'Xin chào, tôi cần tư vấn về các dấu hiệu lừa đảo.' }));
        toast.success("Đã mở Mini Chat hỗ trợ", {
          duration: 2000,
        });
      },
    },
  ];

  return (
    <div className="min-h-full px-5 pb-6 pt-10">
      {/* Header */}
      <div className="mb-5">
        <button
          onClick={() => navigate(-1)}
          className="mb-3 flex items-center gap-2 text-white/80 hover:text-white transition-colors active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">Quay lại</span>
        </button>

        <div className="bg-slate-900/50 backdrop-blur-xl rounded-[24px] p-6 border border-white/[0.05] shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <AlertTriangle className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Hỗ trợ khẩn cấp</h1>
              <p className="text-red-200 text-xs">Phản hồi nhanh 24/7</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2 bg-green-500/20 backdrop-blur-sm rounded-full px-3 py-1.5 border border-green-400/30 w-fit">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-300 text-xs font-semibold">Đang hoạt động</span>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="mb-5 bg-slate-900/50 backdrop-blur-xl rounded-[20px] p-4 border border-white/[0.05]">
        <div className="flex items-start gap-2.5">
          <Clock className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-white/90 text-xs font-semibold mb-0.5">Thời gian phản hồi trung bình</p>
            <p className="text-white/60 text-xs">Khẩn cấp: &lt; 1 phút | Thường: &lt; 5 phút</p>
          </div>
        </div>
      </div>

      {/* Emergency Options Grid */}
      <div className="space-y-3 mb-5">
        <h2 className="text-base font-bold text-white mb-3">Chọn loại hỗ trợ</h2>
        {emergencyOptions.map((option) => (
          <button
            key={option.id}
            onClick={option.action}
            className="w-full group relative overflow-hidden active:scale-[0.98] transition-transform"
          >
            {/* Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${option.color} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>

            {/* Card */}
            <div className={`relative bg-slate-900/50 backdrop-blur-xl rounded-[24px] p-5 border border-white/[0.05] shadow-lg transition-all duration-300 group-hover:bg-white/[0.05]`}>
              {/* Glass overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent rounded-2xl"></div>

              <div className="relative flex items-center gap-3">
                {/* Icon */}
                <div className={`w-11 h-11 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                  <option.icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>

                {/* Text */}
                <div className="flex-1 text-left">
                  <h3 className="text-white font-bold text-sm mb-0.5">{option.title}</h3>
                  <p className="text-white/70 text-xs">{option.description}</p>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0">
                  <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </div>
          </button>
        ))}
      </div>

      {/* Warning Note */}
      <div className="bg-slate-900/50 backdrop-blur-xl rounded-[20px] p-4 border border-white/[0.05]">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-yellow-300 text-xs font-semibold mb-1">Lưu ý quan trọng</p>
            <p className="text-white/70 text-xs leading-relaxed">
              • Không chuyển tiền cho bất kỳ ai yêu cầu qua điện thoại<br/>
              • Không cung cấp OTP, mật khẩu cho bất kỳ ai<br/>
              • Ghi lại thông tin người lừa đảo (số điện thoại, tài khoản)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}