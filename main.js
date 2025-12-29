// theme
const t=document.getElementById('themeToggle');
t.onclick=()=>document.body.classList.toggle('light');

// pwa
let deferred;
window.addEventListener('beforeinstallprompt',e=>{
  e.preventDefault();deferred=e;
  installBtn.hidden=false;
});
installBtn.onclick=()=>deferred&&deferred.prompt();
