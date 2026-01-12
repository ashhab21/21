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
const confettiBox = document.getElementById('confetti');

/* عداد تثبيت */
let installs = localStorage.getItem('installs') || 0;

/* كشف المتصفح */
const ua = navigator.userAgent.toLowerCase();
const isAndroid = ua.includes('android');
const isIOS = /iphone|ipad|ipod/.test(ua);
const isBrave = navigator.brave && navigator.brave.isBrave;

/* إظهار بعد 5 ثواني */
setTimeout(()=>{
  if(!isBrave) bubble.hidden = false;
},5000);

/* التقاط التثبيت الحقيقي */
window.addEventListener('beforeinstallprompt', e=>{
  e.preventDefault();
  deferredPrompt = e;
});

/* Confetti */
function fireConfetti(){
  for(let i=0;i<20;i++){
    const s=document.createElement('span');
    s.style.setProperty('--x',Math.random());
    s.style.setProperty('--y',Math.random());
    s.style.background=`hsl(${Math.random()*360},90%,60%)`;
    confettiBox.appendChild(s);
    setTimeout(()=>s.remove(),1200);
  }
}

/* الضغط */
bubble.onclick = async ()=>{
  if(navigator.vibrate) navigator.vibrate(50);

  /* لو التثبيت متاح */
  if(deferredPrompt){
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if(outcome==='accepted'){
      installs++;
      localStorage.setItem('installs',installs);

      bubble.classList.add('boom');
      fireConfetti();
      toast.innerText = `🎉 تمت الإضافة (${installs})`;
      toast.classList.add('show');
      setTimeout(()=>toast.classList.remove('show'),3000);
    }
    deferredPrompt=null;
  }
  /* غير متاح → توجيه */
  else{
    if(isAndroid) location.href='https://play.google.com/store/apps/details?id=com.brave.browser';
    else if(isIOS) location.href='https://apps.apple.com/app/brave-private-web-browser/id1052879175';
    else location.href='https://brave.com';
  }
};
