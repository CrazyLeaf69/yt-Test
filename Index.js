let ResultList = [];


$('input').on('input', function(e){
    var $this = $(this);

    clearTimeout($this.data('timeout'));

    $this.data('timeout', setTimeout(function(){
        ResultList = [];
        const val = document.querySelector("input").value;
        search(val)
    }, 500));
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
    console.log(`${i + 1}: ${title} by ${ArtistName}`);
    ResultList.push({title: title, artist: ArtistName, url: url});
  });
  sendToSite()
}
function sendToSite() {
    let stringList = "";
    ResultList.forEach(element => {
        stringList+=(`<a href="${element.url}">${element.title} by ${element.artist}</a>`)
    });
    let showResults = document.querySelector("#ResultList");
    while (showResults.firstChild) showResults.removeChild(showResults.firstChild);
    if (!ResultList.length) {
        showResults.innerHTML = "No songs were found"
    } 
    else {
        showResults.innerHTML = (stringList)
    }
}





// const AudioContext = window.AudioContext || window.webkitAudioContext;
// let audioCtx;
// const myAudio = document.querySelector('audio');

// // pre.innerHTML = myScript.innerHTML;

// myAudio.addEventListener('play', () => {
//   audioCtx = new AudioContext();
//   // Create a MediaElementAudioSourceNode
//   // Feed the HTMLMediaElement into it
//   let source = audioCtx.createMediaElementSource(myAudio);

//   // Create a gain node
//   let gainNode = audioCtx.createGain();

//   // Create variables to store mouse pointer Y coordinate
//   // and HEIGHT of screen
//   let CurY;
//   let HEIGHT = window.innerHeight;

//   // Get new mouse pointer coordinates when mouse is moved
//   // then set new gain value

//   document.onmousemove = updatePage;

//   function updatePage(e) {
//     CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

//     gainNode.gain.value = CurY/HEIGHT;
//   }

//   // connect the AudioBufferSourceNode to the gainNode
//   // and the gainNode to the destination, so we can play the
//   // music and adjust the volume using the mouse cursor
//   source.connect(gainNode);
//   gainNode.connect(audioCtx.destination);
// });
