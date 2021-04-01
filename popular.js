$(document).ready(async function(){
    var token = "gqefLsr-j3RSR4AHtaEkdQ_UAoDhcUudk0qnYJzxKBYZiLmie3xcDrFg5oC-qVoD";

    let response = await fetch(`https://genius.com/api/songs/chart?time_period=all_time&chart_genre=all&page=1&per_page=10&text_format=html%2Cmarkdown?access_token=${token}`);
    let data = await response.json();
    console.log(data);
    // let response = await fetch("https://genius.com/api/songs/chart?time_period=all_time&chart_genre=all&page=1&per_page=10&text_format=html%2Cmarkdown")
    // let data = await response.json();
    // console.log(data);
  });
function test() {
    var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}