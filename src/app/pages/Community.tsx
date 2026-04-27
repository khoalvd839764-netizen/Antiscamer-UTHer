import { AlertTriangle, Phone, Link as LinkIcon, Clock, Users, CheckCircle, Heart, MessageCircle, Share2, Send, Image as ImageIcon, TrendingUp, ShieldCheck, ArrowLeft, Zap } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";

type PostCategory = "all" | "link" | "phone" | "sms" | "ai" | "other";

interface CommunityPost {
  id: number;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  category: "link" | "phone" | "sms" | "ai" | "other";
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isVerified: boolean;
  isNew?: boolean;
}

const mockPosts: CommunityPost[] = [
  {
    id: 1,
    author: {
      name: "Nguyễn Văn Thành",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      verified: true
    },
    category: "link",
    content: "⚠️ CẢNH BÁO: Link lừa đảo giả mạo Vietcombank tại fake-vcb-login.com. Đã có 12 người bị lừa mất tiền. Mọi người cẩn thận!",
    timestamp: "2 giờ trước",
    likes: 234,
    comments: 45,
    shares: 89,
    isLiked: false,
    isVerified: true
  },
  {
    id: 2,
    author: {
      name: "Trần Thị B",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
      verified: false
    },
    category: "phone",
    content: "Số 0856xxx789 tự xưng nhân viên ngân hàng, yêu cầu cung cấp OTP. Đã báo cảnh sát!",
    timestamp: "5 giờ trước",
    likes: 156,
    comments: 23,
    shares: 34,
    isLiked: true,
    isVerified: true
  },
  {
    id: 3,
    author: {
      name: "Lê Văn C",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oscar",
      verified: false
    },
    category: "ai",
    content: "Phát hiện ảnh deepfake của CEO công ty trên Facebook lừa đảo đầu tư. Ảnh rất giống thật, ai nhận được tin nhắn này cẩn thận!",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400",
    timestamp: "1 ngày trước",
    likes: 892,
    comments: 167,
    shares: 234,
    isLiked: false,
    isVerified: true
  },
  {
    id: 4,
    author: {
      name: "Phạm Thị D",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
      verified: true
    },
    category: "sms",
    content: "SMS giả mạo từ số 8755: 'Bạn trúng thưởng 50 triệu, nhấn link để nhận'. Đừng tin!",
    timestamp: "1 ngày trước",
    likes: 445,
    comments: 78,
    shares: 123,
    isLiked: false,
    isVerified: false
  },
  {
    id: 5,
    author: {
      name: "Hoàng Văn E",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Max",
      verified: false
    },
    category: "other",
    content: "Cảnh báo: Chiêu lừa đảo mới qua Zalo. Họ gửi tin nhắn giả làm người quen rồi vay tiền. Kiểm tra kỹ trước khi chuyển!",
    timestamp: "2 ngày trước",
    likes: 678,
    comments: 134,
    shares: 189,
    isLiked: true,
    isVerified: true
  }
];

export function Community() {
  const [filter, setFilter] = useState<PostCategory>("all");
  const [posts, setPosts] = useState<CommunityPost[]>(mockPosts);
  const [newPost, setNewPost] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<PostCategory>("other");
  const [showPostForm, setShowPostForm] = useState(false);
  const navigate = useNavigate();

  // Auto-generate new scam reports
  useEffect(() => {
    const interval = setInterval(() => {
      generateRandomPost();
    }, 8000); // Add new post every 8 seconds

    return () => clearInterval(interval);
  }, [posts]);

  const generateRandomPost = () => {
    const names = ["Nguyễn Văn", "Trần Thị", "Lê Hoàng", "Phạm Minh", "Võ Thu", "Đỗ Anh", "Bùi Quốc", "Hoàng Thị"];
    const lastNames = ["A", "B", "C", "D", "E", "F", "G", "H", "K", "L", "M", "N"];
    const seeds = ["Felix", "Aneka", "Oscar", "Mia", "Max", "Sam", "Luna", "Charlie", "Zoe", "Jack"];
    
    const phoneNumbers = [
      "0856",
      "0923",
      "0934",
      "0945",
      "0987",
      "0912",
      "0901",
      "0898",
      "0789",
      "0768"
    ];
    
    const domains = [
      "fake-bidv-login.com",
      "vietinbank-secure.net",
      "agribank-update.com",
      "techcombank-verify.net",
      "mbbank-security.com",
      "acb-confirm.net",
      "vpbank-check.com",
      "sacombank-auth.net",
      "hdbank-verify.com",
      "tpbank-login.net"
    ];

    const linkContents = [
      "⚠️ CẢNH BÁO: Link lừa đảo giả mạo {bank} tại {domain}. Đã có {count} người bị lừa mất tiền!",
      "🚨 NGUY HIỂM: Phát hiện trang web giả mạo {bank} tại {domain}. Đừng truy cập!",
      "⛔ PHISHING: Link {domain} đang giả mạo {bank} để lấy cắp thông tin ngân hàng!",
      "⚠️ Báo động: Trang {domain} giả mạo {bank}, đã lừa đảo {count} nạn nhân!"
    ];

    const phoneContents = [
      "📞 Số {phone}xxx{last} tự xưng nhân viên {bank}, yêu cầu cung cấp OTP. Đã báo cảnh sát!",
      "⚠️ CẢNH BÁO: Số {phone}xxx{last} giả danh {bank} yêu cầu chuyển tiền khẩn cấp!",
      "🚨 Số lừa đảo {phone}xxx{last} đang gọi giả mạo {bank}. Không trả lời!",
      "⛔ Phát hiện số {phone}xxx{last} lừa đảo, giả làm nhân viên {bank} để lấy mã OTP!"
    ];

    const banks = ["Vietcombank", "BIDV", "VietinBank", "Agribank", "Techcombank", "MBBank", "ACB", "VPBank", "Sacombank", "HDBank", "TPBank"];
    
    const categories: ("link" | "phone")[] = ["link", "phone"];
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    let content = "";
    if (category === "link") {
      const template = linkContents[Math.floor(Math.random() * linkContents.length)];
      const bank = banks[Math.floor(Math.random() * banks.length)];
      const domain = domains[Math.floor(Math.random() * domains.length)];
      const count = Math.floor(Math.random() * 20) + 5;
      content = template.replace("{bank}", bank).replace("{domain}", domain).replace("{count}", count.toString());
    } else {
      const template = phoneContents[Math.floor(Math.random() * phoneContents.length)];
      const bank = banks[Math.floor(Math.random() * banks.length)];
      const phone = phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)];
      const last = Math.floor(Math.random() * 900) + 100;
      content = template.replace("{bank}", bank).replace(/{phone}/g, phone).replace(/{last}/g, last.toString());
    }

    const newPost: CommunityPost = {
      id: Date.now(),
      author: {
        name: `${names[Math.floor(Math.random() * names.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${seeds[Math.floor(Math.random() * seeds.length)]}`,
        verified: Math.random() > 0.6
      },
      category,
      content,
      timestamp: "Vừa xong",
      likes: Math.floor(Math.random() * 50),
      comments: Math.floor(Math.random() * 20),
      shares: Math.floor(Math.random() * 30),
      isLiked: false,
      isVerified: false, // Bài đăng mới chưa được xác minh
      isNew: true
    };

    setPosts(prevPosts => {
      // Remove isNew flag from previous posts
      const updatedPosts = prevPosts.map(p => ({ ...p, isNew: false }));
      // Keep only last 20 posts to avoid memory issues
      return [newPost, ...updatedPosts].slice(0, 20);
    });

    // Remove isNew flag after 3 seconds
    setTimeout(() => {
      setPosts(prevPosts => prevPosts.map(p => p.id === newPost.id ? { ...p, isNew: false } : p));
    }, 3000);
  };

  const filteredPosts = filter === "all" 
    ? posts 
    : posts.filter(post => post.category === filter);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleSubmitPost = () => {
    if (!newPost.trim()) return;

    const post: CommunityPost = {
      id: Date.now(),
      author: {
        name: "Bạn",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
        verified: false
      },
      category: selectedCategory === "all" ? "other" : selectedCategory,
      content: newPost,
      timestamp: "Vừa xong",
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isVerified: false
    };

    setPosts([post, ...posts]);
    setNewPost("");
    setShowPostForm(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "link": return LinkIcon;
      case "phone": return Phone;
      case "sms": return Phone;
      case "ai": return ImageIcon;
      default: return AlertTriangle;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "link": return "Link lừa đảo";
      case "phone": return "Số lừa đảo";
      case "sms": return "SMS lừa đảo";
      case "ai": return "AI/Deepfake";
      default: return "Khác";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "link": return "bg-red-500/20 text-red-300 border-red-400/30";
      case "phone": return "bg-orange-500/20 text-orange-300 border-orange-400/30";
      case "sms": return "bg-yellow-500/20 text-yellow-300 border-yellow-400/30";
      case "ai": return "bg-purple-500/20 text-purple-300 border-purple-400/30";
      default: return "bg-blue-500/20 text-blue-300 border-blue-400/30";
    }
  };

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
              <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-2">
                <Users className="w-8 h-8" />
                Cộng đồng
              </h1>
              <p className="text-gray-400 text-sm">Chia sẻ và cảnh báo lừa đảo</p>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/[0.05] rounded-[20px] p-4 text-center">
              <div className="text-2xl font-bold text-blue-300 mb-1">2.4k</div>
              <div className="text-[10px] text-gray-400">Thành viên</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/[0.05] rounded-[20px] p-4 text-center">
              <div className="text-2xl font-bold text-green-300 mb-1">847</div>
              <div className="text-[10px] text-gray-400">Bài đăng</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/[0.05] rounded-[20px] p-4 text-center">
              <div className="text-2xl font-bold text-purple-300 mb-1">156</div>
              <div className="text-[10px] text-gray-400">Đã xác minh</div>
            </div>
          </div>

          {/* Post Button */}
          <Button
            onClick={() => setShowPostForm(!showPostForm)}
            className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition-all shadow-[0_5px_20px_rgba(79,70,229,0.3)] mb-6"
          >
            <Send className="w-5 h-5 mr-2" />
            Đăng bài cảnh báo
          </Button>

          {/* Post Form */}
          {showPostForm && (
            <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/[0.08] rounded-[24px] p-5 mb-6 shadow-lg">
              <h3 className="text-white font-bold mb-3">Tạo bài đăng mới</h3>
              
              {/* Category Selection */}
              <div className="mb-3">
                <label className="text-xs text-gray-400 mb-2 block">Loại cảnh báo</label>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { value: "link" as PostCategory, label: "Link", icon: LinkIcon },
                    { value: "phone" as PostCategory, label: "SĐT", icon: Phone },
                    { value: "sms" as PostCategory, label: "SMS", icon: Phone },
                    { value: "ai" as PostCategory, label: "AI", icon: ImageIcon },
                    { value: "other" as PostCategory, label: "Khác", icon: AlertTriangle }
                  ].map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.value}
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          selectedCategory === cat.value
                            ? "bg-blue-500 text-white"
                            : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content Textarea */}
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Chia sẻ cảnh báo của bạn..."
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
                rows={4}
              />

              {/* Action Buttons */}
              <div className="flex gap-2 mt-3">
                <Button
                  onClick={handleSubmitPost}
                  disabled={!newPost.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-2 rounded-lg font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Đăng
                </Button>
                <Button
                  onClick={() => {
                    setShowPostForm(false);
                    setNewPost("");
                  }}
                  className="px-4 bg-white/10 hover:bg-white/15 text-gray-400 py-2 rounded-lg font-semibold text-sm"
                >
                  Hủy
                </Button>
              </div>
            </div>
          )}

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {[
              { value: "all" as PostCategory, label: "Tất cả", icon: TrendingUp },
              { value: "link" as PostCategory, label: "Link", icon: LinkIcon },
              { value: "phone" as PostCategory, label: "SĐT", icon: Phone },
              { value: "sms" as PostCategory, label: "SMS", icon: Phone },
              { value: "ai" as PostCategory, label: "AI", icon: ImageIcon }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.value}
                  onClick={() => setFilter(item.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs whitespace-nowrap transition-all duration-300 ${
                    filter === item.value
                      ? "bg-white/10 text-white border border-white/10 shadow-sm"
                      : "bg-slate-900/50 border border-white/[0.05] text-gray-400"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Community Feed */}
          <div className="space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => {
                const CategoryIcon = getCategoryIcon(post.category);
                return (
                  <div
                    key={post.id}
                    className={`bg-slate-900/50 backdrop-blur-xl border border-white/[0.05] rounded-[24px] p-5 shadow-lg hover:bg-white/[0.08] transition-all relative ${
                      post.isNew ? 'animate-in slide-in-from-top duration-500 ring-2 ring-yellow-400/50' : ''
                    }`}
                  >
                    {/* NEW Badge */}
                    {post.isNew && (
                      <div className="absolute -top-2 -right-2 z-10">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-3 py-1 shadow-lg flex items-center gap-1 animate-pulse">
                          <Zap className="w-3 h-3 text-white" fill="white" />
                          <span className="text-[10px] font-bold text-white">MỚI</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Post Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-12 h-12 rounded-full border-2 border-white/30"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-white font-bold text-sm">{post.author.name}</h3>
                          {post.author.verified && (
                            <CheckCircle className="w-4 h-4 text-blue-400" fill="currentColor" />
                          )}
                          {post.isVerified && (
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-green-500/30 to-green-600/30 border border-green-400/40 rounded-full">
                              <ShieldCheck className="w-3 h-3 text-green-300" />
                              <span className="text-[9px] font-bold text-green-300">Đã xác minh</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          {post.id === 1 && (
                            <span className="text-[10px] text-gray-400">giaothongvantai@ut.edu.vn</span>
                          )}
                          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold border ${getCategoryColor(post.category)}`}>
                            <CategoryIcon className="w-3 h-3" />
                            {getCategoryLabel(post.category)}
                          </div>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <p className="text-white text-sm leading-relaxed mb-3">
                      {post.content}
                    </p>

                    {/* Post Image */}
                    {post.image && (
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-full h-48 object-cover rounded-xl mb-3"
                      />
                    )}

                    {/* Post Actions */}
                    <div className="flex items-center gap-4 pt-3 border-t border-white/10">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-xs transition-all ${
                          post.isLiked
                            ? "bg-red-500/20 text-red-300"
                            : "bg-white/5 text-gray-400 hover:bg-white/10"
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${post.isLiked ? "fill-red-300" : ""}`}
                        />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-xs bg-white/5 text-gray-400 hover:bg-white/10 transition-all">
                        <MessageCircle className="w-4 h-4" />
                        {post.comments}
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-xs bg-white/5 text-gray-400 hover:bg-white/10 transition-all">
                        <Share2 className="w-4 h-4" />
                        {post.shares}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-gray-500" />
                </div>
                <p className="text-gray-400">Chưa có bài đăng nào</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}