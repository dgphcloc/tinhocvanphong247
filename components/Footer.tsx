import React from "react";
import { Link } from "react-router-dom";
import { BLOG_NAME } from "../constants";
import { Facebook, Youtube, Mail, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">{BLOG_NAME}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Nơi chia sẻ kiến thức tin học văn phòng miễn phí, chất lượng cao.
              Giúp bạn nâng cao hiệu suất làm việc mỗi ngày.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              Liên kết nhanh
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-400 transition-colors"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Liên hệ quảng cáo
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Kết nối</h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="#"
                className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-slate-800 rounded-full hover:bg-red-600 transition-colors"
              >
                <Youtube size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-slate-800 rounded-full hover:bg-green-600 transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
            <div className="flex items-center text-sm text-slate-400">
              <MapPin size={16} className="mr-2" />
              <span> Việt Nam</span>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} {BLOG_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
