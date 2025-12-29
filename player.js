const video=document.getElementById('video');
const iframe=document.getElementById('iframe');
const episodesBox = document.querySelector('.episodes');
if (episodesBox) {const count = episodesBox.querySelectorAll('button').length;if (count > 40) {episodesBox.classList.add('scrollable');}}
document.querySelectorAll('.episodes button').forEach(btn=>{btn.onclick=()=>{const src=btn.dataset.src;video.style.display='none';iframe.style.display='none';if(/\.mp4|m3u8|ts/.test(src)){video.src=src;video.style.display='block';}else{iframe.src=src;iframe.style.display='block';}}});
document.body.style.overflow = 'hidden';
document.body.style.overflow = '';