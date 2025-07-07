'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [displayCounter, setDisplayCounter] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [typingText, setTypingText] = useState('');
  const progressRef = useRef(0);
  const counterRef = useRef(0);
  const targetCounterRef = useRef(0);
  const animationRef = useRef<number>();

  const messages = [
    "INITIALIZING",
    "DATA_TRANSFER", 
    "COMPILING",
    "FINALIZING",
    "COMPLETE"
  ];

  // Smooth counter animation (like original)
  const updateCounter = () => {
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
  };

  // Simulate typing effect
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

  // Main animation loop (like original GSAP animation)
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
      
      // Update messages based on progress (like original)
      const activeIndex = Math.min(4, Math.floor(currentProgress / 20));
      if (activeIndex !== currentMessage) {
        setCurrentMessage(activeIndex);
        if (activeIndex < messages.length) {
          simulateTyping(messages[activeIndex]);
        }
      }
      
      // Continue animation
      if (currentProgress < 100) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Complete loading
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => onComplete(), 500);
        }, 800);
      }
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentMessage, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="preloader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: '#121212',
          color: '#f5f5f5',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          fontFamily: '"Space Mono", monospace'
        }}
      >
        {/* Pixel Grid Background */}
        <div 
          className="pixel-grid"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.1
          }}
        >
          {/* Top row - extends with progress */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${progress}%`,
              height: '2px',
              backgroundColor: '#f5f5f5',
              transition: 'width 0.1s ease-out'
            }}
          />
          {/* Bottom row - extends with progress */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: `${progress}%`,
              height: '2px',
              backgroundColor: '#f5f5f5',
              transition: 'width 0.1s ease-out'
            }}
          />
          {/* Left column - extends with progress */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '2px',
              height: `${progress}%`,
              backgroundColor: '#f5f5f5',
              transition: 'height 0.1s ease-out'
            }}
          />
          {/* Right column - extends with progress */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '2px',
              height: `${progress}%`,
              backgroundColor: '#f5f5f5',
              transition: 'height 0.1s ease-out'
            }}
          />
        </div>

        {/* Main Content */}
        <div 
          style={{
            position: 'relative',
            zIndex: 10,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem'
          }}
        >
          {/* Massive Counter */}
          <motion.div
            style={{
              position: 'relative',
              fontSize: 'clamp(8rem, 20vw, 25rem)',
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              marginBottom: '2rem'
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div style={{ position: 'relative', zIndex: 2 }}>
              {displayCounter}
            </div>
            <div 
              style={{
                position: 'absolute',
                top: '6px',
                left: '6px',
                fontSize: 'inherit',
                fontWeight: 'inherit',
                opacity: 0.2,
                zIndex: 1
              }}
              aria-hidden="true"
            >
              {displayCounter}
            </div>
          </motion.div>

          {/* Status Text */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <motion.div
              style={{
                fontSize: '1.8rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
                letterSpacing: '0.1em'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              LOADING SYSTEM
            </motion.div>
            
            <div
              style={{
                fontSize: '1.2rem',
                fontWeight: 400,
                opacity: 0.9,
                letterSpacing: '0.05em',
                minHeight: '1.5rem',
                fontFamily: 'monospace'
              }}
            >
              {typingText}
            </div>
          </div>

          {/* Progress Bar */}
          <div 
            style={{
              width: '100%',
              maxWidth: '700px',
              marginBottom: '2rem'
            }}
          >
            <div 
              style={{
                width: '100%',
                height: '6px',
                backgroundColor: '#1a1a1a',
                borderRadius: '3px',
                overflow: 'hidden',
                marginBottom: '1.5rem',
                border: '1px solid #333'
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  backgroundColor: '#f5f5f5',
                  borderRadius: '3px',
                  transition: 'width 0.1s ease-out'
                }}
              />
            </div>
            
            {/* Progress Markers */}
            <div 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.9rem',
                fontWeight: 600,
                fontFamily: 'monospace'
              }}
            >
              {[0, 25, 50, 75, 100].map((marker) => (
                <div
                  key={marker}
                  style={{
                    opacity: progress >= marker ? 1 : 0.4,
                    transition: 'opacity 0.3s ease',
                    color: progress >= marker ? '#f5f5f5' : '#666'
                  }}
                >
                  {marker.toString().padStart(2, '0')}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
