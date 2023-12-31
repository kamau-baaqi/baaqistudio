let apiKey;

// Dynamic import to load the API key from config.js
import('./config.js')
  .then((module) => {
    apiKey = module.default;
    // Fetch the video data using the apiKey
    fetchVideos(apiKey);
  })
  .catch((error) => {
    console.error('Error loading config:', error);
  });

function fetchVideos(apiKey) {
  // Use the apiKey to make the API request to Pexels
  const url = `https://api.pexels.com/videos/search?query=nature&per_page=10`;

  fetch(url, {
    method: "GET",
    headers: {
      Authorization: apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Filter the list of videos to include only landscape videos
      const landscapeVideos = data.videos.filter(
        (video) => video.width > video.height
      );

      // Variable to hold the video to play
      let videoToPlay;

      // If there are any landscape videos, select one at random
      if (landscapeVideos.length > 0) {
        videoToPlay =
          landscapeVideos[Math.floor(Math.random() * landscapeVideos.length)];
        lastVideo = videoToPlay; // store this video as the last landscape video
      } else if (lastVideo) {
        // If no landscape videos found, but we have a previous landscape video, use it
        videoToPlay = lastVideo;
      } else {
        console.log("No landscape videos found");
        return;
      }

      // Set the source and author of the video element
      const videoUrl = videoToPlay.video_files[0].link;
      const videoElement = document.getElementById("pexels-video");
      videoElement.src = videoUrl;

      const authorName = videoToPlay.user.name;
      const authorElement = document.getElementById("pexels-author");
      authorElement.textContent = `Video by ${authorName} on Pexels`;
    })
    .catch((error) => console.log(error));
}
