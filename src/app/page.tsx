'use client';

import Link from "next/link";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";
import { Separator } from "~/components/ui/separator";
import { Alert, AlertDescription } from "~/components/ui/alert";
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
import LoginButton from "~/components/LoginLogOutButton";
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
  ];  return (
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
                    <Link href="#features">Features</Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link href="#solution">Solution</Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link href="#stats">Stats</Link>
                  </Button>
                  <ThemeToggle />
                  <LoginButton />
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
                  <LoginButton />
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Constellation Hero Section */}
        <section className="relative overflow-hidden py-20 flex items-center justify-center">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-blue-300 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-purple-300 rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-blue-500 rounded-full animate-ping"></div>
          </div>

          <div className="container mx-auto px-6 py-16 text-center relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Constellation Logo */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-blue-600 flex items-center justify-center shadow-lg animate-pulse">
                    <Telescope className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center animate-bounce">
                    <Sparkles className="w-3 h-3 text-yellow-800" />
                  </div>
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-green-400 flex items-center justify-center animate-spin">
                    <Star className="w-2 h-2 text-green-800" />
                  </div>
                </div>
              </div>

              <Badge className="mb-4 bg-gradient-to-r from-blue-100 via-purple-100 to-blue-100 text-blue-800 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-blue-900/30 dark:text-blue-300 px-4 py-1 animate-pulse">
                <Navigation className="w-4 h-4 mr-2" />
                Navigate Your Learning Universe
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent leading-tight">
                <span className="block mb-2">Learnstellation</span>
                <span className="text-2xl md:text-3xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Your Personal Learning Galaxy
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                🌟 <strong>Chart your course</strong> through knowledge<br/>
                ⭐ <strong>Connect ideas</strong> with AI-powered roadmaps<br/>
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

              {/* Quick Stats Constellation */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {[
                  { icon: Users, number: "50K+", label: "Students", color: "text-blue-400" },
                  { icon: Target, number: "95%", label: "Success", color: "text-green-400" },
                  { icon: Award, number: "200+", label: "Skills", color: "text-purple-400" },
                  { icon: Clock, number: "12wks", label: "Mastery", color: "text-yellow-400" }
                ].map((stat, index) => (
                  <Card key={index} className="bg-background/50 backdrop-blur border border-white/20 hover:bg-background/70 transition-all duration-300 transform hover:scale-105">
                    <CardContent className="pt-4 pb-4 text-center">
                      <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                      <div className="text-xl font-bold">{stat.number}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Step 2: The Harsh Reality - Problems Section */}
        <section id="problems" className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-orange-500" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                But Reality Hits Hard...
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                <span className="font-semibold text-red-600 dark:text-red-400">89% of students struggle</span> with learning new skills. 
                Here&rsquo;s why traditional learning fails them:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {problemStats.map((problem, index) => (
                <Card key={index} className="border-2 border-red-200 dark:border-red-800/30 bg-red-50/50 dark:bg-red-900/10">
                  <CardHeader className="text-center pb-2">
                    <XCircle className="w-12 h-12 mx-auto mb-3 text-red-500" />
                    <CardTitle className="text-lg">{problem.issue}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Affected Students</span>
                        <span className="font-semibold text-red-600">{problem.percentage}%</span>
                      </div>
                      <Progress value={problem.percentage} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Big Problem Statement */}
            <Alert className="max-w-4xl mx-auto border-2 border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <AlertDescription className="text-lg font-medium">
                <span className="text-2xl font-bold text-red-700 dark:text-red-400 block mb-2">
                  THE BIGGEST PROBLEM: No Proper Roadmap
                </span>
                Students waste months jumping between random tutorials, courses, and resources without a clear, 
                personalized learning path. They get overwhelmed, lose motivation, and eventually give up on their dreams.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Step 3: The Student's Journey - Story Timeline */}
        <section id="story" className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Clock className="w-16 h-16 mx-auto mb-4 text-blue-500" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The Typical Student Journey</h2>
              <p className="text-xl text-muted-foreground">Follow Alex&rsquo;s story - a student just like you</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {[
                  {
                    step: 1,
                    title: "🎯 The Spark",
                    description: "Alex discovers an exciting new field - AI/ML - and dreams of becoming an expert",
                    emotion: "😍 Excited & Motivated",
                    time: "Day 1"
                  },
                  {
                    step: 2,
                    title: "🌊 Information Overload",
                    description: "Google search returns 50,000+ resources. YouTube has thousands of tutorials. Where to start?",
                    emotion: "😵 Overwhelmed & Confused",
                    time: "Day 3"
                  },
                  {
                    step: 3,
                    title: "📚 Random Learning",
                    description: "Starts with a random YouTube course, then jumps to a blog, then tries a different platform",
                    emotion: "🤔 Uncertain & Scattered",
                    time: "Week 2"
                  },
                  {
                    step: 4,
                    title: "🔄 Endless Loop",
                    description: "Restarts multiple times, never completing anything. No clear progress tracking",
                    emotion: "😤 Frustrated & Stuck",
                    time: "Month 1"
                  },
                  {
                    step: 5,
                    title: "⏰ Time Crunch",
                    description: "Realizes they've wasted weeks without real progress. Deadlines approaching",
                    emotion: "😰 Stressed & Anxious",
                    time: "Month 2"
                  },
                  {
                    step: 6,
                    title: "💔 The Breaking Point",
                    description: "Loses motivation completely. Feels like they're not 'smart enough' for this",
                    emotion: "😢 Defeated & Demotivated",
                    time: "Month 3"
                  },
                  {
                    step: 7,
                    title: "❌ The Quit",
                    description: "Gives up on the dream. Settles for something easier",
                    emotion: "😞 Resigned & Regretful",
                    time: "Month 4"
                  }
                ].map((story, index) => (
                  <div key={index} className="flex gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 text-white flex items-center justify-center font-bold text-lg">
                        {story.step}
                      </div>
                    </div>
                    <Card className="flex-1 border-l-4 border-l-red-400">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>{story.title}</span>
                          <Badge variant="outline">{story.time}</Badge>
                        </CardTitle>
                        <CardDescription className="text-base">{story.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-semibold">{story.emotion}</div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-12">
              <Card className="max-w-2xl mx-auto bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-4">
                    Sound Familiar? You&rsquo;re Not Alone.
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    Millions of students face this exact journey every day. But what if there was a better way?
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Step 4: Enter Learnstellation - The Hero */}
        <section id="solution" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Star className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-yellow-800" />
                  </div>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Introducing Learnstellation
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                The AI-powered learning platform that creates your personal constellation of knowledge, 
                guiding you from confusion to mastery with a clear, intelligent roadmap.
              </p>
            </div>

            {/* Alex's New Journey with Learnstellation */}
            <div className="max-w-4xl mx-auto mb-16">
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-2 border-green-300 dark:border-green-700">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-green-700 dark:text-green-400">Alex&rsquo;s New Journey with Learnstellation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      {
                        step: 1,
                        title: "🎯 Smart Goal Setting",
                        description: "Alex tells Learnstellation: 'I want to learn AI/ML for data science'",
                        result: "AI creates a personalized roadmap based on current skill level and goals",
                        time: "5 minutes"
                      },
                      {
                        step: 2,
                        title: "🗺️ Intelligent Roadmap",
                        description: "Gets a visual, step-by-step learning path with clear milestones",
                        result: "No more guesswork - knows exactly what to learn and when",
                        time: "Day 1"
                      },
                      {
                        step: 3,
                        title: "📚 Curated Content",
                        description: "AI recommends the best resources for each step",
                        result: "High-quality, relevant materials - no information overload",
                        time: "Ongoing"
                      },
                      {
                        step: 4,
                        title: "📊 Progress Tracking",
                        description: "Visual progress tracking with skill assessments",
                        result: "Clear sense of achievement and motivation to continue",
                        time: "Daily"
                      },
                      {
                        step: 5,
                        title: "🎓 Skill Mastery",
                        description: "Completes the roadmap with proven competency",
                        result: "Confident, job-ready skills in the target field",
                        time: "3 months"
                      }
                    ].map((story, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 text-white flex items-center justify-center font-bold">
                          {story.step}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1">{story.title}</h4>
                          <p className="text-muted-foreground mb-2">{story.description}</p>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-green-600 dark:text-green-400 font-medium">{story.result}</span>
                          </div>
                          <Badge variant="secondary" className="mt-2">{story.time}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Success Metrics */}
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { label: "Success Rate", value: "95%", icon: TrendingUp, color: "text-green-600" },
                { label: "Time Saved", value: "70%", icon: Clock, color: "text-blue-600" },
                { label: "Completion Rate", value: "87%", icon: Target, color: "text-purple-600" },
                { label: "Student Satisfaction", value: "4.9/5", icon: Star, color: "text-yellow-600" }
              ].map((metric, index) => (
                <Card key={index} className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur">
                  <CardContent className="pt-6">
                    <metric.icon className={`w-12 h-12 mx-auto mb-3 ${metric.color}`} />
                    <div className="text-3xl font-bold mb-2">{metric.value}</div>
                    <div className="text-muted-foreground">{metric.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Constellation Features Galaxy */}
        <section id="features" className="py-16 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
            <div className="absolute top-32 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-blue-300 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-purple-300 rounded-full animate-ping"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center animate-spin-slow">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center animate-bounce">
                    <Zap className="w-3 h-3 text-yellow-800" />
                  </div>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Feature Constellation
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Powerful features that make learning cosmic
              </p>
            </div>

            {/* Feature Constellation Grid */}
            <div className="grid lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: Brain,
                  title: "🧠 Neural Learning Paths",
                  description: "AI analyzes your learning DNA to create personalized constellation maps of knowledge",
                  features: ["Cognitive pattern analysis", "Adaptive learning algorithms", "Neural pathway optimization", "Synaptic knowledge linking"],
                  color: "from-blue-500 to-cyan-500",
                  bgColor: "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20"
                },
                {
                  icon: Telescope,
                  title: "🔭 Deep Content Discovery",
                  description: "Explore the universe of educational content with AI-powered curation and analysis",
                  features: ["PDF constellation mapping", "YouTube transcript galaxies", "Content quality scoring", "Knowledge graph navigation"],
                  color: "from-purple-500 to-pink-500",
                  bgColor: "from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20"
                },
                {
                  icon: Navigation,
                  title: "🧭 Progress Navigation",
                  description: "Chart your course through skill galaxies with real-time progress tracking",
                  features: ["Stellar progress mapping", "Skill constellation tracking", "Achievement orbit analysis", "Learning velocity metrics"],
                  color: "from-green-500 to-emerald-500",
                  bgColor: "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20"
                },
                {
                  icon: Users,
                  title: "👥 Learning Galaxy Community",
                  description: "Connect with fellow explorers in a vast network of knowledge seekers",
                  features: ["Peer constellation networks", "Study group formations", "Knowledge sharing orbits", "Collaborative learning systems"],
                  color: "from-orange-500 to-red-500",
                  bgColor: "from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20"
                },
                {
                  icon: Sparkles,
                  title: "✨ Multi-Dimensional Learning",
                  description: "Experience education across multiple dimensions with interactive cosmic content",
                  features: ["3D knowledge structures", "Interactive learning universes", "Immersive skill journeys", "Holographic assessments"],
                  color: "from-yellow-500 to-orange-500",
                  bgColor: "from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20"
                },
                {
                  icon: Rocket,
                  title: "🚀 Career Launch Pad",
                  description: "Prepare for professional liftoff with industry-aligned skill constellations",
                  features: ["Career trajectory mapping", "Industry skill alignment", "Professional orbit planning", "Launch readiness metrics"],
                  color: "from-violet-500 to-purple-500",
                  bgColor: "from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20"
                }
              ].map((feature, index) => (
                <Card 
                  key={index} 
                  className={`relative overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-102 bg-gradient-to-br ${feature.bgColor} border border-white/20 backdrop-blur group cursor-pointer`}
                >
                  {/* Floating animation elements */}
                  <div className="absolute top-2 right-2 w-1 h-1 bg-white/30 rounded-full animate-ping group-hover:animate-bounce"></div>
                  
                  <CardHeader className="relative z-10 pb-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 shadow-md transform group-hover:rotate-6 transition-transform duration-300`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10 pt-0">
                    <ul className="space-y-2">
                      {feature.features.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 group/item">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-xs font-medium group-hover/item:text-foreground transition-colors duration-200">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Interactive Feature Demo */}
            <Card className="max-w-3xl mx-auto bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-blue-950/20 border border-blue-200 dark:border-blue-800/50 shadow-lg">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-3">
                  <Activity className="w-8 h-8 text-blue-500" />
                  Live Learning Demonstration
                </CardTitle>
                <CardDescription className="text-lg">
                  Watch how Learnstellation creates your personalized learning galaxy in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Bar Chart showing learning progress */}
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { skill: 'Python', progress: 85, target: 100 },
                        { skill: 'React', progress: 92, target: 100 },
                        { skill: 'AI/ML', progress: 67, target: 100 },
                        { skill: 'Data Science', progress: 78, target: 100 },
                        { skill: 'Design', progress: 54, target: 100 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="skill" className="text-sm" />
                        <YAxis className="text-sm" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255,255,255,0.95)', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                          }} 
                        />
                        <Bar dataKey="progress" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="target" fill="#e5e7eb" radius={[4, 4, 0, 0]} opacity={0.3} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Feature highlights */}
                  <div className="space-y-6">
                    {[
                      { 
                        title: "Adaptive Learning Engine", 
                        description: "AI adjusts difficulty and pacing based on your progress constellation",
                        icon: Brain,
                        color: "text-blue-500"
                      },
                      { 
                        title: "Skill Gap Analysis", 
                        description: "Identifies knowledge voids in your learning universe and fills them strategically",
                        icon: Target,
                        color: "text-green-500"
                      },
                      { 
                        title: "Progress Prediction", 
                        description: "Forecasts your learning trajectory using cosmic data analytics",
                        icon: TrendingUp,
                        color: "text-purple-500"
                      }
                    ].map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur border border-white/20">
                        <highlight.icon className={`w-6 h-6 ${highlight.color} mt-1 flex-shrink-0`} />
                        <div>
                          <h4 className="font-semibold text-lg mb-1">{highlight.title}</h4>
                          <p className="text-sm text-muted-foreground">{highlight.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Step 6: Statistics & Proof */}
        <section id="stats" className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-purple-500" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Proven Results</h2>
              <p className="text-xl text-muted-foreground">Real data from real students who transformed their learning</p>
            </div>

            {/* Main Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50">
                <CardContent className="pt-6">
                  <Users className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                  <div className="text-4xl font-bold text-blue-600 mb-2">{learningStats.totalStudents.toLocaleString()}+</div>
                  <div className="text-muted-foreground">Active Learners</div>
                </CardContent>
              </Card>

              <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50">
                <CardContent className="pt-6">
                  <Target className="w-12 h-12 mx-auto mb-3 text-green-600" />
                  <div className="text-4xl font-bold text-green-600 mb-2">{learningStats.completionRate}%</div>
                  <div className="text-muted-foreground">Completion Rate</div>
                  <Progress value={learningStats.completionRate} className="mt-3 h-2" />
                </CardContent>
              </Card>

              <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50">
                <CardContent className="pt-6">
                  <Clock className="w-12 h-12 mx-auto mb-3 text-purple-600" />
                  <div className="text-4xl font-bold text-purple-600 mb-2">{learningStats.avgTimeToSkill}</div>
                  <div className="text-muted-foreground">Weeks to Skill Mastery</div>
                  <div className="text-sm text-purple-600 mt-2">vs 36 weeks traditional</div>
                </CardContent>
              </Card>

              <Card className="text-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50">
                <CardContent className="pt-6">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 text-orange-600" />
                  <div className="text-4xl font-bold text-orange-600 mb-2">{learningStats.skillsOffered}+</div>
                  <div className="text-muted-foreground">Skills & Topics</div>
                </CardContent>
              </Card>
            </div>

            {/* Comparison Chart */}
            <div className="max-w-4xl mx-auto">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-center text-2xl">Traditional Learning vs Learnstellation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-red-600 flex items-center gap-2">
                        <XCircle className="w-6 h-6" />
                        Traditional Learning
                      </h3>
                      {[
                        { metric: "Time to Competency", value: "36 weeks", progress: 25 },
                        { metric: "Completion Rate", value: "23%", progress: 23 },
                        { metric: "Student Satisfaction", value: "2.1/5", progress: 42 },
                        { metric: "Clear Direction", value: "11%", progress: 11 }
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <span>{item.metric}</span>
                            <span className="font-semibold text-red-600">{item.value}</span>
                          </div>
                          <Progress value={item.progress} className="h-2" />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-green-600 flex items-center gap-2">
                        <CheckCircle className="w-6 h-6" />
                        Learnstellation
                      </h3>
                      {[
                        { metric: "Time to Competency", value: "12 weeks", progress: 75 },
                        { metric: "Completion Rate", value: "87%", progress: 87 },
                        { metric: "Student Satisfaction", value: "4.9/5", progress: 98 },
                        { metric: "Clear Direction", value: "95%", progress: 95 }
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <span>{item.metric}</span>
                            <span className="font-semibold text-green-600">{item.value}</span>
                          </div>
                          <Progress value={item.progress} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Step 7: Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Star className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
              <p className="text-xl text-muted-foreground">Real students, real transformations</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {([
                {
                  name: "Sarah Chen",
                  role: "Career Switcher",
                  story: "From marketing to data science in 4 months. Learnstellation's roadmap gave me the confidence to make the leap.",
                  achievement: "Landed ML Engineer role at tech startup",
                  rating: 5
                },
                {
                  name: "Marcus Johnson", 
                  role: "University Student",
                  story: "Finally understood complex topics that confused me for months. The personalized approach made all the difference.",
                  achievement: "Improved GPA from 2.8 to 3.7",
                  rating: 5
                },
                {
                  name: "Priya Patel",
                  role: "Working Professional",
                  story: "Balanced learning with a full-time job. The smart scheduling and bite-sized lessons were perfect.",
                  achievement: "Promoted to Senior Developer",
                  rating: 5
                }
              ] as const).map((testimonial, index) => (
                <Card key={index} className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }, (_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-lg mb-4 italic">&ldquo;{testimonial.story}&rdquo;</blockquote>
                    <div className="mt-auto">
                      <Badge className="mb-2 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        {testimonial.achievement}
                      </Badge>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Step 8: Call to Action - Your Journey Starts Now */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <Rocket className="w-20 h-20 mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Your Learning Journey Starts Now
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Join 50,000+ students who chose success over struggle. 
                Get your personalized learning roadmap in under 5 minutes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-12 py-6">
                  <Link href="/signup">
                    <Star className="w-5 h-5 mr-2" />
                    Start Free Today
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-12 py-6">
                  <Link href="/library">
                    <PlayCircle className="w-5 h-5 mr-2" />
                    See Demo
                  </Link>
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <CheckCircle className="w-8 h-8 mb-2" />
                  <div className="font-semibold">Free to Start</div>
                  <div className="opacity-75">No credit card required</div>
                </div>
                <div className="flex flex-col items-center">
                  <CheckCircle className="w-8 h-8 mb-2" />
                  <div className="font-semibold">Instant Setup</div>
                  <div className="opacity-75">Get your roadmap in 5 minutes</div>
                </div>
                <div className="flex flex-col items-center">
                  <CheckCircle className="w-8 h-8 mb-2" />
                  <div className="font-semibold">Proven Results</div>
                  <div className="opacity-75">87% completion rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Constellation Data Charts */}
        <section id="constellation-stats" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <BarChart3 className="w-12 h-12 text-blue-500 animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center animate-bounce">
                    <Star className="w-2 h-2 text-yellow-800" />
                  </div>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Learning Universe Analytics
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Data constellation powering personalized learning
              </p>
            </div>

            {/* Interactive Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-6 mb-12">
              {/* Learning Progress Area Chart */}
              <Card className="p-4 hover:shadow-lg transition-all duration-300 border border-blue-200 dark:border-blue-800/50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-blue-600 text-lg">
                    <Activity className="w-5 h-5" />
                    Learning Velocity
                  </CardTitle>
                  <CardDescription className="text-sm">Progress acceleration with Learnstellation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { month: 'Week 1', traditional: 10, learnstellation: 25 },
                        { month: 'Week 2', traditional: 15, learnstellation: 45 },
                        { month: 'Week 3', traditional: 20, learnstellation: 65 },
                        { month: 'Week 4', traditional: 25, learnstellation: 80 },
                        { month: 'Week 8', traditional: 35, learnstellation: 95 },
                        { month: 'Week 12', traditional: 40, learnstellation: 100 },
                      ]}>
                        <defs>
                          <linearGradient id="learnstellationGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="traditionalGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="month" className="text-sm" />
                        <YAxis className="text-sm" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255,255,255,0.95)', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                          }} 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="traditional" 
                          stroke="#ef4444" 
                          fillOpacity={1} 
                          fill="url(#traditionalGradient)"
                          name="Traditional Learning"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="learnstellation" 
                          stroke="#3b82f6" 
                          fillOpacity={1} 
                          fill="url(#learnstellationGradient)"
                          name="Learnstellation"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Skill Mastery Radial Chart */}
              <Card className="p-4 hover:shadow-lg transition-all duration-300 border border-purple-200 dark:border-purple-800/50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-purple-600 text-lg">
                    <Target className="w-5 h-5" />
                    Skill Constellation
                  </CardTitle>
                  <CardDescription className="text-sm">Mastery levels across skill domains</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={[
                        { name: 'AI/ML', value: 95, fill: '#3b82f6' },
                        { name: 'Data Science', value: 87, fill: '#8b5cf6' },
                        { name: 'Programming', value: 92, fill: '#06b6d4' },
                        { name: 'Web Dev', value: 89, fill: '#10b981' },
                        { name: 'Design', value: 76, fill: '#f59e0b' },
                      ]}>
                        <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255,255,255,0.95)', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                          }} 
                        />
                        <Legend />
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Learning Calendar & Timeline */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Learning Calendar */}
              <Card className="p-4 hover:shadow-lg transition-all duration-300 border border-green-200 dark:border-green-800/50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-green-600 text-lg">
                    <MapPin className="w-5 h-5" />
                    Learning Calendar
                  </CardTitle>
                  <CardDescription className="text-sm">Your personalized schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border-0 scale-90"
                  />
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>Study Sessions</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>Assessments</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span>Milestones</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Success Metrics */}
              <Card className="p-4 hover:shadow-lg transition-all duration-300 border border-yellow-200 dark:border-yellow-800/50 lg:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-yellow-600 text-lg">
                    <PieChartIcon className="w-5 h-5" />
                    Student Success Constellation
                  </CardTitle>
                  <CardDescription className="text-sm">Real outcomes from our learning universe</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Pie Chart */}
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Career Advancement', value: 45, fill: '#3b82f6' },
                              { name: 'Skill Mastery', value: 30, fill: '#8b5cf6' },
                              { name: 'Academic Success', value: 15, fill: '#10b981' },
                              { name: 'Personal Growth', value: 10, fill: '#f59e0b' },
                            ]}
                            cx="50%"
                            cy="50%"
                            outerRadius={60}
                            dataKey="value"
                            label={({value}) => `${value}%`}
                          >
                            {[
                              { name: 'Career Advancement', value: 45, fill: '#3b82f6' },
                              { name: 'Skill Mastery', value: 30, fill: '#8b5cf6' },
                              { name: 'Academic Success', value: 15, fill: '#10b981' },
                              { name: 'Personal Growth', value: 10, fill: '#f59e0b' },
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Metrics Grid */}
                    <div className="space-y-3">
                      {[
                        { label: "Learning Acceleration", value: "3.2x faster", icon: Rocket, color: "text-blue-500" },
                        { label: "Knowledge Retention", value: "94% better", icon: Brain, color: "text-purple-500" },
                        { label: "Goal Achievement", value: "87% success", icon: Target, color: "text-green-500" },
                        { label: "Student Satisfaction", value: "4.9/5 stars", icon: Star, color: "text-yellow-500" }
                      ].map((metric, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-background/50 backdrop-blur">
                          <metric.icon className={`w-6 h-6 ${metric.color}`} />
                          <div>
                            <div className="font-semibold text-sm">{metric.label}</div>
                            <div className="text-lg font-bold">{metric.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Star className="h-3 w-3 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Learnstellation
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Transforming learning from chaos to clarity, one student at a time.
              </p>
              <Separator className="my-4" />
              <div className="text-xs text-muted-foreground">
                <p className="mb-1">
                  <strong>Created by:</strong> Dev Agnihotri
                </p>
                <p>
                  Built with ❤️ using Next.js, AI, and the belief that every student deserves success.
                </p>
              </div>
            </div>
          </div>
        </footer>

        {/* Bottom Infinite Marquee */}
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
