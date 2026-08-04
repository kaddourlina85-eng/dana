
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


// Maximalist Y2K access gate
document.addEventListener('DOMContentLoaded',()=>{
  const gate=document.querySelector('.access-gate');
  if(gate){
    document.body.classList.add('site-locked');

    const phone=gate.querySelector('.login-flip-phone');
    const intro=gate.querySelector('.phone-intro');
    const scene=gate.querySelector('.login-scene');
    const form=gate.querySelector('.login-form');
    const username=gate.querySelector('#danaUsername');
    const password=gate.querySelector('#danaPassword');
    const error=gate.querySelector('.login-error');

    const revealLogin=()=>{
      phone?.classList.add('open');
      setTimeout(()=>{
        intro?.classList.add('hide');
        scene?.classList.add('show');
        setTimeout(()=>username?.focus(),250);
      },650);
    };

    phone?.addEventListener('click',revealLogin);
    phone?.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){
        e.preventDefault();
        revealLogin();
      }
    });

    form?.addEventListener('submit',e=>{
      e.preventDefault();
      const u=(username?.value||'').trim().toLowerCase();
      const p=(password?.value||'').trim();

      if(u==='danathabet'&&p==='linalovesyou'){
        error.textContent='welcome back, dana ♡';
        sessionStorage.setItem('danaAccess','granted');
        launchConfetti();
        setTimeout(()=>{
          gate.classList.add('hidden');
          document.body.classList.remove('site-locked');
        },650);
      }else{
        error.textContent='wrong username or password 💔';
        gate.querySelector('.login-dialog')?.animate(
          [
            {transform:'translateX(0)'},
            {transform:'translateX(-9px)'},
            {transform:'translateX(9px)'},
            {transform:'translateX(0)'}
          ],
          {duration:300}
        );
      }
    });

    if(sessionStorage.getItem('danaAccess')==='granted'){
      gate.classList.add('hidden');
      document.body.classList.remove('site-locked');
    }
  }

  // Editable note on the first page.
  const note=document.querySelector('#homeNote');
  const save=document.querySelector('#saveNote');
  const reset=document.querySelector('#resetNote');
  const status=document.querySelector('#noteStatus');

  if(note){
    const original=note.value;
    const saved=localStorage.getItem('danaHomeNote');
    if(saved)note.value=saved;

    save?.addEventListener('click',()=>{
      localStorage.setItem('danaHomeNote',note.value);
      if(status)status.textContent='note saved ♡';
    });

    reset?.addEventListener('click',()=>{
      note.value=original;
      localStorage.removeItem('danaHomeNote');
      if(status)status.textContent='note reset';
    });
  }
});


// Maximalist sparkle burst on every click/tap
document.addEventListener('pointerdown',e=>{
  const symbols=['✦','✧','★','♡','💗','✩'];
  const total=window.innerWidth<700?8:14;
  for(let i=0;i<total;i++){
    const s=document.createElement('span');
    s.className='spark-burst';
    s.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    const angle=(Math.PI*2*i)/total + Math.random()*.35;
    const distance=28+Math.random()*58;
    s.style.left=e.clientX+'px';
    s.style.top=e.clientY+'px';
    s.style.setProperty('--x',Math.cos(angle)*distance+'px');
    s.style.setProperty('--y',Math.sin(angle)*distance+'px');
    s.style.fontSize=(12+Math.random()*15)+'px';
    document.body.appendChild(s);
    setTimeout(()=>s.remove(),850);
  }
});


// =========================================================
// FUNCTIONAL RETRO BROWSER CHROME
// =========================================================
document.addEventListener('DOMContentLoaded',()=>{
  const chrome=document.querySelector('.browser-chrome');
  const overlay=document.querySelector('#browserOverlay');
  const dialogTitle=document.querySelector('#browserDialogTitle');
  const dialogBody=document.querySelector('#browserDialogBody');
  const menuPopup=document.querySelector('#browserMenuPopup');
  const addressForm=document.querySelector('#addressForm');
  const addressInput=document.querySelector('#addressInput');

  const pageLinks=[
    ['Home','index.html'],
    ['Academics','academics.html'],
    ['Personal Life','personal.html'],
    ['Personality','personality.html'],
    ['Our Friendship','friendship.html'],
    ['Her Art','art.html'],
    ['Reminds Me Of','reminds.html'],
    ['Memory Lane','index.html#memory-lane']
  ];

  function showDialog(title,html){
    if(!overlay)return;
    dialogTitle.textContent=title;
    dialogBody.innerHTML=html;
    overlay.hidden=false;
  }
  function closeDialog(){
    if(overlay)overlay.hidden=true;
  }
  document.querySelectorAll('[data-close-dialog]').forEach(btn=>btn.addEventListener('click',closeDialog));
  overlay?.addEventListener('click',e=>{if(e.target===overlay)closeDialog()});

  function linksHtml(title){
    return `<h3>${title}</h3>`+pageLinks.map(([name,url])=>`<a href="${url}">${name}</a>`).join('');
  }

  document.querySelectorAll('[data-browser-action]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const action=btn.dataset.browserAction;
      if(action==='back') history.back();
      if(action==='forward') history.forward();
      if(action==='stop') window.stop();
      if(action==='refresh') location.reload();
      if(action==='home') location.href='index.html';
      if(action==='print') window.print();
      if(action==='minimize'){
        chrome?.classList.toggle('is-minimized');
        document.body.classList.toggle('browser-minimized');
      }
      if(action==='maximize'){
        document.body.classList.toggle('fake-fullscreen');
        btn.textContent=document.body.classList.contains('fake-fullscreen')?'❐':'□';
      }
      if(action==='close'){
        document.body.classList.add('browser-closed');
        const closed=document.createElement('div');
        closed.className='browser-closed-message';
        closed.innerHTML=`<div><h1>Dana's World has been closed 💔</h1><p>Just kidding. This is a fake Y2K browser window.</p><button id="reopenBrowser">Reopen Dana's World</button></div>`;
        document.body.appendChild(closed);
        closed.querySelector('#reopenBrowser').addEventListener('click',()=>{
          document.body.classList.remove('browser-closed');
          closed.remove();
        });
      }
      if(action==='search'){
        showDialog('Search Dana’s World',`<h3>Search the website</h3><input id="siteSearchInput" placeholder="Try: art, memories, law, Bratz"><div id="siteSearchResults"></div>`);
        const input=document.querySelector('#siteSearchInput');
        const results=document.querySelector('#siteSearchResults');
        input?.addEventListener('input',()=>{
          const q=input.value.trim().toLowerCase();
          const matches=pageLinks.filter(([name])=>name.toLowerCase().includes(q));
          results.innerHTML=q?matches.map(([name,url])=>`<a href="${url}">${name}</a>`).join(''):'';
        });
        input?.focus();
      }
      if(action==='favorites'){
        const saved=JSON.parse(localStorage.getItem('danaFavorites')||'[]');
        const current=location.pathname.split('/').pop()||'index.html';
        const isSaved=saved.includes(current);
        showDialog('Favorites',`
          <h3>My Favorites ☆</h3>
          <button class="dialog-link" id="toggleFavorite">${isSaved?'Remove this page from favorites':'Add this page to favorites'}</button>
          ${saved.length?saved.map(url=>`<a href="${url}">${url}</a>`).join(''):'<p>No pages saved yet.</p>'}
        `);
        document.querySelector('#toggleFavorite')?.addEventListener('click',()=>{
          let list=JSON.parse(localStorage.getItem('danaFavorites')||'[]');
          list=isSaved?list.filter(x=>x!==current):[...new Set([...list,current])];
          localStorage.setItem('danaFavorites',JSON.stringify(list));
          closeDialog();
        });
      }
      if(action==='history'){
        const historyList=JSON.parse(localStorage.getItem('danaHistory')||'[]');
        showDialog('History',`<h3>Recently visited</h3>${historyList.map(x=>`<a href="${x.url}">${x.title}</a>`).join('')||'<p>No history yet.</p>'}`);
      }
      if(action==='mail'){
        showDialog('Mail Dana',`<h3>Send a pretend Y2K message 💌</h3><p>This opens your email app.</p><a href="mailto:?subject=Dana%27s%20World&body=I%20love%20your%20Y2K%20website!">Open Mail</a>`);
      }
    });
  });

  const menuContent={
    file:[
      ['Home','index.html'],['Print this page','javascript:window.print()'],['Close window','#close']
    ],
    edit:[
      ['Edit Dana’s note','index.html#homeNote'],['Select all','#select'],['Copy page link','#copy']
    ],
    view:[
      ['Refresh','#refresh'],['Toggle browser bar','#minimize'],['Top of page','#top']
    ],
    favorites:pageLinks,
    tools:[
      ['Launch sparkles','#sparkles'],['Clear saved note','#clear-note'],['Reset login','#reset-login']
    ],
    help:[
      ['How to add photos','#photos'],['Login details','#login-help'],['About this site','#about']
    ]
  };

  document.querySelectorAll('[data-menu]').forEach(menuBtn=>{
    menuBtn.addEventListener('click',e=>{
      e.stopPropagation();
      document.querySelectorAll('[data-menu]').forEach(x=>x.classList.remove('open'));
      menuBtn.classList.add('open');
      const key=menuBtn.dataset.menu;
      const entries=menuContent[key]||[];
      menuPopup.innerHTML=entries.map(([label,target])=>`<button type="button" data-menu-target="${target}">${label}</button>`).join('');
      menuPopup.classList.add('open');
    });
  });

  menuPopup?.addEventListener('click',async e=>{
    const btn=e.target.closest('[data-menu-target]');
    if(!btn)return;
    const target=btn.dataset.menuTarget;
    menuPopup.classList.remove('open');
    document.querySelectorAll('[data-menu]').forEach(x=>x.classList.remove('open'));
    if(!target.startsWith('#')&&!target.startsWith('javascript:'))location.href=target;
    if(target==='javascript:window.print()')window.print();
    if(target==='#close')document.querySelector('[data-browser-action="close"]')?.click();
    if(target==='#select')window.getSelection()?.selectAllChildren(document.body);
    if(target==='#copy'){
      await navigator.clipboard?.writeText(location.href);
      showDialog('Copied!','<p>The page link was copied to your clipboard ♡</p>');
    }
    if(target==='#refresh')location.reload();
    if(target==='#minimize')document.querySelector('[data-browser-action="minimize"]')?.click();
    if(target==='#top')scrollTo({top:0,behavior:'smooth'});
    if(target==='#sparkles'){
      launchConfetti();
      showDialog('Sparkles!','<p>Maximum glitter mode activated ✦</p>');
    }
    if(target==='#clear-note'){
      localStorage.removeItem('danaHomeNote');
      showDialog('Note cleared','<p>The saved homepage note was removed from this browser.</p>');
    }
    if(target==='#reset-login'){
      sessionStorage.removeItem('danaAccess');
      location.reload();
    }
    if(target==='#photos'){
      showDialog('Adding photos',`<h3>Photo filenames</h3><p>Replace the files inside the images folder using the same names:</p><p><b>memory1.jpg</b> through <b>memory8.jpg</b>, <b>headshot.jpg</b>, <b>photo1.jpg</b> through <b>photo3.jpg</b>, and <b>art1.jpg</b> through <b>art6.jpg</b>.</p>`);
    }
    if(target==='#login-help'){
      showDialog('Login details','<p><b>Username:</b> danathabet</p><p><b>Password:</b> linalovesyou</p>');
    }
    if(target==='#about'){
      showDialog('About Dana’s World','<p>A maximalist Y2K scrapbook website made by Lina for Dana ♡</p>');
    }
  });

  document.addEventListener('click',e=>{
    if(!e.target.closest('.browser-menu')){
      menuPopup?.classList.remove('open');
      document.querySelectorAll('[data-menu]').forEach(x=>x.classList.remove('open'));
    }
  });

  addressForm?.addEventListener('submit',e=>{
    e.preventDefault();
    let value=addressInput.value.trim();
    const known=pageLinks.find(([name])=>name.toLowerCase()===value.toLowerCase());
    if(known){location.href=known[1];return}
    if(/^https?:\/\//i.test(value)){
      if(value.includes('kaddourlina85-eng.github.io/dana'))location.href=value;
      else window.open(value,'_blank','noopener');
      return;
    }
    const query=encodeURIComponent(value);
    window.open(`https://www.google.com/search?q=${query}`,'_blank','noopener');
  });

  // Record local site history.
  const historyList=JSON.parse(localStorage.getItem('danaHistory')||'[]');
  const current={title:document.title,url:location.pathname.split('/').pop()||'index.html'};
  const updated=[current,...historyList.filter(x=>x.url!==current.url)].slice(0,12);
  localStorage.setItem('danaHistory',JSON.stringify(updated));
});
