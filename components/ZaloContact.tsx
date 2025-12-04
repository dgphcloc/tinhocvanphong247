import React from "react";

const ZaloContact: React.FC = () => {
  // Thay thế số điện thoại của bạn ở đây
  const ZALO_PHONE = "0912345678";

  return (
    <a
      href={`https://zalo.me/${ZALO_PHONE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-40 flex items-center justify-center w-14 h-14 bg-[#0068FF] rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
      aria-label="Chat Zalo"
      title="Chat qua Zalo"
    >
      {/* Hiệu ứng sóng lan tỏa (Pulse effect) */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#0068FF] opacity-20 animate-ping"></span>
      {/* Tooltip bên trái */}
      <span className="absolute right-full mr-3 px-2 py-1 bg-slate-800 text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat Zalo
      </span>
      {/* Zalo Logo SVG */}
      {/* <svg 
        viewBox="0 0 48 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-white"
      >
        <path d="M9.78284 37.6613C10.7061 38.6276 13.913 39.814 17.1593 39.9922C17.1593 39.9922 18.068 41.7423 17.6975 42.6074C17.0708 44.0722 14.6599 43.6823 14.6599 43.6823C9.07478 43.3768 5.75924 38.9079 5.75924 38.9079C4.8524 37.892 5.09355 35.8453 5.09355 35.8453C5.09355 35.8453 1.95752 32.1818 1.95752 25.1065C1.95752 16.4523 11.2327 9.43652 22.6775 9.43652C34.1224 9.43652 43.3975 16.4523 43.3975 25.1065C43.3975 33.7607 34.1224 40.7765 22.6775 40.7765C20.3061 40.7765 18.0387 40.4539 15.9392 39.8553" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M26 21H17V29H26V21Z" fill="white"/>
        <path d="M19 25H24" stroke="#0068FF" strokeWidth="2" strokeLinecap="round"/>
      </svg> */}
      <span className="text-white font-bold"> ZALO</span>
    </a>
  );
};

export default ZaloContact;
