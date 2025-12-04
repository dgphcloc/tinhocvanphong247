
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ArticlePage from './pages/ArticlePage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard';
import ChatbotPage from './pages/ChatbotPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthTestPage from './pages/AuthTestPage';
import AIAssistant from './components/AIAssistant';
import ZaloContact from './components/ZaloContact';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
          <Routes>
            {/* Auth Routes (Standalone) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Dashboard route (standalone layout) */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Test route */}
            <Route path="/test-auth" element={
                 <>
                    <Navbar />
                    <AuthTestPage />
                 </>
            } />

            {/* Public routes (with Navbar/Footer) */}
            <Route path="*" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/article/:id" element={<ArticlePage />} />
                    <Route path="/category/:categoryId" element={<CategoryPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/chatbot" element={<ChatbotPage />} />
                  </Routes>
                </main>
                
                {/* Floating Action Buttons */}
                <Routes>
                  <Route path="/chatbot" element={null} />
                  <Route path="*" element={
                    <>
                      <ZaloContact />
                      <AIAssistant />
                    </>
                  } />
                </Routes>

                {/* Ẩn Footer trên trang Chatbot để có giao diện toàn màn hình */}
                <Routes>
                  <Route path="/chatbot" element={null} />
                  <Route path="*" element={<Footer />} />
                </Routes>
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
