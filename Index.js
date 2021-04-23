$(document).ready(function(){
  var $this = document.querySelector("input");
    if ($this.value.length > 0) {
      const val = $this.value;
      search(val)
    }
});
let ResultList = [];


$('input').on('input', function(e){
    var $this = $(this);
    clearTimeout($this.data('timeout'));

    $this.data('timeout', setTimeout(function(){
        ResultList = [];
        const val = document.querySelector("input").value;
        search(val)
    }, 500));
    // if ($this.value.length == 3) {
    //   ResultList = [];
    //   const val = $this.value;
    //   search(val)
    // }
});
$('#myBtn').on('click', function(e){
  var $this = document.querySelector("input");
  console.log($this.value.length);
  ResultList = [];
  const val = $this.value;
  search(val)
});
document.addEventListener('keydown', function (event) {
  if (event.keyCode == 13) {
    $("#myBtn").click();
  }
});

async function search(search) {
  var token = "gqefLsr-j3RSR4AHtaEkdQ_UAoDhcUudk0qnYJzxKBYZiLmie3xcDrFg5oC-qVoD";

  let response = await fetch(
    "https://api.genius.com/search?access_token=" +
      token + "&q=" + encodeURIComponent(search) + "&per_page=20"
  );
  let data = await response.json();
  console.log(data);
  console.log("Found this:\n");
  data.response.hits.forEach((element, i) => {
    const title = element.result.title;
    const ArtistName = element.result.primary_artist.name;
    const url = element.result.url;
    // picture sorting
    const songURL = element.result.song_art_image_thumbnail_url
    const picZize = songURL.split(".")[songURL.split(".").length-2]
    const midleX = parseInt(picZize.split("x")[1])
    const img = (midleX<320 && midleX>280 && midleX != NaN) ? songURL : "./Images/noimage.jpg" ;
    // ---------------------
    const pgwiews = element.result.stats.pageviews;
    const videoId = element.result.id
    console.log(`${i + 1}: ${title} by ${ArtistName}`);
    ResultList.push({
      title: title, artist: ArtistName, 
      url: url, img: img, wiews: pgwiews, vidId: videoId});
  });
  sendToSite()
}
function sendToSite() {
    let stringList = "";
    ResultList.forEach(element => {
        stringList+=(`
        <div class="search-item">
          <img src="${element.img}" alt="cover image" href="${element.url}">
          <div class="info">
            <h1>${element.title}</h1>
            <h4>Artist: ${element.artist}</h4>
            <p>pagewiews: ${element.wiews}</p>
            <br>
            <div class="gotolyrics">Go to song --></div><br>
            <a href="${element.url}">Go to song on genuios --></a>
          </div>
        </div>
        `)
    });
    let showResults = document.querySelector("#ResultList");
    while (showResults.firstChild) showResults.removeChild(showResults.firstChild);
    if (!ResultList.length) {
        showResults.innerHTML = "No songs were found"
    } 
    else {
        showResults.innerHTML = (stringList)
    }
    // console.log($("#ResultList .search-item").length);
    $(".gotolyrics").click(function() {
      var i = $(this).parent().parent().index();
      const item = ResultList[i].vidId
      // await localStorage.setItem('videoId', item);
      window.location.href = `lyrics.html?song=${item}`;
    });

}

 // 2. This code loads the IFrame Player API code asynchronously.
 var tag = document.createElement('script');

 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

 // 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.
 var player;
 function onYouTubeIframeAPIReady() {
   player = new YT.Player('player', {
     height: '390',
     width: '640',
     videoId: 'QMokMQ8Bu7Y'
   });
 };
function play() {
  player.playVideo();
};
function pause() {
  player.pauseVideo();
};
