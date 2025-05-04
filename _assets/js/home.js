
document.addEventListener("DOMContentLoaded", async function() {
  const params = new URLSearchParams(window.location.search);
  const pair = params.get('pair') || 'Aika';
  const sleepMs = parseInt(params.get('ms'), 10) || 90;
  
  const baseTime = "2022-10-16T11:14:00";
  
  const [
   ai='Aika',
   aj='愛華',
   ak='あいか',
   ii='Ilya',
   ij='射矢',
   ik='いりや'
  ] = pair.split(',');
  
  document.querySelectorAll('.aika').forEach(el => {
    if (el.classList.contains('kanji')) {
      el.innerText = aj;
    } else {
      el.innerText = ai;
    }
  });
  
  document.querySelectorAll('.ilya').forEach(el => {
    if (el.classList.contains('kanji')) {
      el.innerText = ij;
    } else {
      el.innerText = ii;
    }
  });
  
  document.getElementById('home-enter-btn').onclick = async function() {
    document.getElementById('home-enter-container').className = 'hidden';
    goFullscreenAndLockOrientation(document.documentElement);
    
    const container = document.getElementById('home-typed-message');
    let p;
    let msg;
    
    p = document.createElement('p');
    p.className = 'left de-la';
    container.appendChild(p);
    msg =`<thin-underline;To: ><aika sweet-shadow thin-underline;${ai}>`;
    await typeText(p, msg, sleepMs);

    p = document.createElement('p');
    container.appendChild(p);
    
    msg =`
<aika sweet-shadow;${aj}>！いつもありがとう！<heart;❤>

あれから
`;
    await typeText(p, msg, sleepMs);
    
    const keika = document.createElement('span');
    keika.id = 'keika';
    p.appendChild(keika);
    msg = getTimePassedString(baseTime);
    await typeText(keika, msg, 60);
    
    keika.innerText = getTimePassedString(baseTime);
    const keikaItv = setInterval(function() {
      keika.innerText = getTimePassedString(baseTime);
    }, 1000);
    
    msg =`
の月日が流れた中で
僕らは一緒に色んなことをしてきた
ふたりで
ゲームしたり
ガチ勢ったり
仕事したり
旅行したり
笑ったり
たまに喧嘩するときもあるけど
すぐ仲直りして
それでまた笑ったりしたね！
ずっと一緒にいてくれてありがとう！

<aika sweet-shadow;${aj}>は<ilya cool-shadow;${ij}>だけの女の子だ！`;
    
    await typeText(p, msg, sleepMs);
    
    p = document.createElement('p');
    p.className = 'center de-la';
    container.appendChild(p);
    msg ="\nJe <heart;t'aime> ma chouchoute <heart;❤>";
    await typeText(p, msg, 50);
    
    p = document.createElement('p');
    p.className = 'right';
    container.appendChild(p);
    
    msg =`\n―― <ilya cool-shadow de-la;${ii}>`;
    await typeText(p, msg, sleepMs);
    
    p = document.createElement('p');
    p.className = 'center de-la';
    container.appendChild(p);
    msg =`\n<aika sweet-shadow;${ai}><heart;❤><ilya cool-shadow;${ii}>\n`
    await typeText(p, msg, sleepMs);
    
    const foot = document.getElementById("home-footer");
    foot?.classList.remove("hidden");
  } // home-enter-btn.onclick
  
});


async function typeText(el, txt, sleepMs) {
  let inKanji = 0;
  let kanji = '';
  let kana = '';
  
  let target = el;
  
  let inTag = false;
  let inCn = false;
  let cnBuf = '';
  
  for (c of txt) {
    if (c === '<') {
      inTag = true;
      inCn = true;
      target = document.createElement('span');
      el.appendChild(target);
    } else if (inCn) {
      if (c === ';') {
        inCn = false;
        target.className = cnBuf;
        cnBuf = '';
      } else
        cnBuf += c;
    } else if (c === '>' && inTag) {
      inTag = false;
      target = el;
    }
    
    /*
    else if (c === '[') {
      inKanji = 1;
    } else if (c === ':' && inKanji) {
      inKanji = 2;
    } else if (c === ']') {
      const kanaSpan = document.createElement('span');
      target.appendChild(kanaSpan);
      for (k of kana) {
        kanaSpan.insertAdjacentText('beforeend', k);
        await sleep(sleepMs);
      }
      kanaSpan.remove();
      target.insertAdjacentText('beforeend', kanji);
      await sleep(sleepMs);
      
      inKanji = 0;
      kanji = kana = '';
    
    } else if (inKanji == 1) {
      kanji += c;
    } else if (inKanji == 2) {
      kana += c;
    }
    */
    
    else if (c === '\n') {
      target.insertAdjacentHTML('beforeend', '<br/>');
      await sleep(sleepMs);
    }  else {
      target.insertAdjacentText('beforeend', c);
      await sleep(sleepMs);
    }
  }
}


function getTimePassedString(baseDateStr) {
  const baseDate = new Date(baseDateStr);
  const now = new Date();

  let years = now.getFullYear() - baseDate.getFullYear();
  let months = now.getMonth() - baseDate.getMonth();
  let days = now.getDate() - baseDate.getDate();
  let hours = now.getHours() - baseDate.getHours();
  let minutes = now.getMinutes() - baseDate.getMinutes();
  let seconds = now.getSeconds() - baseDate.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  return `${years}年${months}ヶ月${days}日と` +
         `${hours}時間${minutes}分${seconds}秒`;
}


async function goFullscreenAndLockOrientation(el) {
  try {
    await el.requestFullscreen();
    if (screen.orientation && screen.orientation.lock) {
      await screen.orientation.lock("portrait");
    }
  } catch (err) {
    console.error("Fullscreen or orientation lock failed:", err);
  }
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
