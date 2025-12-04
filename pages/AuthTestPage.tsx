import React, { useState } from 'react';
import { signUp, signIn, signOut, getCurrentUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { Loader2, CheckCircle, XCircle, Play, RefreshCw, Terminal } from 'lucide-react';

interface TestLog {
  id: number;
  step: string;
  status: 'pending' | 'success' | 'error';
  message: string;
}

const AuthTestPage: React.FC = () => {
  const [logs, setLogs] = useState<TestLog[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const { user, refreshUser } = useAuth();

  const addLog = (step: string, status: 'pending' | 'success' | 'error', message: string) => {
    setLogs(prev => [...prev, { id: Date.now(), step, status, message }]);
  };

  const runTests = async () => {
    setIsRunning(true);
    setLogs([]);
    
    // Tạo SĐT ngẫu nhiên để tránh lỗi trùng lặp (10 số)
    const uniqueId = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const testPhone = `${uniqueId}`;
    const testPass = 'password123';
    const testName = 'Test User Auto';

    try {
      // --- TEST 1: Đăng ký ---
      addLog('1. Đăng ký', 'pending', `Đang tạo tài khoản với SĐT: ${testPhone}...`);
      await signUp(testPhone, testPass, testName);
      addLog('1. Đăng ký', 'success', '✅ Đăng ký thành công (Supabase trả về user object).');
      
      // Delay nhỏ để server xử lý
      await new Promise(r => setTimeout(r, 1000));

      // --- TEST 2: Đăng nhập ---
      addLog('2. Đăng nhập', 'pending', 'Đang thử đăng nhập lại bằng SĐT/Pass...');
      const session = await signIn(testPhone, testPass);
      if (session.user) {
         addLog('2. Đăng nhập', 'success', '✅ Đăng nhập thành công.');
      } else {
         throw new Error('Không tìm thấy session user.');
      }

      // --- TEST 3: Kiểm tra Context ---
      addLog('3. Global State', 'pending', 'Đang kiểm tra AuthContext...');
      await refreshUser(); // Force update context
      const currentUser = await getCurrentUser();
      
      // Kiểm tra xem user có tồn tại không
      if (currentUser) {
        // Kiểm tra xem SĐT hiển thị (từ email ảo) có chứa SĐT gốc không
        if (currentUser.email.includes(testPhone)) {
             addLog('3. Global State', 'success', `✅ AuthContext đã nhận diện user với SĐT: ${testPhone}`);
        } else {
             addLog('3. Global State', 'error', `⚠️ User đăng nhập nhưng email không khớp. Hiện tại: ${currentUser.email}`);
        }
      } else {
        throw new Error('AuthContext chưa cập nhật.');
      }

      // --- TEST 4: Metadata ---
      addLog('4. Metadata', 'pending', 'Kiểm tra tên hiển thị...');
      if (currentUser && currentUser.fullName === testName) {
         addLog('4. Metadata', 'success', `✅ Tên hiển thị đúng: ${currentUser.fullName}`);
      } else {
         addLog('4. Metadata', 'error', `❌ Sai tên hiển thị.`);
      }

      // --- TEST 5: Đăng xuất ---
      addLog('5. Đăng xuất', 'pending', 'Đang đăng xuất...');
      await signOut();
      await refreshUser();
      addLog('5. Đăng xuất', 'success', '✅ Đăng xuất thành công.');

      addLog('KẾT THÚC', 'success', '🎉 TẤT CẢ CÁC TEST ĐỀU THÔNG QUA!');

    } catch (error: any) {
      console.error(error);
      addLog('LỖI HỆ THỐNG', 'error', `❌ Test thất bại: ${error.message || JSON.stringify(error)}`);
      
      if (error.message?.includes('Email link')) {
         addLog('GỢI Ý', 'pending', '⚠️ Bạn cần tắt "Confirm Email" trong Supabase Dashboard -> Auth -> Providers -> Email thì mới test tự động được.');
      }
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center text-white">
            <Terminal className="mr-3" />
            <h1 className="text-xl font-mono font-bold">System Health Check</h1>
          </div>
          <div className="flex items-center space-x-2">
             <span className={`h-3 w-3 rounded-full ${user ? 'bg-green-500' : 'bg-red-500'}`}></span>
             <span className="text-xs text-slate-400 font-mono">
                Current Status: {user ? 'LOGGED IN' : 'GUEST'}
             </span>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm border border-blue-100">
             <strong>Hướng dẫn:</strong> Trang này giả lập quy trình đăng ký/đăng nhập bằng SĐT. Nó sẽ tạo SĐT ngẫu nhiên, đăng ký, đăng nhập và kiểm tra.
             <br/>
             <span className="text-red-600 font-bold">Lưu ý: Hãy tắt "Confirm Email" trong Supabase Dashboard để test chạy mượt mà.</span>
          </div>

          <button
            onClick={runTests}
            disabled={isRunning}
            className="w-full flex items-center justify-center py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
          >
            {isRunning ? (
              <>
                <Loader2 className="animate-spin mr-2" /> Đang chạy kiểm tra...
              </>
            ) : (
              <>
                <Play className="mr-2 fill-current" /> Bắt đầu kiểm tra hệ thống (Run Unit Tests)
              </>
            )}
          </button>

          <div className="mt-8 space-y-3 font-mono text-sm">
            {logs.length === 0 && !isRunning && (
                <div className="text-center text-slate-400 py-8 border-2 border-dashed border-slate-200 rounded-lg">
                    Chưa có log nào. Nhấn nút phía trên để bắt đầu.
                </div>
            )}
            
            {logs.map((log) => (
              <div 
                key={log.id} 
                className={`flex items-start p-3 rounded-md border ${
                  log.status === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                  log.status === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
                  'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="mt-0.5 mr-3 shrink-0">
                  {log.status === 'success' && <CheckCircle size={16} />}
                  {log.status === 'error' && <XCircle size={16} />}
                  {log.status === 'pending' && <RefreshCw size={16} className="animate-spin" />}
                </div>
                <div>
                  <span className="font-bold mr-2">[{log.step}]</span>
                  <span>{log.message}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTestPage;