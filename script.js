
window.addEventListener('load',()=>{
  setTimeout(()=>document.querySelector('.loader')?.classList.add('hide'),450);
});

document.querySelectorAll('.nav-toggle').forEach(btn=>{
  btn.addEventListener('click',()=>btn.parentElement.querySelector('ul')?.classList.toggle('open'));
});

const revealEls=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')});
  },{threshold:.12});
  revealEls.forEach(el=>io.observe(el));
}else revealEls.forEach(el=>el.classList.add('in'));

document.querySelectorAll('.flip-phone').forEach(phone=>{
  phone.addEventListener('click',()=>phone.classList.toggle('open'));
});

const lightbox=document.querySelector('.lightbox');
if(lightbox){
  const target=lightbox.querySelector('img');
  document.querySelectorAll('.gallery img').forEach(img=>{
    img.addEventListener('click',()=>{
      target.src=img.src;
      target.alt=img.alt;
      lightbox.classList.add('open');
    });
  });
  lightbox.querySelector('.lightbox-close')?.addEventListener('click',()=>lightbox.classList.remove('open'));
  lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.classList.remove('open')});
}

document.querySelectorAll('.easter-egg').forEach(egg=>{
  egg.addEventListener('click',()=>egg.parentElement.querySelector('.secret')?.classList.toggle('show'));
});

let logoClicks=0;
document.querySelector('.logo')?.addEventListener('click',()=>{
  logoClicks++;
  if(logoClicks===5){
    launchConfetti();
    logoClicks=0;
  }
});

document.addEventListener('click',e=>{
  if(window.innerWidth<800)return;
  const star=document.createElement('span');
  star.textContent='✦';
  star.style.cssText=`position:fixed;left:${e.clientX}px;top:${e.clientY}px;color:#ff4fa3;pointer-events:none;z-index:1200;animation:clickStar .7s ease forwards`;
  document.body.appendChild(star);
  setTimeout(()=>star.remove(),700);
});
const clickStyle=document.createElement('style');
clickStyle.textContent='@keyframes clickStar{to{transform:translateY(-24px) scale(1.8) rotate(30deg);opacity:0}}';
document.head.appendChild(clickStyle);

const countdown=document.querySelector('[data-countdown]');
if(countdown){
  const target=new Date(countdown.dataset.countdown+'T00:00:00');
  const update=()=>{
    const diff=target-new Date();
    if(diff<=0){
      countdown.innerHTML='<div class="card"><h3>Happy Birthday Dana! 🎂</h3><p>Today is your day.</p></div>';
      return;
    }
    const d=Math.floor(diff/86400000);
    const h=Math.floor((diff%86400000)/3600000);
    const m=Math.floor((diff%3600000)/60000);
    const s=Math.floor((diff%60000)/1000);
    countdown.innerHTML=`
      <div class="timebox"><strong>${d}</strong>days</div>
      <div class="timebox"><strong>${h}</strong>hours</div>
      <div class="timebox"><strong>${m}</strong>minutes</div>
      <div class="timebox"><strong>${s}</strong>seconds</div>`;
  };
  update();setInterval(update,1000);
}

function launchConfetti(){
  const colors=['#ff4fa3','#ffcbe5','#c91e70','#f4e5cf'];
  for(let i=0;i<65;i++){
    const c=document.createElement('div');
    c.className='confetti';
    c.style.left=Math.random()*100+'vw';
    c.style.background=colors[Math.floor(Math.random()*colors.length)];
    c.style.animationDelay=Math.random()*1.1+'s';
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),4500);
  }
}

const music=document.getElementById('music');
const musicBtn=document.getElementById('musicBtn');
if(music&&musicBtn){
  musicBtn.addEventListener('click',async()=>{
    if(music.paused){
      try{await music.play();musicBtn.textContent='Pause music ⏸️'}
      catch{musicBtn.textContent='Add images/song.mp3 first'}
    }else{
      music.pause();musicBtn.textContent='Play her song ▶️'
    }
  });
}
