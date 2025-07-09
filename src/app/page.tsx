'use client';

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import BrutalistPreloader from "~/components/BrutalistPreloader";

import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";
import { 
  Brain, 
  Star, 
  Sparkles,
  Rocket,
  Telescope,
  PlayCircle,
  Loader2
} from "lucide-react";
import ThemeToggle from "~/components/ThemeToggle";

// Import stunning new components
import { ThemedConstellation } from "~/components/ThemedConstellation";
import { SectionCards } from "~/components/section-cards";
import { ChartAreaInteractive } from "~/components/chart-area-interactive";
import DraggableWindow from "~/components/DraggableWindow";

export default function Home() {
  const [user] = useState<{ email?: string } | null>(null);
  const [showPreloader, setShowPreloader] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  const handleNavigation = (href: string) => {
    setIsNavigating(true);
    // Small delay to show the loading state before navigation
    setTimeout(() => {
      window.location.href = href;
    }, 200);
  };

  if (showPreloader) {
    return <BrutalistPreloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Infinite Marquee */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white overflow-hidden">
        <div className="animate-marquee whitespace-nowrap py-2 text-sm font-medium">
          <span className="mx-8">🚀 50,000+ Students Launched Their Learning Journey</span>
          <span className="mx-8">⭐ 95% Success Rate in Skill Mastery</span>
          <span className="mx-8">🧠 AI-Powered Personalized Learning Paths</span>
          <span className="mx-8">📊 Real-time Progress Tracking</span>
          <span className="mx-8">🎯 12 Weeks Average to Mastery</span>
          <span className="mx-8">🌟 4.9/5 Student Satisfaction</span>
          <span className="mx-8">🚀 50,000+ Students Launched Their Learning Journey</span>
          <span className="mx-8">⭐ 95% Success Rate in Skill Mastery</span>
          <span className="mx-8">🧠 AI-Powered Personalized Learning Paths</span>
          <span className="mx-8">📊 Real-time Progress Tracking</span>
          <span className="mx-8">🎯 12 Weeks Average to Mastery</span>
          <span className="mx-8">🌟 4.9/5 Student Satisfaction</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Star className="h-4 w-4 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Learnstellation
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Button variant="ghost" asChild className="hidden sm:inline-flex">
                  <Link href="/library">Roadmap Learning</Link>
                </Button>
                <Button variant="ghost" asChild className="hidden sm:inline-flex">
                  <Link href="/dashboard">Single Document</Link>
                </Button>
                <Button variant="ghost" asChild className="hidden lg:inline-flex">
                  <Link href="#features">Features</Link>
                </Button>
                <Button variant="ghost" asChild className="hidden lg:inline-flex">
                  <Link href="#stats">Stats</Link>
                </Button>
                <ThemeToggle />
                <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Link href="/signup">Start Learning</Link>
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-muted-foreground hidden sm:inline">Welcome, {user.email}</span>
                <Button variant="ghost" asChild className="hidden sm:inline-flex">
                  <Link href="/library">Roadmap Learning</Link>
                </Button>
                <Button variant="ghost" asChild className="hidden sm:inline-flex">
                  <Link href="/dashboard">Single Document</Link>
                </Button>
                <ThemeToggle />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section with Constellation Background */}
      <section className="relative overflow-hidden py-20 flex items-center justify-center">
        {/* Animated Constellation Background */}
        <div className="absolute inset-0">
          <ThemedConstellation
            className="w-full h-full"
            particleCount={120}
            connectionDistance={100}
            particleSpeed={0.2}
          />
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <Badge variant="outline" className="mb-4 px-3 py-1 text-sm bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
                AI-Powered Learning Platform
              </Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Navigate Your Learning
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Constellation
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                🌟 <strong>Chart your course</strong> through personalized learning paths<br />
                🚀 <strong>Accelerate mastery</strong> with AI-guided roadmaps<br />
                ✨ <strong>Reach for the stars</strong> with personalized paths
              </p>

              {/* Animated CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button 
                  size="default" 
                  className="bg-gradient-to-r from-blue-500 via-purple-600 to-blue-700 hover:from-blue-600 hover:via-purple-700 hover:to-blue-800 text-white px-8 py-6 shadow-lg transform hover:scale-105 transition-all duration-300"
                  onClick={() => handleNavigation("/signup")}
                  disabled={isNavigating}
                >
                  {isNavigating ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Rocket className="w-4 h-4 mr-2" />
                  )}
                  {isNavigating ? "Launching..." : "Launch Your Journey"}
                </Button>
                <Button 
                  variant="outline" 
                  size="default" 
                  className="border-2 border-purple-400 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/20 px-8 py-6 transform hover:scale-105 transition-all duration-300"
                  onClick={() => handleNavigation("#constellation-stats")}
                  disabled={isNavigating}
                >
                  {isNavigating ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Telescope className="w-4 h-4 mr-2" />
                  )}
                  {isNavigating ? "Exploring..." : "Explore Universe"}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Beautiful Section Cards */}
      <motion.section
        id="stats"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 px-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950/20"
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Cosmic Learning Metrics
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Real-time insights from the learning constellation
            </p>
          </div>
          <SectionCards />
        </div>
      </motion.section>

      {/* Interactive Analytics Dashboard */}
      <motion.section
        id="constellation-stats"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 px-6"
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Learning Universe Analytics
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Interactive data visualization powered by AI
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <ChartAreaInteractive />
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        id="features"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 px-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20"
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI-Powered Learning Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Experience the future of personalized education with our intelligent learning companion
            </p>
          </div>
        </div>
      </motion.section>

      {/* Floating AI Learning Assistant Demo */}
      <DraggableWindow
        title="🚀 AI Learning Assistant"
        initialPosition={{ x: 50, y: 200 }}
        initialSize={{ width: 350, height: 400 }}
        className="z-40"
      >
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2 text-purple-600">
            <Brain className="w-5 h-5" />
            <span className="font-semibold">Learning Constellation Active</span>
          </div>
          <div className="space-y-2">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-3 rounded-lg">
              <p className="text-sm font-medium">🎯 Current Goal</p>
              <p className="text-xs text-muted-foreground">Master React Components</p>
              <Progress value={75} className="mt-2 h-2" />
            </div>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 p-3 rounded-lg">
              <p className="text-sm font-medium">⚡ Next Topic</p>
              <p className="text-xs text-muted-foreground">Advanced Hooks Patterns</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 p-3 rounded-lg">
              <p className="text-sm font-medium">🧠 AI Insight</p>
              <p className="text-xs text-muted-foreground">&ldquo;Focus on useState optimization for 2x faster learning&rdquo;</p>
            </div>
          </div>
          <Button 
            size="sm" 
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500" 
            onClick={() => handleNavigation("/dashboard")}
            disabled={isNavigating}
          >
            {isNavigating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <PlayCircle className="w-4 h-4 mr-2" />
            )}
            {isNavigating ? "Loading..." : "Continue Learning"}
          </Button>
        </div>
      </DraggableWindow>

      {/* Bottom Marquee */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white overflow-hidden">
        <div className="animate-marquee-reverse whitespace-nowrap py-2 text-sm font-medium">
          <span className="mx-8">🎓 Join the Learning Revolution</span>
          <span className="mx-8">💡 Discover Your Potential</span>
          <span className="mx-8">🌟 Master Skills Faster</span>
          <span className="mx-8">🚀 Launch Your Career</span>
          <span className="mx-8">📈 Track Your Progress</span>
          <span className="mx-8">🧭 Navigate Your Future</span>
          <span className="mx-8">🎓 Join the Learning Revolution</span>
          <span className="mx-8">💡 Discover Your Potential</span>
          <span className="mx-8">🌟 Master Skills Faster</span>
          <span className="mx-8">🚀 Launch Your Career</span>
          <span className="mx-8">📈 Track Your Progress</span>
          <span className="mx-8">🧭 Navigate Your Future</span>
        </div>
      </div>
    </div>
  );
}
