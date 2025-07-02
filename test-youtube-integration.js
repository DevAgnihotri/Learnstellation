// Test YouTube Resources functionality
import { youtubeResources } from './src/course-builder-ai/resources.js';
import llms from './src/lib/llms.js';

console.log('🧪 Testing YouTube Resources Integration...');

try {
  const model = llms.gemini("gemini-1.5-flash");
  
  const result = await youtubeResources(
    "React hooks tutorial",
    "beginner", 
    "Introduction to React hooks for state management and component lifecycle",
    model
  );
  
  console.log('✅ YouTube Resources Test Successful!');
  console.log(`📺 Found ${result.selectedVideos.length} selected videos`);
  console.log(`🔍 Total search results: ${result.totalSearchResults}`);
  
  result.selectedVideos.forEach((video, index) => {
    console.log(`\n${index + 1}. ${video.title}`);
    console.log(`   Channel: ${video.channelTitle}`);
    console.log(`   Score: ${video.relevanceScore}/10`);
    console.log(`   URL: ${video.url}`);
  });
  
  console.log(`\n📝 Summary: ${result.summary}`);
  
} catch (error) {
  console.error('❌ YouTube Resources Test Failed:', error);
}
