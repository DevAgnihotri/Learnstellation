'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  create: () => void;
  animate: () => void;
}

interface ConstellationConfig {
  star: {
    color: string;
    width: number;
    randomWidth: boolean;
  };
  line: {
    color: string;
    width: number;
  };
  position: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  velocity: number;
  length: number;
  distance: number;
  radius: number;
  stars: Star[];
}

interface ConstellationProps {
  className?: string;
  starColor?: string;
  lineColor?: string;
  starWidth?: number;
  velocity?: number;
  starCount?: number;
}

export default function Constellation({
  className = "",
  starColor = "rgba(255, 255, 255, 0.8)",
  lineColor = "rgba(255, 255, 255, 0.3)",
  starWidth = 2,
  velocity = 0.05,
  starCount
}: ConstellationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const configRef = useRef<ConstellationConfig | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();

    const config: ConstellationConfig = {
      star: {
        color: starColor,
        width: starWidth,
        randomWidth: true
      },
      line: {
        color: lineColor,
        width: 0.2
      },
      position: {
        x: canvas.width * 0.5,
        y: canvas.height * 0.5
      },
      width: canvas.width,
      height: canvas.height,
      velocity: velocity,
      length: starCount ?? Math.floor(window.innerWidth / 8),
      distance: 120,
      radius: window.innerWidth / 6,
      stars: []
    };

    configRef.current = config;

    class StarImpl implements Star {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = config.velocity - Math.random() * (config.velocity * 2);
        this.vy = config.velocity - Math.random() * (config.velocity * 2);
        this.radius = config.star.randomWidth 
          ? Math.random() * config.star.width 
          : config.star.width;
      }

      create() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
      }

      animate() {
        // Bounce off edges
        if (this.y < 0 || this.y > canvas.height) {
          this.vy = -this.vy;
        }
        if (this.x < 0 || this.x > canvas.width) {
          this.vx = -this.vx;
        }

        this.x += this.vx;
        this.y += this.vy;
      }
    }

    const createStars = () => {
      config.stars = [];
      Array.from({ length: config.length }, () => {
        config.stars.push(new StarImpl());
      });
    };

    const drawLines = () => {
      const { stars, distance, radius, position } = config;
      
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const iStar = stars[i];
          const jStar = stars[j];

          if (iStar && jStar) {
            const dx = iStar.x - jStar.x;
            const dy = iStar.y - jStar.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < distance) {
              const iStarToCursor = Math.sqrt(
                (iStar.x - position.x) ** 2 + (iStar.y - position.y) ** 2
              );
              
              if (iStarToCursor < radius) {
                context.beginPath();
                context.moveTo(iStar.x, iStar.y);
                context.lineTo(jStar.x, jStar.y);
                context.stroke();
              }
            }
          }
        }
      }
    };

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set styles
      context.fillStyle = config.star.color;
      context.strokeStyle = config.line.color;
      context.lineWidth = config.line.width;

      // Animate and draw stars
      for (const star of config.stars) {
        star.animate();
        star.create();
      }

      // Draw connecting lines
      drawLines();

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (configRef.current) {
        const rect = canvas.getBoundingClientRect();
        configRef.current.position.x = e.clientX - rect.left;
        configRef.current.position.y = e.clientY - rect.top;
      }
    };

    const handleResize = () => {
      updateCanvasSize();
      if (configRef.current) {
        configRef.current.width = canvas.width;
        configRef.current.height = canvas.height;
        configRef.current.position.x = canvas.width * 0.5;
        configRef.current.position.y = canvas.height * 0.5;
        configRef.current.radius = window.innerWidth / 6;
        configRef.current.length = starCount ?? Math.floor(window.innerWidth / 8);
        createStars();
      }
    };

    // Initialize
    createStars();
    animate();

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [starColor, lineColor, starWidth, velocity, starCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ background: 'transparent' }}
    />
  );
}
