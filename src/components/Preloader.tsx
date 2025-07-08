'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const messages = [
    "INITIALIZING",
    "DATA_TRANSFER", 
    "COMPILING",
    "FINALIZING",
    "COMPLETE"
  ];

  useEffect(() => {
    const duration = 4000; // 4 seconds total
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const progressIncrement = 100 / steps;

    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(currentStep * progressIncrement, 100);
      setProgress(newProgress);

      // Update message based on progress
      if (newProgress >= 20 && currentMessage < 1) setCurrentMessage(1);
      else if (newProgress >= 40 && currentMessage < 2) setCurrentMessage(2);
      else if (newProgress >= 70 && currentMessage < 3) setCurrentMessage(3);
      else if (newProgress >= 95 && currentMessage < 4) setCurrentMessage(4);

      if (newProgress >= 100) {
        clearInterval(timer);
        // Wait a bit before hiding
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => onComplete(), 500);
        }, 500);
      }
    }, interval);

    return () => clearInterval(timer);
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
          {/* Top row */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '2px',
              backgroundColor: '#f5f5f5'
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
          {/* Bottom row */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '2px',
              backgroundColor: '#f5f5f5'
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          />
          {/* Left column */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '2px',
              height: '100%',
              backgroundColor: '#f5f5f5'
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
          {/* Right column */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '2px',
              height: '100%',
              backgroundColor: '#f5f5f5'
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
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
              fontSize: 'clamp(6rem, 15vw, 20rem)',
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
              {Math.floor(progress)}
            </div>
            <div 
              style={{
                position: 'absolute',
                top: '4px',
                left: '4px',
                fontSize: 'inherit',
                fontWeight: 'inherit',
                opacity: 0.3,
                zIndex: 1
              }}
              aria-hidden="true"
            >
              {Math.floor(progress)}
            </div>
          </motion.div>

          {/* Status Text */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <motion.div
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '1rem',
                letterSpacing: '0.1em'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              LOADING LEARNSTELLATION
            </motion.div>
            
            <motion.div
              style={{
                fontSize: '1rem',
                fontWeight: 400,
                opacity: 0.8,
                letterSpacing: '0.05em'
              }}
              key={currentMessage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {messages[currentMessage]}
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div 
            style={{
              width: '100%',
              maxWidth: '600px',
              marginBottom: '2rem'
            }}
          >
            <div 
              style={{
                width: '100%',
                height: '4px',
                backgroundColor: '#1a1a1a',
                borderRadius: '2px',
                overflow: 'hidden',
                marginBottom: '1rem'
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '2px'
                }}
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              />
            </div>
            
            {/* Progress Markers */}
            <div 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
                fontWeight: 400,
                opacity: 0.6
              }}
            >
              {[0, 25, 50, 75, 100].map((marker) => (
                <motion.div
                  key={marker}
                  style={{
                    opacity: progress >= marker ? 1 : 0.3,
                    transition: 'opacity 0.3s ease'
                  }}
                >
                  {marker.toString().padStart(2, '0')}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* Background Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="relative w-20 h-20 mx-auto mb-4"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-blue-700 p-4">
                <Star className="h-full w-full text-white" />
              </div>
              {/* Orbiting elements */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute -top-2 -right-2 w-6 h-6"
              >
                <Sparkles className="h-full w-full text-yellow-400" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-2 -left-2 w-4 h-4"
              >
                <Rocket className="h-full w-full text-orange-400" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent">
            Learnstellation
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-lg text-slate-300 mb-8"
        >
          Launching your cosmic learning experience...
        </motion.p>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="w-64 mx-auto"
        >
          <div className="bg-slate-700 rounded-full h-2 mb-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gradient-to-r from-blue-500 via-purple-600 to-blue-700 rounded-full shadow-lg"
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-sm text-slate-400"
          >
            {Math.round(progress)}% Complete
          </motion.p>
        </motion.div>

        {/* Loading Messages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-6 text-sm text-slate-400"
        >
          {progress < 30 && "Initializing constellation..."}
          {progress >= 30 && progress < 60 && "Connecting to learning universe..."}
          {progress >= 60 && progress < 90 && "Preparing your personalized experience..."}
          {progress >= 90 && "Almost ready to explore!"}
        </motion.div>
      </div>
    </motion.div>
  );
}
