'use client';

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";
import { Calendar } from "~/components/ui/calendar";
import { 
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  Legend
} from "recharts";
import { 
  BookOpen, 
  Brain, 
  Target, 
  Zap, 
  Star, 
  TrendingUp, 
  Users, 
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Rocket,
  Globe,
  PlayCircle,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Award,
  Sparkles,
  Navigation,
  Telescope,
  MapPin
} from "lucide-react";
import ThemeToggle from "~/components/ThemeToggle";

export default function Home() {
  const [user] = useState<{ email?: string } | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock data for charts and statistics
  const learningStats = {
    totalStudents: 50000,
    completionRate: 87,
    avgTimeToSkill: 12,
    skillsOffered: 200
  };

  const problemStats = [
    { issue: "No Clear Roadmap", percentage: 89 },
    { issue: "Information Overload", percentage: 76 },
    { issue: "Lack of Personalization", percentage: 82 },
    { issue: "Time Management", percentage: 71 }
  ];
  
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
          <div className="hidden md:flex items-center space-x-6">
            {!user ? (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/library">Roadmap Learning</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/dashboard">Single Document</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="#features">Features</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="#stats">Stats</Link>
                </Button>
                <ThemeToggle />
                <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Link href="/signup">Start Learning</Link>
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-muted-foreground">Welcome, {user.email}</span>
                <Button variant="ghost" asChild>
                  <Link href="/library">Roadmap Learning</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/dashboard">Single Document</Link>
                </Button>
                <ThemeToggle />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 flex items-center justify-center">
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
                  asChild 
                  className="bg-gradient-to-r from-blue-500 via-purple-600 to-blue-700 hover:from-blue-600 hover:via-purple-700 hover:to-blue-800 text-white px-8 py-6 shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <Link href="/signup">
                    <Rocket className="w-4 h-4 mr-2" />
                    Launch Your Journey
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="default" 
                  asChild 
                  className="border-2 border-purple-400 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/20 px-8 py-6 transform hover:scale-105 transition-all duration-300"
                >
                  <Link href="#constellation-stats">
                    <Telescope className="w-4 h-4 mr-2" />
                    Explore Universe
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
