import React from 'react';

const Hero3D: React.FC = () => {
  return (
    <div className="w-full h-[400px] flex items-center justify-center relative perspective-container">
      <style>{`
        .perspective-container {
          perspective: 1000px;
        }

        .scene-3d {
          position: relative;
          transform-style: preserve-3d;
          transform: rotateX(10deg) rotateY(-15deg);
          transition: transform 0.5s ease;
        }
        
        .perspective-container:hover .scene-3d {
             transform: rotateX(5deg) rotateY(-5deg) scale(1.05);
        }

        /* --- LAPTOP STRUCTURE --- */
        .laptop {
          width: 300px;
          height: 200px;
          transform-style: preserve-3d;
          position: relative;
        }

        /* Screen (Top Part) */
        .laptop-screen {
          width: 300px;
          height: 190px;
          background: #1e293b;
          border-radius: 12px 12px 0 0;
          position: absolute;
          transform-origin: bottom;
          transform: rotateX(-10deg); /* Open angle */
          transform-style: preserve-3d;
          box-shadow: 0 0 20px rgba(0,0,0,0.5);
          border: 8px solid #334155;
          border-bottom: none;
        }
        
        /* The Display content */
        .display {
          width: 100%;
          height: 100%;
          background: #0f172a;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: flex-start; /* Align left to prevent center-jitter */
          padding-left: 55px; /* Manually center the 17ch text block (300px - ~190px)/2 */
          backface-visibility: hidden;
        }

        .typing-text {
          font-family: 'Courier New', monospace;
          color: #4ade80; /* green-400 */
          font-weight: bold;
          font-size: 18px;
          white-space: nowrap;
          overflow: hidden;
          border-right: 3px solid #4ade80;
          width: 0;
          /* Steps match character count (17 chars) */
          animation: typing 4s steps(17, end) infinite, blink .75s step-end infinite;
          text-shadow: 0 0 5px #4ade80;
        }

        /* Back of screen */
        .laptop-screen::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: #334155;
          transform: translateZ(-2px);
          border-radius: 12px 12px 0 0;
        }
        
        /* Logo on back */
        .laptop-screen::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 40px;
            height: 40px;
            background: #64748b;
            border-radius: 50%;
            transform: translateZ(-3px) translate(-50%, -50%) rotateY(180deg);
        }

        /* Keyboard (Bottom Part) */
        .laptop-base {
          width: 300px;
          height: 200px;
          background: #334155;
          position: absolute;
          top: 190px; /* Connect to bottom of screen */
          transform-origin: top;
          transform: rotateX(80deg);
          transform-style: preserve-3d;
          border-radius: 0 0 15px 15px;
          box-shadow: 0 20px 30px rgba(0,0,0,0.4);
        }

        .laptop-base::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, #1e293b, #334155);
            border-radius: 0 0 15px 15px;
            transform: translateZ(-10px);
        }

        .trackpad {
            position: absolute;
            bottom: 15px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 60px;
            background: #1e293b;
            border-radius: 4px;
        }
        
        .keyboard-area {
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 260px;
            height: 90px;
            background: #1e293b;
            border-radius: 4px;
            display: grid;
            grid-template-columns: repeat(10, 1fr);
            gap: 2px;
            padding: 4px;
        }
        
        .key {
            background: #475569;
            border-radius: 2px;
            animation: keypress 1.5s infinite;
        }
        
        /* Random key animations */
        .key:nth-child(2n) { animation-delay: 0.1s; }
        .key:nth-child(3n) { animation-delay: 0.3s; }
        .key:nth-child(5n) { animation-delay: 0.5s; }
        .key:nth-child(7n) { animation-delay: 0.2s; }

        /* --- AVATAR (PERSON) --- */
        .avatar-container {
            position: absolute;
            bottom: -50px; /* Sit behind the laptop base */
            left: 50%;
            transform: translateX(-50%) translateZ(-100px);
            width: 120px;
            height: 140px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .avatar-head {
            width: 60px;
            height: 70px;
            background: #fca5a5; /* Skin tone */
            border-radius: 30px;
            position: relative;
            z-index: 2;
            box-shadow: -4px 4px 10px rgba(0,0,0,0.2);
        }
        
        /* Hair */
        .avatar-head::before {
            content: '';
            position: absolute;
            top: -5px;
            left: -5px;
            width: 70px;
            height: 40px;
            background: #1e1b4b; /* Dark hair */
            border-radius: 30px 30px 0 0;
        }

        .avatar-body {
            width: 100px;
            height: 80px;
            background: linear-gradient(135deg, #3b82f6, #2563eb); /* Blue shirt */
            border-radius: 40px 40px 0 0;
            margin-top: -10px;
            z-index: 1;
        }
        
        /* Hands floating over keyboard */
        .hand {
            position: absolute;
            width: 25px;
            height: 25px;
            background: #fca5a5;
            border-radius: 50%;
            z-index: 50;
        }
        
        .hand-left {
            top: 150px;
            left: 80px;
            transform: translateZ(50px);
            animation: typeLeft 0.4s infinite alternate;
        }
        
        .hand-right {
            top: 150px;
            right: 80px;
            transform: translateZ(50px);
            animation: typeRight 0.4s infinite alternate;
        }

        /* --- ANIMATIONS --- */
        @keyframes typing {
          0%, 15% { width: 0; }
          60%, 80% { width: 17ch; } /* Stop at exactly 17 chars */
          95%, 100% { width: 0; }
        }

        @keyframes blink {
          50% { border-color: transparent; }
        }
        
        @keyframes keypress {
            0%, 100% { background: #475569; transform: translateY(0); }
            50% { background: #64748b; transform: translateY(1px); }
        }
        
        @keyframes typeLeft {
            0% { transform: translateZ(20px) translateX(0) translateY(0); }
            100% { transform: translateZ(20px) translateX(10px) translateY(10px); }
        }
        
        @keyframes typeRight {
            0% { transform: translateZ(20px) translateX(0) translateY(0); }
            100% { transform: translateZ(20px) translateX(-10px) translateY(10px); }
        }
        
        /* Reflection below laptop */
        .reflection {
            position: absolute;
            width: 300px;
            height: 20px;
            background: radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 70%);
            bottom: -50px;
            left: 0;
            transform: rotateX(80deg) translateZ(-40px);
        }
      `}</style>

      <div className="scene-3d">
        {/* Person Avatar */}
        <div className="avatar-container">
            <div className="avatar-head"></div>
            <div className="avatar-body"></div>
        </div>
        
        {/* Floating Hands interacting with keyboard */}
        <div className="laptop">
            <div className="hand hand-left"></div>
            <div className="hand hand-right"></div>
            
            <div className="laptop-screen">
                <div className="display">
                    <div className="typing-text">tinhocvanphong247</div>
                </div>
            </div>
            
            <div className="laptop-base">
                <div className="keyboard-area">
                    {/* Generating keys */}
                    {Array.from({ length: 40 }).map((_, i) => (
                        <div key={i} className="key"></div>
                    ))}
                </div>
                <div className="trackpad"></div>
            </div>
            
            <div className="reflection"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero3D;