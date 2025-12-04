import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../services/authService';
import SEO from '../components/SEO';
import { Lock, User, Loader2, AlertCircle, ArrowLeft, CheckCircle, Phone, Facebook, FileText } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [note, setNote] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signUp(phone, password, fullName, facebookUrl, note);
      setSuccess(true);
      // Optional: Auto redirect after few seconds
      setTimeout(() => navigate('/login'), 5000);
    } catch (err: any) {
      console.error(err);
      if (err.message.includes('already registered')) {
          setError('Số điện thoại này đã được đăng ký.');
      } else {
          setError(err.message || 'Đăng ký thất bại. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fade-in">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-200 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Đăng ký thành công!</h2>
                <p className="text-slate-600 mb-6">
                    Tài khoản của bạn đã được tạo. Bạn có thể đăng nhập ngay bằng Số điện thoại.
                </p>
                <Link to="/login" className="block w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                    Về trang đăng nhập
                </Link>
            </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fade-in">
      <SEO title="Đăng ký - Tinhocvanphong247" description="Tạo tài khoản mới." />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center mb-6 text-slate-400 hover:text-blue-600 transition-colors">
            <ArrowLeft className="mr-2" /> Quay lại trang chủ
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Tạo tài khoản mới
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Đã có tài khoản?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Đăng nhập ngay
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-200">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-start text-sm">
                <AlertCircle size={16} className="mr-2 mt-0.5 shrink-0" />
                {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">
                Họ và tên
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="block w-full pl-10 sm:text-sm border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 border outline-none"
                  placeholder="Nguyễn Văn A"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                Số điện thoại (Dùng để đăng nhập) <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full pl-10 sm:text-sm border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 border outline-none"
                  placeholder="0912345678"
                  pattern="[0-9]{10,11}"
                  title="Vui lòng nhập số điện thoại hợp lệ (10-11 số)"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 sm:text-sm border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 border outline-none"
                  placeholder="Tối thiểu 6 ký tự"
                  minLength={6}
                />
              </div>
            </div>

            {/* Link Facebook (Optional) */}
            <div>
              <label htmlFor="facebook" className="block text-sm font-medium text-slate-700">
                Link Facebook <span className="text-slate-400 font-normal">(Tùy chọn)</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Facebook className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="facebook"
                  name="facebook"
                  type="url"
                  value={facebookUrl}
                  onChange={(e) => setFacebookUrl(e.target.value)}
                  className="block w-full pl-10 sm:text-sm border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 border outline-none"
                  placeholder="https://facebook.com/..."
                />
              </div>
            </div>

            {/* Ghi chú (Optional) */}
            <div>
              <label htmlFor="note" className="block text-sm font-medium text-slate-700">
                Ghi chú thêm <span className="text-slate-400 font-normal">(Tùy chọn)</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                  <FileText className="h-5 w-5 text-slate-400" />
                </div>
                <textarea
                  id="note"
                  name="note"
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="block w-full pl-10 sm:text-sm border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 border outline-none resize-none"
                  placeholder="Bạn biết đến chúng tôi qua đâu?..."
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Đăng ký tài khoản'}
              </button>
            </div>
          </form>
          
           <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">
                    Bằng việc đăng ký, bạn đồng ý với
                  </span>
                </div>
              </div>
              <div className="mt-2 text-center text-xs text-slate-400">
                <a href="#" className="underline hover:text-blue-600">Điều khoản sử dụng</a> và <a href="#" className="underline hover:text-blue-600">Chính sách bảo mật</a>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;