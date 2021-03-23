let yt;
$(document).ready(async function(){
  const videoId = localStorage.getItem('videoId')
  console.log(videoId);
  getSong(videoId)
  document.getElementById('target').appendChild( document.getElementById('to_be_moved') )
});

async function getSong(id) {
    var token = "gqefLsr-j3RSR4AHtaEkdQ_UAoDhcUudk0qnYJzxKBYZiLmie3xcDrFg5oC-qVoD";

    let response = await fetch(`https://api.genius.com/songs/${id}?access_token=${token}`);
    let data = await response.json();
    console.log(data);
    const title = data.response.song.full_title;
    const img = data.response.song.header_image_thumbnail_url;
    const medias = data.response.song.media;
    let ytid;
    medias.forEach(element => {
      if (element.provider == "youtube") {
        ytid = element.url.split('=')[1];
      }
    });
    console.log(ytid);
    const string = `
    <img src="${img}" alt="cover image">
    <div>
        <h1>${title}</h1>
        <button onclick="play()">play</button>
        <button onclick="pause()">pause</button>
    </div>`
    let showResults = document.querySelector(".search-item");
    showResults.innerHTML = string;

    yt = ytid;
    musicPlayer();
    // getLyrics(url);
}

// async function getLyrics(url) {
//   console.log(url);
//   const songPage = await fetch(url);
//   const text = await songPage.text();
//   console.log(text);
//   const box = text.find('.lyrics');
//   const lyrics = box.find("p").text();
//   console.log(lyrics);
// }

function musicPlayer() {
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: yt
  });
}
function play() {
 player.playVideo();
}
function pause() {
 player.pauseVideo();
}