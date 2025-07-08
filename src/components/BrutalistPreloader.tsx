'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function BrutalistPreloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [displayCounter, setDisplayCounter] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [typingText, setTypingText] = useState('');
  const progressRef = useRef(0);
  const counterRef = useRef(0);
  const targetCounterRef = useRef(0);
  const animationRef = useRef<number | undefined>(undefined);
  const lastMessageIndex = useRef(0);

  // Exact messages from original
  const messages = useMemo(() => [
    "INITIALIZING",
    "DATA_TRANSFER", 
    "COMPILING",
    "FINALIZING",
    "COMPLETE"
  ], []);

  // Smooth counter animation (exactly matching original)
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

  // Simulate typing effect (exactly matching original)
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

  // Main animation loop (exactly matching original GSAP timing)
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
      
      // Update messages based on progress (exactly matching original)
      const activeIndex = Math.min(4, Math.floor(currentProgress / 20));
      if (activeIndex !== lastMessageIndex.current) {
        const message = messages[activeIndex];
        if (message) {
          simulateTyping(message);
        }
        lastMessageIndex.current = activeIndex;
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
  }, [onComplete, messages, updateCounter]);

  if (!isVisible) return null;

  return (
    <div className="preloader">
      {/* Pixel grid elements */}
      <div className="pixel-grid">
        <div 
          className="pixel-row"
          id="top-row"
          style={{ width: `${progress}%` }}
        />
        <div 
          className="pixel-row"
          id="bottom-row"
          style={{ width: `${progress}%` }}
        />
        <div 
          className="pixel-column"
          id="left-column"
          style={{ height: `${progress}%` }}
        />
        <div 
          className="pixel-column"
          id="right-column"
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
            {typingText}
          </div>
        </div>
      </div>

      {/* Progress markers */}
      <div className="loading-bar-container">
        <div className="loading-bar">
          <div 
            className="progress"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="loading-bar-markers">
          <div className={`marker ${progress >= 0 ? 'active' : ''}`} data-position="0">00</div>
          <div className={`marker ${progress >= 25 ? 'active' : ''}`} data-position="25">25</div>
          <div className={`marker ${progress >= 50 ? 'active' : ''}`} data-position="50">50</div>
          <div className={`marker ${progress >= 75 ? 'active' : ''}`} data-position="75">75</div>
          <div className={`marker ${progress >= 100 ? 'active' : ''}`} data-position="100">100</div>
        </div>
        
        {/* Progressive line fills */}
        <div className="connector-lines">
          <div 
            className="connector-line"
            id="line-0-25"
            style={{ 
              transform: `scaleX(${progress >= 0 ? Math.min(1, (progress - 0) / 25) : 0})` 
            }}
          />
          <div 
            className="connector-line"
            id="line-25-50"
            style={{ 
              transform: `scaleX(${progress >= 25 ? Math.min(1, (progress - 25) / 25) : 0})` 
            }}
          />
          <div 
            className="connector-line"
            id="line-50-75"
            style={{ 
              transform: `scaleX(${progress >= 50 ? Math.min(1, (progress - 50) / 25) : 0})` 
            }}
          />
          <div 
            className="connector-line"
            id="line-75-100"
            style={{ 
              transform: `scaleX(${progress >= 75 ? Math.min(1, (progress - 75) / 25) : 0})` 
            }}
          />
        </div>
      </div>

      {/* Block elements that progressively fill */}
      <div className="block-container">
        <div 
          className="block"
          id="block-1"
          style={{ 
            transform: `scale(${progress >= 20 ? Math.min(1, (progress - 20) / 20) : 0})` 
          }}
        />
        <div 
          className="block"
          id="block-2"
          style={{ 
            transform: `scale(${progress >= 40 ? Math.min(1, (progress - 40) / 20) : 0})` 
          }}
        />
        <div 
          className="block"
          id="block-3"
          style={{ 
            transform: `scale(${progress >= 60 ? Math.min(1, (progress - 60) / 20) : 0})` 
          }}
        />
        <div 
          className="block"
          id="block-4"
          style={{ 
            transform: `scale(${progress >= 80 ? Math.min(1, (progress - 80) / 20) : 0})` 
          }}
        />
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap");

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

        /* Pixel Grid */
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
        }

        .pixel-row {
          height: 1px;
          width: 0%;
          left: 0;
        }

        .pixel-column {
          width: 1px;
          height: 0%;
          top: 0;
        }

        #top-row {
          top: 20%;
        }

        #bottom-row {
          bottom: 20%;
        }

        #left-column {
          left: 20%;
        }

        #right-column {
          right: 20%;
        }

        /* Block elements that fill progressively */
        .block-container {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .block {
          position: absolute;
          background-color: #1a1a1a;
          border: 1px solid rgba(245, 245, 245, 0.1);
          transform-origin: center;
          transform: scale(0);
          transition: transform 500ms cubic-bezier(0.25, 1, 0.5, 1);
        }

        #block-1 {
          top: 10%;
          left: 10%;
          width: 15vw;
          height: 15vw;
        }

        #block-2 {
          top: 10%;
          right: 10%;
          width: 20vw;
          height: 20vw;
        }

        #block-3 {
          bottom: 10%;
          left: 10%;
          width: 20vw;
          height: 20vw;
        }

        #block-4 {
          bottom: 10%;
          right: 10%;
          width: 15vw;
          height: 15vw;
        }

        /* Counter */
        .counter-wrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 5;
          width: 100%;
          text-align: center;
        }

        .counter {
          font-size: clamp(10rem, 20vw, 30rem);
          font-weight: 700;
          line-height: 0.8;
          color: #f5f5f5;
          position: relative;
          display: inline-block;
        }

        .counter-outline {
          font-size: clamp(10rem, 20vw, 30rem);
          font-weight: 700;
          line-height: 0.8;
          color: transparent;
          -webkit-text-stroke: 1px rgba(245, 245, 245, 0.1);
          position: absolute;
          top: 5px;
          left: 5px;
          width: 100%;
          height: 100%;
          z-index: -1;
        }

        /* Loading Text */
        .text-container {
          position: absolute;
          top: 2rem;
          left: 2rem;
          z-index: 10;
        }

        .loading-text {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          opacity: 0.9;
        }

        .system-messages {
          font-size: 1rem;
          font-weight: normal;
          line-height: 1.5;
          opacity: 0.6;
          height: 1.5em;
          overflow: hidden;
        }

        .message {
          display: block;
        }

        .message.active {
          display: block;
        }

        /* Loading Bar */
        .loading-bar-container {
          position: absolute;
          bottom: 3rem;
          left: 2rem;
          right: 2rem;
          z-index: 10;
        }

        .loading-bar {
          height: 3px;
          width: 100%;
          background-color: rgba(245, 245, 245, 0.1);
          margin-bottom: 10px;
          position: relative;
        }

        .progress {
          height: 100%;
          width: 0%;
          background-color: #f5f5f5;
          transition: width 500ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        .loading-bar-markers {
          display: flex;
          justify-content: space-between;
          width: 100%;
          font-size: 0.8rem;
          opacity: 0.6;
          position: relative;
        }

        .marker {
          position: relative;
          padding-top: 10px;
          transition: opacity 0.3s ease;
        }

        .marker.active {
          opacity: 1;
        }

        .marker::before {
          content: "";
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 5px;
          background-color: #f5f5f5;
        }

        /* Connector lines between markers */
        .connector-lines {
          position: absolute;
          top: 0;
          width: 100%;
        }

        .connector-line {
          position: absolute;
          top: -12px;
          height: 1px;
          background-color: #f5f5f5;
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 500ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        #line-0-25 {
          left: 0%;
          width: 25%;
        }

        #line-25-50 {
          left: 25%;
          width: 25%;
        }

        #line-50-75 {
          left: 50%;
          width: 25%;
        }

        #line-75-100 {
          left: 75%;
          width: 25%;
        }

        /* Media queries for responsive design */
        @media (max-width: 768px) {
          .text-container {
            top: 1rem;
            left: 1rem;
          }

          .loading-bar-container {
            bottom: 2rem;
            left: 1rem;
            right: 1rem;
          }

          .loading-text {
            font-size: 1.5rem;
          }

          .system-messages {
            font-size: 0.8rem;
          }

          #block-1,
          #block-2,
          #block-3,
          #block-4 {
            width: 25vw;
            height: 25vw;
          }
        }
      `}</style>
    </div>
  );
}
