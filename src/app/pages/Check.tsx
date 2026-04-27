import { useState } from "react";
import { Search, Link as LinkIcon, Phone, AlertCircle, CheckCircle, XCircle, Camera, Upload, Image as ImageIcon, Clock, Trash2, Shield, Globe, Signal, Zap, Eye, AlertTriangle, ArrowLeft } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";

type CheckType = "link" | "phone" | "image";
type CheckResult = {
  id: string;
  type: CheckType;
  input: string;
  result: "safe" | "danger";
  timestamp: Date;
  imageName?: string;
};

export function Check() {
  const [activeTab, setActiveTab] = useState<CheckType>("link");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<null | "safe" | "danger">(null);
  const [isChecking, setIsChecking] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [history, setHistory] = useState<CheckResult[]>([]);

  const handleCheck = () => {
    setIsChecking(true);
    setResult(null);
    
    // Simulate checking
    setTimeout(() => {
      // Random result for demo
      const isSafe = Math.random() > 0.3;
      setResult(isSafe ? "safe" : "danger");
      setIsChecking(false);

      // Add to history
      const newResult: CheckResult = {
        id: Math.random().toString(36).substr(2, 9),
        type: activeTab,
        input: activeTab === "image" ? (selectedImage?.name || "Hình ảnh") : input,
        result: isSafe ? "safe" : "danger",
        timestamp: new Date(),
        imageName: selectedImage ? selectedImage.name : undefined
      };
      setHistory([newResult, ...history]);
    }, 1500);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setInput(file.name); // Set input to file name so button is enabled
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory(history.filter(item => item.id !== id));
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
              <h1 className="text-3xl font-bold text-white mb-1">Kiểm tra</h1>
              <p className="text-gray-400 text-sm">Xác minh link, số điện thoại và hình ảnh AI</p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-2 mb-6 bg-slate-900/50 backdrop-blur-xl rounded-[20px] p-1.5 border border-white/[0.05]">
            <button
              onClick={() => setActiveTab("link")}
              className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "link"
                  ? "bg-white/10 text-white shadow-sm rounded-[16px]"
                  : "text-gray-400"
              }`}
            >
              <LinkIcon className="w-4 h-4" />
              Kiểm tra Link
            </button>
            <button
              onClick={() => setActiveTab("phone")}
              className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "phone"
                  ? "bg-white/10 text-white shadow-sm rounded-[16px]"
                  : "text-gray-400"
              }`}
            >
              <Phone className="w-4 h-4" />
              Kiểm tra SĐT
            </button>
            <button
              onClick={() => setActiveTab("image")}
              className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "image"
                  ? "bg-white/10 text-white shadow-sm rounded-[16px]"
                  : "text-gray-400"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Kiểm tra Hình ảnh
            </button>
          </div>

          {/* Input Area - Only show for link and phone */}
          {activeTab !== "image" && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                {activeTab === "link" ? "Nhập URL cần kiểm tra" : "Nhập số điện thoại"}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    activeTab === "link" 
                      ? "https://example.com" 
                      : "0123456789"
                  }
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
            </div>
          )}

          {/* Image Upload Area */}
          {activeTab === "image" && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Tải lên hình ảnh cần kiểm tra AI
              </label>
              
              {/* Upload Button/Area */}
              <div className="relative">
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-48 bg-black/20 backdrop-blur-sm border border-dashed border-white/20 rounded-[24px] cursor-pointer hover:bg-white/5 hover:border-blue-400/50 transition-all"
                >
                  {imagePreview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-2xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <div className="text-center">
                          <Upload className="w-8 h-8 text-white mx-auto mb-2" />
                          <p className="text-sm text-white font-semibold">Thay đổi ảnh</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-white font-semibold mb-1">Tải ảnh lên</p>
                      <p className="text-xs text-gray-400">PNG, JPG, GIF tối đa 10MB</p>
                      <div className="mt-4 flex items-center justify-center gap-2">
                        <Upload className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-red-400 font-medium">Chọn file từ thiết bị</span>
                      </div>
                    </div>
                  )}
                </label>
              </div>
              
              {/* Image Info */}
              {selectedImage && (
                <div className="mt-3 bg-slate-900/50 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ImageIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{selectedImage.name}</p>
                      <p className="text-xs text-gray-400">{(selectedImage.size / 1024).toFixed(2)} KB</p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        setImagePreview(null);
                        setInput("");
                      }}
                      className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 rounded-lg flex items-center justify-center transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Check Button */}
          <Button
            onClick={handleCheck}
            disabled={!input || isChecking}
            className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_5px_20px_rgba(79,70,229,0.3)]"
          >
            {isChecking ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Đang kiểm tra...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Kiểm tra ngay
              </div>
            )}
          </Button>

          {/* Result */}
          {result && (
            <div className={`mt-6 rounded-[24px] p-6 border backdrop-blur-xl ${
              result === "safe"
                ? "bg-green-500/10 border-green-500/20"
                : "bg-red-500/10 border-red-500/20"
            }`}>
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  result === "safe" ? "bg-green-500/30" : "bg-red-500/30"
                }`}>
                  {result === "safe" ? (
                    <CheckCircle className="w-7 h-7 text-green-300" />
                  ) : (
                    <XCircle className="w-7 h-7 text-red-300" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-bold mb-2 ${
                    result === "safe" ? "text-green-300" : "text-red-300"
                  }`}>
                    {result === "safe" ? "An toàn ✓" : "Nguy hiểm! ⚠️"}
                  </h3>
                  <p className="text-sm text-gray-300 mb-3">
                    {activeTab === "image" 
                      ? (result === "safe" 
                          ? "Hình ảnh này là ảnh thật, không phát hiện dấu hiệu AI hoặc deepfake."
                          : "Hình ảnh này có dấu hiệu là ảnh AI hoặc deepfake. Hãy cẩn thận!")
                      : (result === "safe"
                          ? `${activeTab === "link" ? "Link" : "Số điện thoại"} này an toàn, không phát hiện dấu hiệu lừa đảo.`
                          : `${activeTab === "link" ? "Link" : "Số điện thoại"} này có dấu hiệu lừa đảo. Không nên truy cập hoặc liên hệ!`)
                    }
                  </p>
                  {result === "danger" && (
                    <div className="bg-red-900/30 rounded-lg p-3 border border-red-400/20 mb-3">
                      <div className="flex items-center gap-2 text-xs text-red-300">
                        <AlertCircle className="w-4 h-4" />
                        <span className="font-semibold">Đã báo cáo: 47 lần</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Detailed Explanation for LINK */}
              {activeTab === "link" && (
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Chi tiết kiểm tra Link
                  </h4>
                  
                  {result === "danger" ? (
                    <div className="space-y-2">
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-red-300 mb-1">Tên miền nghi vấn</p>
                            <p className="text-xs text-gray-400">Domain giả mạo ngân hàng/tổ chức chính thức</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Shield className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-red-300 mb-1">Không có chứng chỉ SSL</p>
                            <p className="text-xs text-gray-400">Link không sử dụng HTTPS an toàn</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-red-300 mb-1">Phát hiện từ cộng đồng</p>
                            <p className="text-xs text-gray-400">47 người dùng đã báo cáo link lừa đảo này</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-red-900/30 rounded-lg p-3 border border-red-400/20">
                        <p className="text-xs text-red-300 font-semibold mb-1">⚠️ Khuyến cáo:</p>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          • Không nhập thông tin cá nhân<br/>
                          • Không tải file từ link này<br/>
                          • Báo cáo cho cộng đồng
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-green-300 mb-1">Tên miền hợp lệ</p>
                            <p className="text-xs text-gray-400">Domain được xác minh và đăng ký chính thức</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Shield className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-green-300 mb-1">Bảo mật HTTPS</p>
                            <p className="text-xs text-gray-400">Link sử dụng mã hóa SSL/TLS an toàn</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-green-300 mb-1">Không có báo cáo xấu</p>
                            <p className="text-xs text-gray-400">Cộng đồng chưa phát hiện dấu hiệu lừa đảo</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Detailed Explanation for PHONE */}
              {activeTab === "phone" && (
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Chi tiết kiểm tra Số điện thoại
                  </h4>
                  
                  {result === "danger" ? (
                    <div className="space-y-2">
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Signal className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-red-300 mb-1">Nhà mạng: Viettel</p>
                            <p className="text-xs text-gray-400">Đầu số 09xx - Số thuê bao trả trước</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-red-300 mb-1">Thủ đoạn phổ biến</p>
                            <p className="text-xs text-gray-400">Giả mạo ngân hàng, yêu cầu chuyển tiền khẩn cấp</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-red-300 mb-1">Báo cáo từ cộng đồng</p>
                            <p className="text-xs text-gray-400">47 lần báo cáo trong 7 ngày qua</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-red-900/30 rounded-lg p-3 border border-red-400/20">
                        <p className="text-xs text-red-300 font-semibold mb-1">⚠️ Khuyến cáo:</p>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          • Không trả lời cuộc gọi<br/>
                          • Không cung cấp mã OTP/thông tin cá nhân<br/>
                          • Chặn số và báo cáo ngay
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Signal className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-green-300 mb-1">Nhà mạng: Vinaphone</p>
                            <p className="text-xs text-gray-400">Đầu số 08xx - Số thuê bao chính chủ</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-green-300 mb-1">Không có cảnh báo</p>
                            <p className="text-xs text-gray-400">Số này chưa có báo cáo lừa đảo</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Shield className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-green-300 mb-1">Độ tin cậy cao</p>
                            <p className="text-xs text-gray-400">Được cộng đồng đánh giá tích cực</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Detailed Explanation for IMAGE */}
              {activeTab === "image" && (
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Chi tiết phân tích Hình ảnh
                  </h4>
                  
                  {result === "danger" ? (
                    <div className="space-y-2">
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-red-300 mb-1">Tỷ lệ AI Detection: 87%</p>
                            <p className="text-xs text-gray-400">Độ tin cậy cao rằng đây là ảnh tạo bởi AI</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Eye className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-red-300 mb-1">Điểm bất thường phát hiện</p>
                            <p className="text-xs text-gray-400">• Khuôn mặt: Texture da không tự nhiên<br/>• Tay: Số ngón không chính xác<br/>• Nền: Artifacts và blur pattern</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-red-300 mb-1">Metadata bất thường</p>
                            <p className="text-xs text-gray-400">Thiếu thông tin EXIF camera, có dấu hiệu chỉnh sửa</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-red-900/30 rounded-lg p-3 border border-red-400/20">
                        <p className="text-xs text-red-300 font-semibold mb-1">⚠️ Khuyến cáo:</p>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          • Không tin tưởng nội dung ảnh này<br/>
                          • Xác minh từ nguồn gốc khác<br/>
                          • Cảnh báo người thân về ảnh deepfake
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-green-300 mb-1">Tỷ lệ AI Detection: 8%</p>
                            <p className="text-xs text-gray-400">Khả năng rất cao đây là ảnh thật chụp bởi camera</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Eye className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-green-300 mb-1">Đặc điểm tự nhiên</p>
                            <p className="text-xs text-gray-400">Texture da, ánh sáng, và chi tiết đều tự nhiên</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Shield className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-green-300 mb-1">Metadata hợp lệ</p>
                            <p className="text-xs text-gray-400">Có thông tin EXIF đầy đủ từ thiết bị chụp</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Tips */}
          <div className="mt-6 bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-blue-300 mb-1">Mẹo an toàn</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {activeTab === "link" 
                    ? "Luôn kiểm tra link trước khi nhấp vào, đặc biệt từ tin nhắn hoặc email lạ."
                    : activeTab === "phone"
                    ? "Cẩn thận với số điện thoại lạ yêu cầu thông tin cá nhân hoặc chuyển tiền."
                    : "Cẩn thận với ảnh AI và deepfake, đặc biệt từ nguồn không rõ ràng hoặc tin nhắn lạ."
                  }
                </p>
              </div>
            </div>
          </div>

          {/* History */}
          {history.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-bold text-white mb-2">Lịch sử kiểm tra</h3>
              <div className="bg-slate-900/50 backdrop-blur-xl border border-white/[0.05] rounded-[24px] p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">Thời gian</span>
                  </div>
                  <Button
                    onClick={handleClearHistory}
                    className="bg-red-500/20 text-red-300 hover:bg-red-600/20 hover:text-red-400 py-1 px-2 rounded-full text-xs"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                {history.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 mb-2">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      item.result === "safe" ? "bg-green-500/30" : "bg-red-500/30"
                    }`}>
                      {item.result === "safe" ? (
                        <CheckCircle className="w-7 h-7 text-green-300" />
                      ) : (
                        <XCircle className="w-7 h-7 text-red-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-sm font-bold ${
                        item.result === "safe" ? "text-green-300" : "text-red-300"
                      }`}>
                        {item.result === "safe" ? "An toàn ✓" : "Nguy hiểm! ⚠️"}
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {item.type === "link" 
                          ? `Link: ${item.input}`
                          : `Số điện thoại: ${item.input}`
                        }
                        {item.imageName && ` - Hình ảnh: ${item.imageName}`}
                      </p>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {item.timestamp.toLocaleString()}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleDeleteHistoryItem(item.id)}
                      className="bg-red-500/20 text-red-300 hover:bg-red-600/20 hover:text-red-400 py-1 px-2 rounded-full text-xs"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}