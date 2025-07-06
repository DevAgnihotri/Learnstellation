const API_KEY = 'AIzaSyCiYq_M2TqMPsquoAhO7ezV3TrSU907W7Y';
const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=react%20tutorial&maxResults=5&key=${API_KEY}&order=relevance`;

console.log('Testing YouTube API...');
console.log('URL:', url);
console.log('');

try {
  const response = await fetch(url);
  
  console.log('Status Code:', response.status);
  console.log('Status Text:', response.statusText);
  console.log('Headers:', Object.fromEntries(response.headers));
  console.log('');

  const data = await response.text();
  
  try {
    const jsonData = JSON.parse(data);
    console.log('Response:', JSON.stringify(jsonData, null, 2));
  } catch (error) {
    console.log('Raw Response:', data);
  }
} catch (error) {
  console.error('Request Error:', error);
}
