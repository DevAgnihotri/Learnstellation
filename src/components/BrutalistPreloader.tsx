'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function BrutalistPreloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [displayCounter, setDisplayCounter] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [typingText, setTypingText] = useState('');
  const progressRef = useRef(0);
  const counterRef = useRef(0);
  const targetCounterRef = useRef(0);
  const animationRef = useRef<number | undefined>(undefined);

  const messages = useMemo(() => [
    "INITIALIZING SYSTEM",
    "LOADING DATA STREAMS", 
    "COMPILING ALGORITHMS",
    "FINALIZING PROTOCOLS",
    "SYSTEM READY"
  ], []);

  // Smooth counter animation (matching original)
  const updateCounter = useCallback(() => {
    if (counterRef.current !== targetCounterRef.current) {
      const gap = targetCounterRef.current - counterRef.current;
      const step = gap > 10 ? 2 : 1;
      
      counterRef.current = gap > 0 
        ? Math.min(targetCounterRef.current, counterRef.current + step) 
        : targetCounterRef.current;
      
      setDisplayCounter(counterRef.current);
      
      if (counterRef.current !== targetCounterRef.current) {
        setTimeout(updateCounter, 40);
      }
    }
  }, []);

  // Simulate typing effect (matching original)
  const simulateTyping = (text: string) => {
    setTypingText('');
    let i = 0;
    const typeNextChar = () => {
      if (i < text.length) {
        setTypingText(prev => prev + text.charAt(i));
        i++;
        setTimeout(typeNextChar, 30);
      }
    };
    typeNextChar();
  };

  // Main animation loop (matching original GSAP timing)
  useEffect(() => {
    const duration = 6000; // 6 seconds like original
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      
      // Use easing similar to GSAP's power1.inOut
      const easedProgress = rawProgress < 0.5 
        ? 2 * rawProgress * rawProgress 
        : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;
      
      const currentProgress = Math.floor(easedProgress * 100);
      progressRef.current = currentProgress;
      
      // Update progress
      setProgress(currentProgress);
      
      // Update target counter
      targetCounterRef.current = currentProgress;
      updateCounter();
      
      // Update messages based on progress (matching original)
      const activeIndex = Math.min(4, Math.floor(currentProgress / 20));
      if (activeIndex !== currentMessage) {
        setCurrentMessage(activeIndex);
        const message = messages[activeIndex];
        if (message) {
          simulateTyping(message);
        }
      }
      
      // Continue animation
      if (currentProgress < 100) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Complete loading
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 800);
        }, 800);
      }
    };
    
    // Start typing first message
    const firstMessage = messages[0];
    if (firstMessage) {
      simulateTyping(firstMessage);
    }
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onComplete, currentMessage, messages, updateCounter]);

  if (!isVisible) return null;

  return (
    <div className="preloader">
      {/* Pixel grid elements */}
      <div className="pixel-grid">
        <div 
          className="pixel-row top-row" 
          style={{ width: `${progress}%` }}
        />
        <div 
          className="pixel-row bottom-row" 
          style={{ width: `${progress}%` }}
        />
        <div 
          className="pixel-column left-column" 
          style={{ height: `${progress}%` }}
        />
        <div 
          className="pixel-column right-column" 
          style={{ height: `${progress}%` }}
        />
      </div>

      {/* Massive counter */}
      <div className="counter-wrapper">
        <div className="counter">{displayCounter}</div>
        <div className="counter-outline" aria-hidden="true">{displayCounter}</div>
      </div>

      {/* Status text */}
      <div className="text-container">
        <div className="loading-text">LOADING SYSTEM</div>
        <div className="system-messages">
          <div className="message active">
            <span className="bracket">[</span>
            <span className="message-text">{typingText}</span>
            <span className="bracket">]</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-container">
        <div className="progress-track">
          <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="progress-markers">
          <div className={`marker ${progress >= 0 ? 'active' : ''}`} data-position="0">0</div>
          <div className={`marker ${progress >= 25 ? 'active' : ''}`} data-position="25">25</div>
          <div className={`marker ${progress >= 50 ? 'active' : ''}`} data-position="50">50</div>
          <div className={`marker ${progress >= 75 ? 'active' : ''}`} data-position="75">75</div>
          <div className={`marker ${progress >= 100 ? 'active' : ''}`} data-position="100">100</div>
        </div>
      </div>

      <style jsx>{`
        .preloader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background-color: #121212;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: 'Space Mono', monospace;
          color: #f5f5f5;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .pixel-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
        }

        .pixel-row,
        .pixel-column {
          position: absolute;
          background-color: #f5f5f5;
          opacity: 0.1;
          transition: width 0.2s ease, height 0.2s ease;
        }

        .pixel-row {
          height: 1px;
          left: 0;
        }

        .pixel-column {
          width: 1px;
          top: 0;
        }

        .top-row {
          top: 20%;
        }

        .bottom-row {
          bottom: 20%;
        }

        .left-column {
          left: 20%;
        }

        .right-column {
          right: 20%;
        }

        .counter-wrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
        }

        .counter {
          font-size: clamp(10rem, 20vw, 30rem);
          font-weight: 900;
          line-height: 0.8;
          text-align: center;
          color: #f5f5f5;
          text-shadow: 0 0 20px rgba(245, 245, 245, 0.5);
          position: relative;
          z-index: 2;
        }

        .counter-outline {
          position: absolute;
          top: 0;
          left: 0;
          font-size: clamp(10rem, 20vw, 30rem);
          font-weight: 900;
          line-height: 0.8;
          text-align: center;
          color: transparent;
          -webkit-text-stroke: 2px #e0e0e0;
          text-stroke: 2px #e0e0e0;
          opacity: 0.3;
          z-index: 1;
        }

        .text-container {
          position: absolute;
          bottom: 15%;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          z-index: 10;
        }

        .loading-text {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          letter-spacing: 0.2em;
          color: #f5f5f5;
        }

        .system-messages {
          min-height: 2rem;
        }

        .message {
          font-size: 1rem;
          font-weight: 400;
          letter-spacing: 0.1em;
          color: #e0e0e0;
          opacity: 0.8;
        }

        .message.active {
          opacity: 1;
          color: #f5f5f5;
        }

        .bracket {
          color: #888;
          margin: 0 0.5rem;
        }

        .message-text {
          min-width: 200px;
          display: inline-block;
          text-align: left;
        }

        .progress-container {
          position: absolute;
          bottom: 5%;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          max-width: 600px;
          z-index: 10;
        }

        .progress-track {
          width: 100%;
          height: 2px;
          background-color: #333;
          border-radius: 1px;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .progress-bar {
          height: 100%;
          background-color: #f5f5f5;
          transition: width 0.3s ease;
        }

        .progress-markers {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: #888;
        }

        .marker {
          transition: color 0.3s ease;
        }

        .marker.active {
          color: #f5f5f5;
        }

        @media (max-width: 768px) {
          .counter {
            font-size: clamp(6rem, 15vw, 20rem);
          }
          
          .counter-outline {
            font-size: clamp(6rem, 15vw, 20rem);
          }
          
          .loading-text {
            font-size: 1.2rem;
          }
          
          .progress-container {
            width: 90%;
          }
        }
      `}</style>
    </div>
  );
}
