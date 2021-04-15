const videoId = window.location.search.split('=')[1];
// console.log(videoId);
const x = `<div id="to_be_moved"><div id='rg_embed_link_${videoId}' class='rg_embed_link' data-song-id='${videoId}'></div> <script crossorigin="" src='//genius.com/songs/${videoId}/embed.js'></script></div>`;
document.write(x);