import React from 'react';
import SEO from '../components/SEO';
import { CheckCircle, Users, Target, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <SEO
        title="Về chúng tôi - Tinhocvanphong247"
        description="Tìm hiểu về sứ mệnh và đội ngũ đằng sau Tinhocvanphong247 - Blog chia sẻ kiến thức tin học văn phòng hàng đầu."
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Về Tinhocvanphong247</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Chúng tôi tin rằng kỹ năng tin học văn phòng vững chắc là chìa khóa để nâng cao hiệu suất và thăng tiến trong sự nghiệp.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Sứ mệnh của chúng tôi</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Tinhocvanphong247 được thành lập với mục tiêu đơn giản hóa các kiến thức tin học phức tạp. Chúng tôi mong muốn trở thành người bạn đồng hành tin cậy của sinh viên và nhân viên văn phòng tại Việt Nam.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              Dù bạn là người mới bắt đầu hay đã có kinh nghiệm, chúng tôi luôn có những thủ thuật, bài hướng dẫn giúp bạn xử lý công việc nhanh hơn, chính xác hơn và chuyên nghiệp hơn.
            </p>
            <Link to="/" className="inline-block mt-4 text-blue-600 font-semibold hover:text-blue-800">
              Khám phá bài viết ngay &rarr;
            </Link>
          </div>
          <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
            <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
              <Target className="mr-2" /> Giá trị cốt lõi
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-slate-700"><strong>Thực tế:</strong> Nội dung bám sát nhu cầu công việc thực tế hàng ngày.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-slate-700"><strong>Dễ hiểu:</strong> Hướng dẫn chi tiết từng bước, có hình ảnh minh họa trực quan.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-slate-700"><strong>Cập nhật:</strong> Luôn cập nhật các tính năng mới nhất của Office 365, Windows.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Team/Stats Section */}
        <div className="mb-20 text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-12">Tại sao chọn chúng tôi?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Cộng đồng lớn mạnh</h3>
                    <p className="text-slate-500">Hàng ngàn độc giả truy cập mỗi tháng để tìm kiếm giải pháp cho công việc.</p>
                </div>
                 <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Nội dung chất lượng</h3>
                    <p className="text-slate-500">Bài viết được biên soạn kỹ lưỡng bởi các chuyên gia có kinh nghiệm thực chiến.</p>
                </div>
                 <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Hỗ trợ nhiệt tình</h3>
                    <p className="text-slate-500">Sẵn sàng giải đáp thắc mắc của bạn đọc qua bình luận và email.</p>
                </div>
            </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Bạn có câu hỏi hoặc muốn đóng góp bài viết?</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Chúng tôi luôn hoan nghênh những ý kiến đóng góp để xây dựng cộng đồng ngày càng phát triển.</p>
            <a href="mailto:contact@tinhocvanphong247.com" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                <Mail className="mr-2" size={20} />
                Liên hệ ngay
            </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;