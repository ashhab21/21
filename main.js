// theme
const t=document.getElementById('themeToggle');
t.onclick=()=>document.body.classList.toggle('light');

// pwa
let deferred;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferred=e;installBtn.hidden=false;});
installBtn.onclick=()=>deferred&&deferred.prompt();

let deferredPrompt;
const bubble = document.getElementById('installBubble');
const toast  = document.getElementById('installToast');

/* كشف Brave */
const isBrave = navigator.brave && navigator.brave.isBrave;
/* منع الظهور إذا المتصفح Brave */
if (isBrave) {bubble?.remove();}
/* التقاط حدث التثبيت */
window.addEventListener('beforeinstallprompt', e => {e.preventDefault();  deferredPrompt = e;  bubble.hidden = false;});
/* عند الضغط */
bubble.addEventListener('click', async () => {if (!deferredPrompt) return;
/* اهتزاز خفيف */
if (navigator.vibrate) navigator.vibrate(40);deferredPrompt.prompt();const { outcome } = await deferredPrompt.userChoice;if (outcome === 'accepted') {bubble.hidden = true;
/* تنبيه النجاح */
toast.classList.add('show');setTimeout(()=> toast.classList.remove('show'), 3000);}deferredPrompt = null;});
