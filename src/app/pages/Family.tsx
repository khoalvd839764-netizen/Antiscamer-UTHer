import { Users, UserPlus, Phone, Shield, Trash2, Edit, AlertTriangle, Bell, Eye, ChevronRight, CheckCircle, XCircle, Clock, UserCheck, UserX, ArrowLeft, MessageCircle } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";

interface ScamActivity {
  id: number;
  type: "link" | "phone" | "message";
  description: string;
  riskLevel: "high" | "medium" | "low";
  timestamp: string;
  blocked: boolean;
}

interface FamilyMember {
  id: number;
  name: string;
  phone: string;
  relation: string;
  protected: boolean;
  avatar: string;
  recentActivities: ScamActivity[];
  riskScore: number; // 0-100
}

interface FamilyRequest {
  id: number;
  name: string;
  phone: string;
  relation: string;
  avatar: string;
  requestTime: string;
}

const mockFamily: FamilyMember[] = [
  {
    id: 1,
    name: "Mẹ",
    phone: "0912345678",
    relation: "Cha mẹ",
    protected: true,
    avatar: "👩",
    riskScore: 75,
    recentActivities: [
      {
        id: 1,
        type: "link",
        description: "Truy cập link lừa đảo ngân hàng giả mạo",
        riskLevel: "high",
        timestamp: "2 giờ trước",
        blocked: true
      },
      {
        id: 2,
        type: "phone",
        description: "Nhận cuộc gọi từ số lạ nghi vấn lừa đảo",
        riskLevel: "medium",
        timestamp: "5 giờ trước",
        blocked: false
      },
      {
        id: 3,
        type: "message",
        description: "Nhận tin nhắn trúng thưởng giả mạo",
        riskLevel: "high",
        timestamp: "1 ngày trước",
        blocked: true
      }
    ]
  },
  {
    id: 2,
    name: "Bố",
    phone: "0987654321",
    relation: "Cha mẹ",
    protected: true,
    avatar: "👨",
    riskScore: 20,
    recentActivities: [
      {
        id: 4,
        type: "phone",
        description: "Nhận cuộc gọi từ số lạ",
        riskLevel: "low",
        timestamp: "3 ngày trước",
        blocked: false
      }
    ]
  },
  {
    id: 3,
    name: "Em gái",
    phone: "0898765432",
    relation: "Anh chị em",
    protected: true,
    avatar: "👧",
    riskScore: 5,
    recentActivities: []
  },
  {
    id: 4,
    name: "Bà ngoại",
    phone: "0856789012",
    relation: "Ông bà",
    protected: false,
    avatar: "👵",
    riskScore: 0,
    recentActivities: []
  }
];

const mockRequests: FamilyRequest[] = [
  {
    id: 1,
    name: "Chú Minh",
    phone: "0923456789",
    relation: "Họ hàng",
    avatar: "👨‍🦱",
    requestTime: "5 phút trước"
  },
  {
    id: 2,
    name: "Cô Hương",
    phone: "0934567890",
    relation: "Họ hàng",
    avatar: "👩‍🦰",
    requestTime: "1 giờ trước"
  }
];

export function Family() {
  const [members, setMembers] = useState<FamilyMember[]>(mockFamily);
  const [requests, setRequests] = useState<FamilyRequest[]>(mockRequests);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"members" | "requests">("members");
  const [showCallModal, setShowCallModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [callingMember, setCallingMember] = useState<FamilyMember | null>(null);
  const [alertingMember, setAlertingMember] = useState<FamilyMember | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<FamilyRequest | null>(null);
  const [showRequestDetailModal, setShowRequestDetailModal] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; type: 'success' | 'error' | 'warning' | 'info'; title: string; message: string } | null>(null);
  
  const protectedCount = members.filter(m => m.protected).length;
  const highRiskCount = members.filter(m => m.riskScore > 50).length;

  const showToast = (type: 'success' | 'error' | 'warning' | 'info', title: string, message: string) => {
    setToast({ show: true, type, title, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleAddMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newMember: FamilyMember = {
      id: Date.now(),
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      relation: formData.get("relation") as string,
      protected: true,
      avatar: getRandomAvatar(formData.get("relation") as string),
      riskScore: 0,
      recentActivities: []
    };
    setMembers([...members, newMember]);
    setShowAddModal(false);
  };

  const handleAcceptRequest = (request: FamilyRequest) => {
    const newMember: FamilyMember = {
      id: Date.now(),
      name: request.name,
      phone: request.phone,
      relation: request.relation,
      protected: true,
      avatar: request.avatar,
      riskScore: 0,
      recentActivities: []
    };
    setMembers([...members, newMember]);
    setRequests(requests.filter(r => r.id !== request.id));
    setShowRequestDetailModal(false);
    showToast('success', 'Thành công', `Đã chấp nhận ${request.name} vào gia đình!`);
  };

  const handleRejectRequest = (requestId: number) => {
    setRequests(requests.filter(r => r.id !== requestId));
    setShowRequestDetailModal(false);
    showToast('warning', 'Từ chối', "Đã từ chối yêu cầu!");
  };

  const handleDeleteMember = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa người thân này?")) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const handleCallMember = (phone: string) => {
    alert(`Đang gọi đến ${phone}...`);
  };

  const handleSendAlert = (member: FamilyMember) => {
    alert(`Đã gửi cảnh báo đến ${member.name} (${member.phone})\\n\\n\"⚠️ Cảnh báo: Hãy cẩn thận với các cuộc gọi/tin nhắn lạ. Không cung cấp thông tin cá nhân hoặc chuyển tiền cho người lạ!\"`);
  };

  const getRandomAvatar = (relation: string) => {
    const avatars: { [key: string]: string[] } = {
      "Cha mẹ": ["👨", "👩"],
      "Ông bà": ["👴", "👵"],
      "Anh chị em": ["👦", "👧", "👨‍🦱", "👩‍🦱"],
      "Họ hàng": ["👨‍🦱", "👩‍🦰", "👨‍🦲", "👩‍🦳"],
      "Bạn bè": ["👤"]
    };
    const list = avatars[relation] || ["👤"];
    return list[Math.floor(Math.random() * list.length)];
  };

  const getRiskColor = (score: number) => {
    if (score >= 50) return { bg: "bg-red-500/20", border: "border-red-400/30", text: "text-red-300", label: "Nguy hiểm" };
    if (score >= 20) return { bg: "bg-yellow-500/20", border: "border-yellow-400/30", text: "text-yellow-300", label: "Cảnh báo" };
    return { bg: "bg-green-500/20", border: "border-green-400/30", text: "text-green-300", label: "An toàn" };
  };

  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col relative">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6 flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center shadow-lg border border-white/20 transition-all hover:scale-110 active:scale-95 flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-1">Người thân</h1>
              <p className="text-gray-400 text-sm">Quản lý và bảo vệ người thân</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/[0.05] rounded-[24px] p-5 shadow-lg">
              <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center mb-3">
                <Shield className="w-6 h-6 text-blue-300" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{protectedCount}</div>
              <div className="text-xs text-blue-300">Đang bảo vệ</div>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/[0.05] rounded-[24px] p-5 shadow-lg">
              <div className="w-12 h-12 bg-red-500/30 rounded-xl flex items-center justify-center mb-3">
                <AlertTriangle className="w-6 h-6 text-red-300" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{highRiskCount}</div>
              <div className="text-xs text-red-300">Nguy cơ cao</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab("members")}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                activeTab === "members"
                  ? "bg-white/10 text-white border border-white/10 shadow-sm"
                  : "bg-slate-900/50 border border-white/[0.05] text-gray-400 hover:bg-white/10"
              }`}
            >
              Danh sách ({members.length})
            </button>
            <button
              onClick={() => setActiveTab("requests")}
              className={`flex-1 py-3 rounded-xl font-bold transition-all relative ${
                activeTab === "requests"
                  ? "bg-white/10 text-white border border-white/10 shadow-sm"
                  : "bg-slate-900/50 border border-white/[0.05] text-gray-400 hover:bg-white/10"
              }`}
            >
              Yêu cầu ({requests.length})
              {requests.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {requests.length}
                </span>
              )}
            </button>
          </div>

          {/* Members Tab */}
          {activeTab === "members" && (
            <>
              {/* Add Member Button */}
              <Button 
                onClick={() => setShowAddModal(true)}
                className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition-all shadow-[0_5px_20px_rgba(79,70,229,0.3)] mb-6 flex items-center justify-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Thêm người thân
              </Button>

              {/* Members List */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-400 mb-3">DANH SÁCH ({members.length})</h3>
                
                {members.map((member) => {
                  const riskColor = getRiskColor(member.riskScore);
                  return (
                    <div
                      key={member.id}
                      className="bg-slate-900/50 backdrop-blur-xl border border-white/[0.05] rounded-[24px] p-5 shadow-lg hover:bg-white/[0.08] transition-all"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        {/* Avatar */}
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">
                          {member.avatar}
                        </div>
                        
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-base font-bold text-white">{member.name}</h3>
                            {member.protected && (
                              <div className="flex items-center gap-1 bg-green-500/20 border border-green-400/30 rounded-full px-2 py-0.5">
                                <Shield className="w-3 h-3 text-green-400" />
                                <span className="text-[9px] text-green-300 font-bold">Bảo vệ</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                            <Phone className="w-3 h-3" />
                            {member.phone}
                          </div>
                          <div className="text-xs text-gray-500">{member.relation}</div>
                        </div>

                        {/* Risk Badge */}
                        {member.riskScore > 0 && (
                          <div className={`${riskColor.bg} ${riskColor.border} border rounded-lg px-2 py-1 text-center min-w-[60px]`}>
                            <div className={`text-lg font-bold ${riskColor.text}`}>{member.riskScore}</div>
                            <div className={`text-[9px] ${riskColor.text}`}>{riskColor.label}</div>
                          </div>
                        )}
                      </div>

                      {/* Activity Alert */}
                      {member.recentActivities.length > 0 && (
                        <div className="bg-orange-500/10 border border-orange-400/20 rounded-lg p-2 mb-3">
                          <div className="flex items-center gap-2 text-xs text-orange-300">
                            <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                            <span className="flex-1">{member.recentActivities.length} dấu hiệu lừa đảo gần đây</span>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="grid grid-cols-3 gap-2">
                        <button 
                          onClick={() => {
                            setCallingMember(member);
                            setShowCallModal(true);
                          }}
                          className="bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 text-green-300 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          Gọi
                        </button>
                        <button 
                          onClick={() => {
                            setAlertingMember(member);
                            setShowAlertModal(true);
                          }}
                          className="bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-300 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1"
                        >
                          <Bell className="w-3 h-3" />
                          Cảnh báo
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedMember(member);
                            setShowDetailModal(true);
                          }}
                          className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-blue-300 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          Chi tiết
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Info Card */}
              <div className="mt-6 bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-blue-300 mb-1">Bảo vệ người thân</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Theo dõi hoạt động của người thân và nhận cảnh báo ngay khi phát hiện dấu hiệu lừa đảo. Bạn có thể gọi điện hoặc gửi thông báo cảnh báo cho họ.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Requests Tab */}
          {activeTab === "requests" && (
            <>
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-400 mb-3">YÊU CẦU THAM GIA ({requests.length})</h3>
                
                {requests.length > 0 ? (
                  requests.map((request) => (
                    <div
                      key={request.id}
                      onClick={() => {
                        setSelectedRequest(request);
                        setShowRequestDetailModal(true);
                      }}
                            className="bg-slate-900/50 backdrop-blur-xl border border-white/[0.05] rounded-[24px] p-5 shadow-lg hover:bg-white/[0.08] transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">
                          {request.avatar}
                        </div>
                        
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-white mb-1">{request.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                            <Phone className="w-3 h-3" />
                            {request.phone}
                          </div>
                          <div className="text-xs text-gray-500">{request.relation} • {request.requestTime}</div>
                        </div>

                        {/* Arrow Icon */}
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
                    <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-300 mb-2">Không có yêu cầu</h3>
                    <p className="text-sm text-gray-500">
                      Chưa có ai gửi yêu cầu tham gia gia đình của bạn.
                    </p>
                  </div>
                )}
              </div>

              {/* Info Card */}
              <div className="mt-6 bg-orange-500/10 backdrop-blur-sm border border-orange-400/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <UserPlus className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-orange-300 mb-1">Yêu cầu tham gia</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Khi ai đó gửi yêu cầu tham gia gia đình, bạn sẽ nhận được thông báo ở đây. Hãy xem xét kỹ trước khi đồng ý để đảm bảo an toàn.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-[24px] shadow-2xl w-full max-w-md max-h-[75vh] overflow-y-auto">
            <div className="p-4">
              <h2 className="text-xl font-bold text-white mb-1">Thêm người thân</h2>
              <p className="text-gray-400 text-xs mb-4">Nhập thông tin người thân để bảo vệ</p>
              
              <form onSubmit={handleAddMember} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">Họ và tên *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="VD: Nguyễn Văn A"
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">Số điện thoại *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="VD: 0912345678"
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-2">Quan hệ *</label>
                  <input type="hidden" name="relation" required />
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: "Cha mẹ", icon: "👨‍👩‍👦", color: "from-blue-500/20 to-blue-600/20 border-blue-400/30 hover:from-blue-500/30 hover:to-blue-600/30" },
                      { value: "Ông bà", icon: "👴👵", color: "from-purple-500/20 to-purple-600/20 border-purple-400/30 hover:from-purple-500/30 hover:to-purple-600/30" },
                      { value: "Anh chị em", icon: "👨‍👩‍👧‍👦", color: "from-green-500/20 to-green-600/20 border-green-400/30 hover:from-green-500/30 hover:to-green-600/30" },
                      { value: "Họ hàng", icon: "👥", color: "from-orange-500/20 to-orange-600/20 border-orange-400/30 hover:from-orange-500/30 hover:to-orange-600/30" },
                      { value: "Bạn bè", icon: "🤝", color: "from-pink-500/20 to-pink-600/20 border-pink-400/30 hover:from-pink-500/30 hover:to-pink-600/30" },
                    ].map((rel) => (
                      <button
                        key={rel.value}
                        type="button"
                        onClick={(e) => {
                          const form = e.currentTarget.closest('form');
                          if (form) {
                            const input = form.querySelector('input[name="relation"]') as HTMLInputElement;
                            if (input) input.value = rel.value;
                            form.querySelectorAll('[data-relation-btn]').forEach(btn => {
                              btn.classList.remove('ring-2', 'ring-white/50', 'scale-95');
                            });
                            e.currentTarget.classList.add('ring-2', 'ring-white/50', 'scale-95');
                          }
                        }}
                        data-relation-btn
                        className={`bg-gradient-to-br ${rel.color} backdrop-blur-sm border rounded-lg p-2 transition-all text-center`}
                      >
                        <div className="text-xl mb-0.5">{rel.icon}</div>
                        <div className="text-[10px] font-bold text-white">{rel.value}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-2.5">
                  <p className="text-[10px] text-blue-300 leading-relaxed">
                    💡 Sau khi thêm, hệ thống sẽ gửi yêu cầu đến số điện thoại này để xác nhận.
                  </p>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-2.5 rounded-lg text-sm font-bold transition-all"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2.5 rounded-lg text-sm font-bold shadow-lg transition-all"
                  >
                    Gửi yêu cầu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal - Keep this at p-6 as it's less crowded */}
      {showDetailModal && selectedMember && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-blue-400/30 rounded-2xl shadow-2xl w-full max-w-md max-h-[75vh] overflow-y-auto">
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl shadow-lg">
                  {selectedMember.avatar}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white">{selectedMember.name}</h2>
                  <p className="text-gray-400 text-xs">{selectedMember.relation}</p>
                </div>
                {selectedMember.protected && (
                  <div className="w-9 h-9 bg-green-500/20 border border-green-400/30 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-green-400" />
                  </div>
                )}
              </div>

              {/* Risk Score */}
              <div className={`${getRiskColor(selectedMember.riskScore).bg} ${getRiskColor(selectedMember.riskScore).border} border-2 rounded-xl p-3 mb-4`}>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getRiskColor(selectedMember.riskScore).text} mb-0.5`}>
                    {selectedMember.riskScore}/100
                  </div>
                  <div className={`text-xs ${getRiskColor(selectedMember.riskScore).text} font-bold`}>
                    Điểm nguy cơ - {getRiskColor(selectedMember.riskScore).label}
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-4">
                <div className="flex items-center gap-2 text-xs">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-gray-400">SĐT:</span>
                  <span className="text-white font-semibold">{selectedMember.phone}</span>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="mb-4">
                <h3 className="text-xs font-bold text-gray-300 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
                  DẤU HIỆU LỪA ĐẢO GẦN ĐÂY ({selectedMember.recentActivities.length})
                </h3>
                
                {selectedMember.recentActivities.length > 0 ? (
                  <div className="space-y-2">
                    {selectedMember.recentActivities.map((activity) => (
                      <div key={activity.id} className="bg-white/5 border border-white/10 rounded-lg p-2.5">
                        <div className="flex items-start gap-2 mb-1.5">
                          {activity.blocked ? (
                            <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="text-xs text-white leading-relaxed">{activity.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="w-2.5 h-2.5 text-gray-500" />
                              <span className="text-[10px] text-gray-500">{activity.timestamp}</span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                activity.riskLevel === "high" ? "bg-red-500/20 text-red-300" :
                                activity.riskLevel === "medium" ? "bg-yellow-500/20 text-yellow-300" :
                                "bg-green-500/20 text-green-300"
                              }`}>
                                {activity.riskLevel === "high" ? "Cao" : activity.riskLevel === "medium" ? "TB" : "Thấp"}
                              </span>
                            </div>
                          </div>
                        </div>
                        {activity.blocked && (
                          <div className="text-[10px] text-green-400 font-semibold">✓ Đã chặn</div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-green-500/10 border border-green-400/20 rounded-lg p-3 text-center">
                    <CheckCircle className="w-7 h-7 text-green-400 mx-auto mb-1.5" />
                    <p className="text-xs text-green-300">Không có dấu hiệu lừa đảo</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setCallingMember(selectedMember);
                    setShowCallModal(true);
                    setShowDetailModal(false);
                  }}
                  className="flex-1 bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 text-green-300 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Gọi ngay
                </button>
                <button
                  onClick={() => {
                    setAlertingMember(selectedMember);
                    setShowAlertModal(true);
                    setShowDetailModal(false);
                  }}
                  className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-300 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <Bell className="w-3.5 h-3.5" />
                  Cảnh báo
                </button>
              </div>

              <button
                onClick={() => setShowDetailModal(false)}
                className="w-full mt-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-2.5 rounded-lg text-sm font-bold transition-all"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Call Modal */}
      {showCallModal && callingMember && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-[24px] shadow-2xl w-full max-w-md max-h-[75vh] overflow-y-auto">
            <div className="p-4">
              {/* Avatar with calling animation */}
              <div className="text-center mb-4">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-green-500/30 rounded-full animate-ping"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-4xl shadow-2xl">
                    {callingMember.avatar}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-white mt-3">{callingMember.name}</h2>
                <p className="text-gray-400 text-xs">{callingMember.relation}</p>
              </div>

              {/* Phone Number Display */}
              <div className="bg-green-500/10 border-2 border-green-400/30 rounded-xl p-3 mb-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Phone className="w-4 h-4 text-green-400" />
                  <span className="text-lg font-bold text-white">{callingMember.phone}</span>
                </div>
                <p className="text-[10px] text-green-300">Nhấn gọi để liên hệ ngay</p>
              </div>

              {/* Risk Warning if applicable */}
              {callingMember.riskScore > 50 && (
                <div className="bg-red-500/10 border border-red-400/20 rounded-xl p-2.5 mb-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-red-300 font-semibold mb-0.5">Cảnh báo nguy cơ cao!</p>
                      <p className="text-[10px] text-gray-400">
                        Người này có {callingMember.recentActivities.length} dấu hiệu lừa đảo gần đây.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    window.location.href = `tel:${callingMember.phone}`;
                    setShowCallModal(false);
                  }}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl text-sm font-bold shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Gọi điện ngay
                </button>
                
                <button
                  onClick={() => setShowCallModal(false)}
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-2.5 rounded-xl text-sm font-bold transition-all"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alert Modal */}
      {showAlertModal && alertingMember && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-[24px] shadow-2xl w-full max-w-md max-h-[75vh] overflow-y-auto">
            <div className="p-4">
              {/* Header */}
              <div className="text-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <Bell className="w-7 h-7 text-white animate-pulse" />
                </div>
                <h2 className="text-xl font-bold text-white mb-0.5">Gửi cảnh báo</h2>
                <p className="text-gray-400 text-xs">Cảnh báo người thân về lừa đảo</p>
              </div>

              {/* Member Info */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl shadow-lg">
                    {alertingMember.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white">{alertingMember.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Phone className="w-2.5 h-2.5" />
                      {alertingMember.phone}
                    </div>
                  </div>
                </div>
              </div>

              {/* Alert Templates */}
              <div className="space-y-2 mb-4">
                <h3 className="text-xs font-bold text-gray-300 mb-2">CHỌN MẪU CẢNH BÁO</h3>
                
                <button
                  onClick={() => {
                    showToast('warning', 'Đã gửi cảnh báo!', `Tin nhắn "Cảnh báo tổng quát" đã được gửi đến ${alertingMember.name}`);
                    setShowAlertModal(false);
                  }}
                  className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-400/30 rounded-lg p-3 text-left transition-all group"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-white mb-0.5">Cảnh báo tổng quát</h4>
                      <p className="text-[10px] text-gray-400 leading-relaxed">
                        Cảnh báo về các thủ đoạn lừa đảo phổ biến
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    showToast('error', 'Đã gửi cảnh báo khẩn cấp!', `Tin nhắn khẩn cấp đã được gửi đến ${alertingMember.name}`);
                    setShowAlertModal(false);
                  }}
                  className="w-full bg-orange-500/10 hover:bg-orange-500/20 border border-orange-400/30 rounded-lg p-3 text-left transition-all group"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Shield className="w-4 h-4 text-orange-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-white mb-0.5">Cảnh báo khẩn cấp</h4>
                      <p className="text-[10px] text-gray-400 leading-relaxed">
                        Thông báo nguy cơ cao, yêu cầu liên hệ ngay
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    showToast('info', 'Đã gửi nhắc nhở!', `Tin nhắn "Nhắc nhở an toàn" đã được gửi đến ${alertingMember.name}`);
                    setShowAlertModal(false);
                  }}
                  className="w-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-400/30 rounded-lg p-3 text-left transition-all group"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-white mb-0.5">Nhắc nhở an toàn</h4>
                      <p className="text-[10px] text-gray-400 leading-relaxed">
                        Chia sẻ kiến thức về thủ đoạn lừa đảo
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Info */}
              <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-2.5 mb-3">
                <p className="text-[10px] text-blue-300 leading-relaxed">
                  💡 Tin nhắn sẽ được gửi qua SMS/thông báo app
                </p>
              </div>

              <button
                onClick={() => setShowAlertModal(false)}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-2.5 rounded-xl text-sm font-bold transition-all"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Detail Modal */}
      {showRequestDetailModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-[24px] shadow-2xl w-full max-w-md max-h-[65vh] overflow-y-auto">
            <div className="p-3">
              {/* Header */}
              <div className="text-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-1.5 shadow-lg">
                  <UserPlus className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-lg font-bold text-white mb-0.5">Yêu cầu tham gia</h2>
                <p className="text-gray-400 text-[10px]">Xem xét thông tin trước khi quyết định</p>
              </div>

              {/* Member Info */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl shadow-lg">
                    {selectedRequest.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white">{selectedRequest.name}</h3>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                      <Phone className="w-2 h-2" />
                      {selectedRequest.phone}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[10px]">
                  <div className="bg-orange-500/20 border border-orange-400/30 rounded-full px-2 py-0.5 text-orange-300 font-semibold">
                    {selectedRequest.relation}
                  </div>
                  <div className="flex items-center gap-0.5 text-gray-500">
                    <Clock className="w-2.5 h-2.5" />
                    {selectedRequest.requestTime}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 mb-2">
                <button
                  onClick={() => handleAcceptRequest(selectedRequest)}
                  className="w-full bg-green-500/10 hover:bg-green-500/20 border-2 border-green-400/30 rounded-lg p-2.5 text-left transition-all group"
                >
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <UserCheck className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-white mb-0.5">Chấp nhận</h4>
                      <p className="text-[9px] text-gray-400 leading-relaxed">
                        Thêm vào gia đình và bắt đầu bảo vệ
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleRejectRequest(selectedRequest.id)}
                  className="w-full bg-red-500/10 hover:bg-red-500/20 border-2 border-red-400/30 rounded-lg p-2.5 text-left transition-all group"
                >
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <UserX className="w-4 h-4 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-white mb-0.5">Từ chối</h4>
                      <p className="text-[9px] text-gray-400 leading-relaxed">
                        Không thêm người này vào gia đình
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              <button
                onClick={() => setShowRequestDetailModal(false)}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-2 rounded-lg text-xs font-bold transition-all"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] animate-in slide-in-from-top duration-300">
          <div className={`
            bg-gradient-to-br backdrop-blur-xl rounded-2xl shadow-2xl border-2 p-4 w-[90vw] max-w-sm
            ${toast.type === 'success' ? 'from-green-500/20 to-emerald-600/20 border-green-400/40' :
              toast.type === 'error' ? 'from-red-500/20 to-orange-600/20 border-red-400/40' :
              toast.type === 'warning' ? 'from-orange-500/20 to-yellow-600/20 border-orange-400/40' :
              'from-blue-500/20 to-cyan-600/20 border-blue-400/40'}
          `}>
            <div className="flex items-start gap-3">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg
                ${toast.type === 'success' ? 'bg-green-500/30' :
                  toast.type === 'error' ? 'bg-red-500/30' :
                  toast.type === 'warning' ? 'bg-orange-500/30' :
                  'bg-blue-500/30'}
              `}>
                {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-green-400" />}
                {toast.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-400" />}
                {toast.type === 'warning' && <Bell className="w-5 h-5 text-orange-400" />}
                {toast.type === 'info' && <Shield className="w-5 h-5 text-blue-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={`
                  text-sm font-bold mb-0.5
                  ${toast.type === 'success' ? 'text-green-300' :
                    toast.type === 'error' ? 'text-red-300' :
                    toast.type === 'warning' ? 'text-orange-300' :
                    'text-blue-300'}
                `}>
                  {toast.title}
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => setToast(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}