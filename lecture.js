const youtubePlayer = document.querySelector("[data-youtube-player]");
const localVideoNotice = document.querySelector("[data-local-video-notice]");

if (youtubePlayer) {
  const isHostedPage = ["http:", "https:"].includes(window.location.protocol);

  if (isHostedPage) {
    const videoId = youtubePlayer.dataset.videoId;
    const pageOrigin = window.location.origin;
    const parameters = new URLSearchParams({
      rel: "0",
      playsinline: "1",
      origin: pageOrigin,
      widget_referrer: window.location.href,
    });

    youtubePlayer.src = `https://www.youtube.com/embed/${videoId}?${parameters}`;
  } else {
    youtubePlayer.remove();
    localVideoNotice.hidden = false;
  }
}
