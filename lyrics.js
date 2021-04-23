let yt;
$(document).ready(async function(){
  const videoId = window.location.search.split('=')[1];
  console.log(videoId);
  await getSong(videoId)
  document.getElementById('target').appendChild( document.getElementById('to_be_moved') )

  Timer = setInterval(() => {
    timer()
  }, 500);

  var slider = document.getElementById("myRange");
  var output = document.getElementById("time");
  slider.oninput = function() {
    clearInterval(Timer);
    output.innerHTML = fancyTimeFormat(this.value);
    var value = (this.value-this.min)/(this.max-this.min)*100
    this.style.background = 'linear-gradient(to right, #82CFD0 0%, #82CFD0 ' + value + '%, #fff ' + value + '%, white 100%)'
  }
  slider.onchange = function() {
    player.seekTo(slider.value);
    Timer = setInterval(() => {
      timer()
    }, 500);
  }
  setTimeout(() => {
    var DurationInSeconds = player.getDuration()
    var FancyDuration = fancyTimeFormat(player.getDuration())
    $(".slider").attr('max', DurationInSeconds)
    $(".totDuration").text(FancyDuration)
  }, 3000);

  $('#playAndPause').on('click', function(e){
    if ($(this).attr("class") == "fas fa-play fa-lg") {
      $(this).attr("class", "fas fa-pause fa-lg")
      play()
    }
    else{
      $(this).attr("class", "fas fa-play fa-lg")
      pause()
    }
  });
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
    // console.log(player.getDuration());
    const string = `
    <div class="search-item">
      <img src="${img}" alt="cover image">
      <div class="info">
          <h1>${title}</h1>
      </div>
    </div>`
    let showResults = document.querySelector("#song");
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

// let timerbetwen = 0;
function timer() {
  var slider = document.getElementById("myRange");
  var output = document.getElementById("time");
  var TimeInSeconds = player.getCurrentTime()
  var FancyTime = fancyTimeFormat(parseInt(player.getCurrentTime()))
  output.innerHTML = FancyTime;
  slider.value = TimeInSeconds;
  var value = (slider.value-slider.min)/(slider.max-slider.min)*100
  slider.style.background = 'linear-gradient(to right, #82CFD0 0%, #82CFD0 ' + value + '%, #fff ' + value + '%, white 100%)'
}

function fancyTimeFormat(duration)
{   
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}