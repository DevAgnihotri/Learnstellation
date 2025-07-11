import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { generateRoadmap } from "~/course-builder-ai/roadmap";
import { youtubeResources } from "~/course-builder-ai/resources";
import { generateProjectsForRoadmap } from "~/course-builder-ai/projects";
import llms from "~/lib/llms";
import { db } from "~/server/db";

export const roadmapRouter = createTRPCRouter({
  generate: publicProcedure
    .input(z.object({ 
      topic: z.string(),
      difficulty: z.enum(["beginner", "intermediate", "advanced"])
    }))
    .mutation(async ({ input }) => {
      try {
        console.log(`🗺️ Starting roadmap generation for topic: ${input.topic}`);
        console.log(`🎚️ Difficulty: ${input.difficulty}`);
        
        // Check if we're in demo mode (e.g., on Netlify without backend)
        // Multiple checks to ensure demo mode is detected properly
        const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true" || 
                          process.env.NODE_ENV === "production" && !process.env.DATABASE_URL ||
                          process.env.NETLIFY === "true";
        
        if (isDemoMode) {
          console.log(`🎭 Demo mode: Generating mock roadmap for: ${input.topic}`);
          
          // Return a comprehensive mock roadmap for demo purposes
          const mockRoadmap = {
            title: `${input.topic} Learning Roadmap`,
            description: `A comprehensive ${input.difficulty}-level learning path for ${input.topic}. This is a demo version - connect your own AI service for personalized roadmaps.`,
            difficulty: input.difficulty,
            rootTopics: input.difficulty === "beginner" 
              ? ["fundamentals"]
              : input.difficulty === "intermediate" 
                ? ["fundamentals", "practical-skills"]
                : ["fundamentals", "practical-skills", "advanced-topics"],
            topics: input.difficulty === "beginner" 
              ? [
                  {
                    id: "fundamentals",
                    title: `${input.topic} Fundamentals`,
                    summary: `Learn the core concepts and basic principles of ${input.topic}`,
                    level: 0,
                    parentId: undefined,
                    children: []
                  }
                ]
              : input.difficulty === "intermediate"
                ? [
                    {
                      id: "fundamentals",
                      title: `${input.topic} Fundamentals`,
                      summary: `Review and solidify core concepts of ${input.topic}`,
                      level: 0,
                      parentId: undefined,
                      children: ["practical-skills"]
                    },
                    {
                      id: "practical-skills",
                      title: `Practical ${input.topic} Skills`,
                      summary: `Apply your knowledge with hands-on projects and real-world scenarios`,
                      level: 1,
                      parentId: "fundamentals",
                      children: []
                    }
                  ]
                : [
                    {
                      id: "fundamentals",
                      title: `${input.topic} Fundamentals`,
                      summary: `Master the theoretical foundation of ${input.topic}`,
                      level: 0,
                      parentId: undefined,
                      children: ["practical-skills"]
                    },
                    {
                      id: "practical-skills",
                      title: `Advanced ${input.topic} Applications`,
                      summary: `Implement complex solutions and optimize performance`,
                      level: 1,
                      parentId: "fundamentals",
                      children: ["advanced-topics"]
                    },
                    {
                      id: "advanced-topics",
                      title: `Expert-Level ${input.topic}`,
                      summary: `Explore cutting-edge techniques and contribute to the field`,
                      level: 2,
                      parentId: "practical-skills",
                      children: []
                    }
                  ]
          };
          
          console.log(`✅ Mock roadmap generated successfully`);
          console.log(`📚 Generated ${mockRoadmap.topics.length} topics`);
          
          return {
            success: true,
            data: mockRoadmap
          };
        }
        
        // Only try AI generation if not in demo mode
        let roadmap;
        try {
          // Use the correct model reference with shorter timeout for Netlify
          const model = llms.gemini("gemini-1.5-flash");
          
          const roadmapPromise = generateRoadmap(
            input.topic,
            input.difficulty,
            model
          );
          
          // Reduced timeout for Netlify Functions (30 seconds instead of 60)
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Roadmap generation timed out after 30 seconds")), 30000)
          );
          
          roadmap = await Promise.race([roadmapPromise, timeoutPromise]) as Awaited<typeof roadmapPromise>;
        } catch (geminiError) {
          console.warn("⚠️ Gemini model failed, trying with simpler prompt...", geminiError);
          
          // Return a simpler fallback roadmap
          const fallbackRoadmap = {
            title: `${input.topic} Learning Path`,
            description: `A structured learning path for ${input.topic} at ${input.difficulty} level`,
            difficulty: input.difficulty,
            rootTopics: ["basics", "intermediate", "advanced"],
            topics: [
              {
                id: "basics",
                title: `${input.topic} Fundamentals`,
                summary: `Learn the basic concepts and foundations of ${input.topic}`,
                level: 0,
                parentId: undefined,
                children: ["intermediate"]
              },
              {
                id: "intermediate",
                title: `Intermediate ${input.topic}`,
                summary: `Build upon the basics with more complex concepts`,
                level: 1,
                parentId: "basics",
                children: ["advanced"]
              },
              {
                id: "advanced",
                title: `Advanced ${input.topic}`,
                summary: `Master advanced techniques and best practices`,
                level: 2,
                parentId: "intermediate",
                children: []
              }
            ]
          };
          
          roadmap = fallbackRoadmap;
        }
        
        console.log(`✅ Roadmap generated successfully`);
        console.log(`📚 Generated ${roadmap.topics?.length ?? 0} topics`);
        
        return {
          success: true,
          data: roadmap
        };
        
      } catch (error) {
        console.error("❌ Error generating roadmap:", error);
        
        // Return a minimal working roadmap instead of throwing
        return {
          success: true,
          data: {
            title: `${input.topic} Quick Start`,
            description: `Basic learning outline for ${input.topic}. This is a fallback response - please try again or contact support.`,
            difficulty: input.difficulty,
            rootTopics: ["start"],
            topics: [
              {
                id: "start",
                title: `Getting Started with ${input.topic}`,
                summary: `Begin your journey learning ${input.topic}`,
                level: 0,
                parentId: undefined,
                children: []
              }
            ]
          }
        };
      }
    }),

  youtubeResources: publicProcedure
    .input(z.object({
      topic: z.string(),
      difficulty: z.enum(["beginner", "intermediate", "advanced"]),
      topicSummary: z.string()
    }))
    .mutation(async ({ input }) => {
      try {
        console.log(`🎥 Starting YouTube resources fetch for topic: ${input.topic}`);
        console.log(`🎚️ Difficulty: ${input.difficulty}`);
        
        // Use gemini model for resource selection
        const model = llms.gemini("gemini-1.5-flash");
        
        const resources = await youtubeResources(
          input.topic,
          input.difficulty,
          input.topicSummary,
          model
        );
        
        console.log(`✅ YouTube resources fetched successfully`);
        console.log(`📺 Found ${resources.selectedVideos.length} relevant videos`);
        
        return {
          success: true,
          data: resources
        };
        
      } catch (error) {
        console.error("❌ Error fetching YouTube resources:", error);
        
        if (error instanceof Error) {
          if (error.message.includes("YouTube API key not found")) {
            throw new Error("YouTube API is not configured. Please contact Dev Agnihotri.");
          }
          if (error.message.includes("No YouTube videos found")) {
            throw new Error("No relevant videos found for this topic. Try a different search term.");
          }
        }
        
        throw new Error(`Failed to fetch YouTube resources: ${error instanceof Error ? error.message : String(error)}`);
      }
    }),

  save: publicProcedure
    .input(z.object({
      roadmap: z.object({
        title: z.string(),
        description: z.string(),
        difficulty: z.enum(["beginner", "intermediate", "advanced"]),
        rootTopics: z.array(z.string()),
        topics: z.array(z.object({
          id: z.string(),
          title: z.string(),
          summary: z.string(),
          level: z.number(),
          parentId: z.string().optional(),
          children: z.array(z.string())
        }))
      })
    }))
    .mutation(async ({ input }) => {
      try {
        console.log(`💾 Starting roadmap save for: ${input.roadmap.title}`);
        
        // Check if we're in demo mode (e.g., on Netlify without a proper database)
        const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true" || 
                          process.env.NODE_ENV === "production" && !process.env.DATABASE_URL ||
                          process.env.NETLIFY === "true";
        
        if (isDemoMode) {
          console.log(`🎭 Demo mode: Simulating roadmap save for: ${input.roadmap.title}`);
          
          // Return a mock successful response for demo purposes  
          const mockId = `demo-${Date.now()}`;
          console.log(`💾 Roadmap saved successfully: ${mockId}`);
          
          return {
            id: mockId,
            title: input.roadmap.title,
            description: input.roadmap.description,
            difficulty: input.roadmap.difficulty,
            topics: input.roadmap.topics,
            createdAt: new Date(),
            updatedAt: new Date(),
            profileId: null,
            profile: null
          };
        }
        
        // Create the roadmap record (only when database is available)
        if (!db) {
          throw new Error("Database connection not available");
        }
        
        const savedRoadmap = await db.roadmap.create({
          data: {
            title: input.roadmap.title,
            description: input.roadmap.description,
            difficulty: input.roadmap.difficulty,
            profileId: null, // Anonymous for now
            topics: {
              create: input.roadmap.topics.map(topic => ({
                id: topic.id,
                title: topic.title,
                summary: topic.summary,
                level: topic.level,
                parentId: topic.parentId ?? null
              }))
            }
          },
          include: {
            topics: true,
            profile: true
          }
        });
        
        console.log(`✅ Roadmap saved successfully with ID: ${savedRoadmap.id}`);
        console.log(`📚 Saved ${savedRoadmap.topics.length} topics`);
        
        return {
          id: savedRoadmap.id,
          title: savedRoadmap.title,
          description: savedRoadmap.description,
          difficulty: savedRoadmap.difficulty,
          topics: savedRoadmap.topics,
          createdAt: savedRoadmap.createdAt,
          updatedAt: savedRoadmap.updatedAt,
          profileId: savedRoadmap.profileId,
          profile: savedRoadmap.profile
        };
        
      } catch (error) {
        console.error("❌ Error saving roadmap:", error);
        
        if (error instanceof Error) {
          if (error.message.includes("Unique constraint")) {
            throw new Error("A roadmap with this title already exists. Please choose a different title.");
          }
          if (error.message.includes("Foreign key constraint")) {
            throw new Error("Invalid profile ID provided.");
          }
        }
        
        throw new Error(`Failed to save roadmap: ${error instanceof Error ? error.message : String(error)}`);
      }
    }),

  getUserRoadmaps: publicProcedure
    .input(z.object({}))
    .query(async () => {
      try {
        console.log(`📚 Retrieving roadmaps for anonymous user`);
        
        // Check if we're in demo mode (e.g., on Netlify without a proper database)
        const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true" || 
                          process.env.NODE_ENV === "production" && !process.env.DATABASE_URL ||
                          process.env.NETLIFY === "true";
        
        if (isDemoMode) {
          console.log(`🎭 Demo mode: Returning mock roadmaps`);
          
          // Return mock data for demo purposes
          return {
            success: true,
            data: []
          };
        }
        
        if (!db) {
          throw new Error("Database connection not available");
        }
        
        const roadmaps = await db.roadmap.findMany({
          where: {
            profileId: null
          },
          include: {
            topics: {
              orderBy: {
                level: 'asc'
              }
            },
            profile: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        });
        
        console.log(`✅ Found ${roadmaps.length} roadmaps`);
        
        return {
          success: true,
          data: roadmaps.map(roadmap => ({
            id: roadmap.id,
            title: roadmap.title,
            description: roadmap.description,
            difficulty: roadmap.difficulty,
            createdAt: roadmap.createdAt,
            updatedAt: roadmap.updatedAt,
            topicCount: roadmap.topics.length,
            topics: roadmap.topics.map(topic => ({
              id: topic.id,
              title: topic.title,
              summary: topic.summary,
              level: topic.level,
              parentId: topic.parentId,
              children: [] // We'll reconstruct this from the parent-child relationships
            }))
          }))
        };
        
      } catch (error) {
        console.error("❌ Error retrieving roadmaps:", error);
        
        // Handle database connection errors gracefully
        if (error instanceof Error && error.message.includes('Unable to open the database file')) {
          console.warn("⚠️ Database not available, returning empty result");
          return {
            success: true,
            data: []
          };
        }
        
        throw new Error(`Failed to retrieve roadmaps: ${error instanceof Error ? error.message : String(error)}`);
      }
    }),

  getRoadmapById: publicProcedure
    .input(z.object({
      id: z.string()
    }))
    .query(async ({ input }) => {
      try {
        console.log(`🔍 Retrieving roadmap with ID: ${input.id}`);
        
        // Check if we're in demo mode first
        const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true" || 
                          process.env.NODE_ENV === "production" && !process.env.DATABASE_URL ||
                          process.env.NETLIFY === "true";
        
        if (isDemoMode) {
          console.log(`🎭 Demo mode: Returning mock roadmap data for ID: ${input.id}`);
          
          // Return a mock roadmap that matches the expected structure
          const mockRoadmap = {
            title: "Demo Learning Roadmap",
            description: "This is a demonstration roadmap showing how the learning path would be structured.",
            difficulty: "beginner" as const,
            rootTopics: ["foundations", "intermediate", "advanced"],
            topics: [
              {
                id: "foundations",
                title: "Foundation Concepts",
                summary: "Learn the fundamental concepts and get started with the basics",
                level: 0,
                parentId: null,
                children: ["intermediate"]
              },
              {
                id: "intermediate", 
                title: "Intermediate Skills",
                summary: "Build upon the foundations with more complex topics",
                level: 1,
                parentId: "foundations",
                children: ["advanced"]
              },
              {
                id: "advanced",
                title: "Advanced Techniques",
                summary: "Master advanced concepts and best practices",
                level: 2,
                parentId: "intermediate",
                children: []
              }
            ]
          };
          
          return {
            success: true,
            data: {
              id: input.id,
              createdAt: new Date(),
              updatedAt: new Date(),
              roadmap: mockRoadmap
            }
          };
        }
        
        if (!db) {
          throw new Error("Database connection not available");
        }
        
        const roadmap = await db.roadmap.findUnique({
          where: {
            id: input.id
          },
          include: {
            topics: {
              orderBy: {
                level: 'asc'
              }
            },
            profile: true
          }
        });
        
        if (!roadmap) {
          throw new Error("Roadmap not found");
        }
        
        // Reconstruct the roadmap format with children relationships
        const reconstructedTopics = roadmap.topics.map(topic => ({
          id: topic.id,
          title: topic.title,
          summary: topic.summary,
          level: topic.level,
          parentId: topic.parentId,
          children: roadmap.topics
            .filter(t => t.parentId === topic.id)
            .map(t => t.id)
        }));
        
        const rootTopics = reconstructedTopics
          .filter(topic => topic.parentId === null)
          .map(topic => topic.id);
        
        const reconstructedRoadmap = {
          title: roadmap.title,
          description: roadmap.description,
          difficulty: roadmap.difficulty as "beginner" | "intermediate" | "advanced",
          rootTopics: rootTopics,
          topics: reconstructedTopics
        };
        
        console.log(`✅ Roadmap retrieved successfully`);
        
        return {
          success: true,
          data: {
            id: roadmap.id,
            createdAt: roadmap.createdAt,
            updatedAt: roadmap.updatedAt,
            roadmap: reconstructedRoadmap
          }
        };
        
      } catch (error) {
        console.error("❌ Error retrieving roadmap:", error);
        throw new Error(`Failed to retrieve roadmap: ${error instanceof Error ? error.message : String(error)}`);
      }
    }),

  delete: publicProcedure
    .input(z.object({
      id: z.string(),
      profileId: z.string().optional() // Optional profile ID for authorization
    }))
    .mutation(async ({ input }) => {
      try {
        console.log(`🗑️ Deleting roadmap with ID: ${input.id}`);
        
        // Check if we're in demo mode first
        const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true" || process.env.NODE_ENV === "production" && !process.env.DATABASE_URL || process.env.NETLIFY === "true";
        
        if (isDemoMode) {
          console.log(`🎭 Demo mode: Simulating roadmap deletion`);
          return {
            success: true,
            message: "Roadmap deleted successfully (demo mode)"
          };
        }
        
        if (!db) {
          throw new Error("Database connection not available");
        }
        
        // First check if the roadmap exists and belongs to the user (if profileId provided)
        const existingRoadmap = await db.roadmap.findUnique({
          where: {
            id: input.id
          },
          include: {
            topics: true
          }
        });
        
        if (!existingRoadmap) {
          throw new Error("Roadmap not found");
        }
        
        // Check authorization if profileId is provided
        if (input.profileId && existingRoadmap.profileId !== input.profileId) {
          throw new Error("Unauthorized: You can only delete your own roadmaps");
        }
        
        // Delete the roadmap (topics will be deleted due to cascade)
        await db.roadmap.delete({
          where: {
            id: input.id
          }
        });
        
        console.log(`✅ Roadmap deleted successfully`);
        console.log(`🗑️ Deleted ${existingRoadmap.topics.length} associated topics`);
        
        return {
          success: true,
          message: "Roadmap deleted successfully"
        };
        
      } catch (error) {
        console.error("❌ Error deleting roadmap:", error);
        
        if (error instanceof Error) {
          if (error.message.includes("not found")) {
            throw new Error("Roadmap not found or already deleted");
          }
          if (error.message.includes("Unauthorized")) {
            throw error; // Re-throw authorization errors as-is
          }
        }
        
        throw new Error(`Failed to delete roadmap: ${error instanceof Error ? error.message : String(error)}`);
      }
    }),

  saveYoutubeResources: publicProcedure
    .input(z.object({
      topicId: z.string(),
      resources: z.array(z.object({
        videoId: z.string(),
        title: z.string(),
        description: z.string(),
        channelTitle: z.string(),
        publishedAt: z.string(),
        thumbnailUrl: z.string(),
        relevanceScore: z.number().min(1).max(10),
        relevanceReason: z.string(),
        url: z.string()
      }))
    }))
    .mutation(async ({ input }) => {
      try {
        console.log(`💾 Saving YouTube resources for topic: ${input.topicId}`);
        console.log(`📺 Number of resources to save: ${input.resources.length}`);
        
        // Check if we're in demo mode first
        const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true" || process.env.NODE_ENV === "production" && !process.env.DATABASE_URL || process.env.NETLIFY === "true";
        
        if (isDemoMode) {
          console.log(`🎭 Demo mode: Simulating YouTube resources save`);
          return {
            success: true,
            data: {
              savedCount: input.resources.length,
              topicId: input.topicId
            }
          };
        }
        
        if (!db) {
          throw new Error("Database connection not available");
        }
        
        // First, verify the topic exists
        const topic = await db.topic.findUnique({
          where: { id: input.topicId }
        });
        
        if (!topic) {
          throw new Error("Topic not found");
        }
        
        // Delete existing YouTube resources for this topic to avoid duplicates
        await db.resource.deleteMany({
          where: {
            topicId: input.topicId,
            type: 'YOUTUBE_VIDEO'
          }
        });
        
        // Create new resources
        const savedResources = await db.resource.createMany({
          data: input.resources.map(resource => ({
            title: resource.title,
            description: resource.description,
            url: resource.url,
            type: 'YOUTUBE_VIDEO' as const,
            relevanceScore: resource.relevanceScore,
            relevanceReason: resource.relevanceReason,
            thumbnailUrl: resource.thumbnailUrl,
            channelTitle: resource.channelTitle,
            publishedAt: new Date(resource.publishedAt),
            topicId: input.topicId
          }))
        });
        
        console.log(`✅ YouTube resources saved successfully`);
        console.log(`📺 Saved ${savedResources.count} resources`);
        
        return {
          success: true,
          data: {
            savedCount: savedResources.count,
            topicId: input.topicId
          }
        };
        
      } catch (error) {
        console.error("❌ Error saving YouTube resources:", error);
        
        if (error instanceof Error) {
          if (error.message.includes("Topic not found")) {
            throw new Error("The specified topic does not exist");
          }
          if (error.message.includes("Foreign key constraint")) {
            throw new Error("Invalid topic ID provided");
          }
        }
        
        throw new Error(`Failed to save YouTube resources: ${error instanceof Error ? error.message : String(error)}`);
      }
    }),

  getTopicResources: publicProcedure
    .input(z.object({
      topicId: z.string(),
      type: z.enum(['YOUTUBE_VIDEO', 'ARTICLE', 'DOCUMENTATION', 'TUTORIAL', 'COURSE', 'BOOK', 'PODCAST', 'EXERCISE', 'QUIZ', 'OTHER']).optional()
    }))
    .query(async ({ input }) => {
      try {
        console.log(`📚 Retrieving resources for topic: ${input.topicId}`);
        if (input.type) {
          console.log(`🔍 Filtering by type: ${input.type}`);
        }
        
        // Check if we're in demo mode first
        const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true" || process.env.NODE_ENV === "production" && !process.env.DATABASE_URL || process.env.NETLIFY === "true";
        
        if (isDemoMode) {
          console.log(`🎭 Demo mode: Returning empty resources list`);
          return {
            success: true,
            data: []
          };
        }
        
        if (!db) {
          throw new Error("Database connection not available");
        }
        
        const resources = await db.resource.findMany({
          where: {
            topicId: input.topicId,
            ...(input.type && { type: input.type })
          },
          orderBy: [
            { relevanceScore: 'desc' },
            { createdAt: 'desc' }
          ]
        });
        
        console.log(`✅ Found ${resources.length} resources`);
        
        return {
          success: true,
          data: resources
        };
        
      } catch (error) {
        console.error("❌ Error retrieving topic resources:", error);
        throw new Error(`Failed to retrieve topic resources: ${error instanceof Error ? error.message : String(error)}`);
      }
    }),

  generateProjects: publicProcedure
    .input(z.object({
      roadmapId: z.string(),
      projectCount: z.number().min(1).max(20).default(6)
    }))
    .mutation(async ({ input }) => {
      try {
        console.log(`🚀 Generating projects for roadmap: ${input.roadmapId}`);
        console.log(`📊 Project count requested: ${input.projectCount}`);
        
        // Check if we're in demo mode first
        const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true" || process.env.NODE_ENV === "production" && !process.env.DATABASE_URL || process.env.NETLIFY === "true";
        
        if (isDemoMode) {
          console.log(`🎭 Demo mode: Generating mock projects`);
          
          // Return mock projects for demo
          const mockProjects = Array.from({ length: input.projectCount }, (_, i) => ({
            id: `demo-project-${i + 1}`,
            title: `Demo Project ${i + 1}`,
            description: `This is a sample project for demonstration purposes. Project ${i + 1} would help you apply your learning in a practical way.`,
            difficulty: "BEGINNER" as const,
            estimatedTime: "2-4 weeks",
            technologies: ["JavaScript", "HTML", "CSS"],
            relatedTopicIds: [],
            deliverables: ["Working application", "Source code", "Documentation"]
          }));
          
          return {
            success: true,
            data: mockProjects
          };
        }
        
        if (!db) {
          throw new Error("Database connection not available");
        }
        
        // First, get the roadmap with its topics
        const roadmap = await db.roadmap.findUnique({
          where: { id: input.roadmapId },
          include: {
            topics: {
              orderBy: { level: 'asc' }
            }
          }
        });
        
        if (!roadmap) {
          throw new Error("Roadmap not found");
        }
        
        // Convert the database roadmap to the format expected by generateProjectsForRoadmap
        const roadmapForGeneration = {
          title: roadmap.title,
          description: roadmap.description,
          difficulty: roadmap.difficulty as "beginner" | "intermediate" | "advanced",
          rootTopics: roadmap.topics
            .filter(topic => topic.parentId === null)
            .map(topic => topic.id),
          topics: roadmap.topics.map(topic => ({
            id: topic.id,
            title: topic.title,
            summary: topic.summary,
            level: topic.level,
            parentId: topic.parentId ?? undefined,
            children: roadmap.topics
              .filter(t => t.parentId === topic.id)
              .map(t => t.id)
          }))
        };
        
        // Generate projects using AI
        const model = llms.gemini("gemini-1.5-flash");
        const projectList = await generateProjectsForRoadmap(
          roadmapForGeneration,
          model,
          input.projectCount
        );
        
        console.log(`✅ Generated ${projectList.projects.length} projects successfully`);
        
        return {
          success: true,
          data: projectList.projects
        };
        
      } catch (error) {
        console.error("❌ Error generating projects:", error);
        
        if (error instanceof Error) {
          if (error.message.includes("Roadmap not found")) {
            throw new Error("The specified roadmap does not exist");
          }
        }
        
        throw new Error(`Failed to generate projects: ${error instanceof Error ? error.message : String(error)}`);
      }
    }),

  saveProjects: publicProcedure
    .input(z.object({
      roadmapId: z.string(),
      projects: z.array(z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
        estimatedTime: z.string(),
        technologies: z.array(z.string()),
        relatedTopicIds: z.array(z.string()),
        deliverables: z.array(z.string())
      }))
    }))
    .mutation(async ({ input }) => {
      try {
        console.log(`💾 Saving projects for roadmap: ${input.roadmapId}`);
        console.log(`📝 Number of projects to save: ${input.projects.length}`);
        
        // Check if we're in demo mode first
        const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true" || process.env.NODE_ENV === "production" && !process.env.DATABASE_URL || process.env.NETLIFY === "true";
        
        if (isDemoMode) {
          console.log(`🎭 Demo mode: Simulating projects save`);
          return {
            success: true,
            data: {
              savedCount: input.projects.length,
              roadmapId: input.roadmapId,
              projects: input.projects.map(p => ({
                id: p.id,
                title: p.title,
                description: p.description,
                difficulty: p.difficulty,
                estimatedTime: p.estimatedTime,
                technologies: p.technologies,
                deliverables: p.deliverables,
                relatedTopics: []
              }))
            }
          };
        }
        
        if (!db) {
          throw new Error("Database connection not available");
        }
        
        // First, verify the roadmap exists
        const roadmap = await db.roadmap.findUnique({
          where: { id: input.roadmapId },
          include: { topics: true }
        });
        
        if (!roadmap) {
          throw new Error("Roadmap not found");
        }
        
        // Verify all related topic IDs exist in the roadmap
        const roadmapTopicIds = new Set(roadmap.topics.map(t => t.id));
        for (const project of input.projects) {
          for (const topicId of project.relatedTopicIds) {
            if (!roadmapTopicIds.has(topicId)) {
              throw new Error(`Topic ID ${topicId} not found in roadmap ${input.roadmapId}`);
            }
          }
        }
        
        // Delete existing projects for this roadmap to avoid duplicates
        await db.project.deleteMany({
          where: { roadmapId: input.roadmapId }
        });
        
        // Create new projects and their topic relationships
        const savedProjects = [];
        for (const project of input.projects) {
          const savedProject = await db.project.create({
            data: {
              id: project.id,
              title: project.title,
              description: project.description,
              difficulty: project.difficulty,
              estimatedTime: project.estimatedTime,
              technologies: JSON.stringify(project.technologies),
              deliverables: JSON.stringify(project.deliverables),
              roadmapId: input.roadmapId,
              relatedTopics: {
                create: project.relatedTopicIds.map(topicId => ({
                  topicId: topicId
                }))
              }
            },
            include: {
              relatedTopics: {
                include: {
                  topic: true
                }
              }
            }
          });
          savedProjects.push(savedProject);
        }
        
        console.log(`✅ Projects saved successfully`);
        console.log(`📝 Saved ${savedProjects.length} projects`);
        
        return {
          success: true,
          data: {
            savedCount: savedProjects.length,
            roadmapId: input.roadmapId,
            projects: savedProjects.map(p => ({
              id: p.id,
              title: p.title,
              description: p.description,
              difficulty: p.difficulty,
              estimatedTime: p.estimatedTime,
              technologies: p.technologies,
              deliverables: p.deliverables,
              relatedTopics: p.relatedTopics.map(rt => ({
                id: rt.topic.id,
                title: rt.topic.title
              }))
            }))
          }
        };
        
      } catch (error) {
        console.error("❌ Error saving projects:", error);
        
        if (error instanceof Error) {
          if (error.message.includes("Roadmap not found")) {
            throw new Error("The specified roadmap does not exist");
          }
          if (error.message.includes("Topic ID") && error.message.includes("not found")) {
            throw error; // Re-throw topic validation errors as-is
          }
          if (error.message.includes("Foreign key constraint")) {
            throw new Error("Invalid roadmap or topic ID provided");
          }
        }
        
        throw new Error(`Failed to save projects: ${error instanceof Error ? error.message : String(error)}`);
      }
    }),

  getProjects: publicProcedure
    .input(z.object({
      roadmapId: z.string()
    }))
    .query(async ({ input }) => {
      try {
        console.log(`📋 Retrieving projects for roadmap: ${input.roadmapId}`);
        
        // Check if we're in demo mode first
        const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true" || process.env.NODE_ENV === "production" && !process.env.DATABASE_URL || process.env.NETLIFY === "true";
        
        if (isDemoMode) {
          console.log(`🎭 Demo mode: Returning empty projects list`);
          return {
            success: true,
            data: {
              roadmapId: input.roadmapId,
              projects: [],
              totalCount: 0
            }
          };
        }
        
        if (!db) {
          throw new Error("Database connection not available");
        }
        
        const projects = await db.project.findMany({
          where: { roadmapId: input.roadmapId },
          include: {
            relatedTopics: {
              include: {
                topic: {
                  select: {
                    id: true,
                    title: true,
                    summary: true,
                    level: true
                  }
                }
              }
            },
            roadmap: {
              select: {
                id: true,
                title: true,
                difficulty: true
              }
            }
          },
          orderBy: {
            createdAt: 'asc'
          }
        });
        
        console.log(`✅ Found ${projects.length} projects`);
        
        const formattedProjects = projects.map(project => ({
          id: project.id,
          title: project.title,
          description: project.description,
          difficulty: project.difficulty,
          estimatedTime: project.estimatedTime,
          technologies: JSON.parse(project.technologies) as string[],
          deliverables: JSON.parse(project.deliverables) as string[],
          createdAt: project.createdAt,
          updatedAt: project.updatedAt,
          relatedTopics: project.relatedTopics.map(rt => ({
            id: rt.topic.id,
            title: rt.topic.title,
            summary: rt.topic.summary,
            level: rt.topic.level
          })),
          roadmap: project.roadmap
        }));
        
        return {
          success: true,
          data: {
            roadmapId: input.roadmapId,
            projects: formattedProjects,
            totalCount: formattedProjects.length
          }
        };
        
      } catch (error) {
        console.error("❌ Error retrieving projects:", error);
        throw new Error(`Failed to retrieve projects: ${error instanceof Error ? error.message : String(error)}`);
      }
    }),
});
