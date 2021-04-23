$(document).ready(async function(){
  toggle();
  songs();
  $(".chart_btn").click(function(){
    const text = $(".toggle").text()
    let keywords = text.split("/");
    keywords.forEach((element, index) => {
      if ($(this).parent().attr("id") == index+1) {
        keywords[index] = $(this).text();
      }
    });
    $(".toggle").text(`${keywords.join("/")}`)
  });
});
async function songs() {
  let resultList = []
  let response = await fetch("popular.json")
  let data = await response.json();
  data.response.chart_items.forEach(element => {
    const title = element.item.title;
    const artist = element.item.primary_artist.name;
    const img = element.item.song_art_image_thumbnail_url;
    const views = element.item.stats.pageviews;
    const id = element.item.id;
    resultList.push({title: title, artist: artist, img: img, views: views, id: id});
  });
  let stringHtml = "";
  resultList.forEach((element, index) => {
    stringHtml += `
    <tbody class="popularItem">
      <tr>
        <td class="nm">${index+1}</td>
        <td class="thumbnail fonts"><img style="text-align: left;" src="${element.img}" alt="song image" width="50px" height="50px"></td>
        <td class="ellipsis fonts" style="width: 26%;"><a href="lyrics.html?song=${element.id}" style="color: black;"><span class="title">${element.title}</span></td></a>
        <td class="ellipsis fonts" style="width: 26%;"><span class="artist">${element.artist}</span></td>
        <td class="ellipsis fonts"><span style="text-align: right;">${toPrefix(element.views)}</span></td>
      </tr>
    </tbody>
    `
  });
  document.querySelector(".popularList").innerHTML = stringHtml;

}

function toggle() {
  var x = document.getElementById("table");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function toPrefix (labelValue) {

  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e+9

  ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
  // Six Zeroes for Millions 
  : Math.abs(Number(labelValue)) >= 1.0e+6

  ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
  // Three Zeroes for Thousands
  : Math.abs(Number(labelValue)) >= 1.0e+3

  ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

  : Math.abs(Number(labelValue));

}