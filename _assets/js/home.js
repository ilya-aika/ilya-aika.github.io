
document.addEventListener("DOMContentLoaded", async function() {
  const params = parseParams();
  let app = null;
  let showContentSleep = 50;
  
  if (!params.skipa) {
    app = playFirework();
    showContentSleep = 2400;
  }
  
  setTimeout(function(){
    if (app) {
      app.view.remove();
      app.ticker.stop();
      app.ticker.destroy();
    }
    
    const baseTime = "2022-10-16T11:14:00+09:00";
    const keika = document.getElementById('keika');
    keika.innerText = getTimePassedString(baseTime);
    
    const container = document.getElementById('home-content');
    container.classList.add('show');
    
    setInterval(function() {
      // could be simplified by incrementing the time once the time diff is calculated
      keika.innerText = getTimePassedString(baseTime);
    }, 1000);
  }, showContentSleep);
  
  // when should we show the footer?
});


function playFirework() {
  const app = new PIXI.Application({ background: 0x000000, resizeTo: window });
  app.view.id = 'firework-canvas';
  document.body.appendChild(app.view);
  
  const g = new PIXI.Graphics();
  const radius = 3;
  const blur = 9;
  g.beginFill(0xff66cc);
  g.drawCircle(radius + blur, radius + blur, radius);
  g.endFill();
  const particleTexture = app.renderer.generateTexture(g, PIXI.SCALE_MODES.LINEAR, 1, new PIXI.Rectangle(0, 0, radius * 2 + blur * 2, radius * 2 + blur * 2));
  
  setTimeout(() => {
    spawnHeartFirework(app, particleTexture,
        app.renderer.width * .5,
        app.renderer.height * .2);
  }, 400);
  
  return app;
}


function spawnHeartFirework(app, particleTexture, x, y, count = 1500, scale = 3) {
  for (let i = 0; i < count; i++) {
    const t = (Math.PI * 2) * (i / count);
    
    const hx = scale * 16 * Math.pow(Math.sin(t), 3);
    const hy = -scale * (15 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    
    const vx = hx * (Math.random() * 1.3 + 0.9);
    const vy = hy * (Math.random() * 1.3 + 0.9);
    
    //const vx = hx;
    //const vy = hy;
    
    const sprite = new PIXI.Sprite(particleTexture);
    sprite.anchor.set(0.5);
    sprite.x = x;
    sprite.y = y;
    sprite.alpha = 1;
    sprite.scale.set(1.3);
    sprite.blendMode = PIXI.BLEND_MODES.ADD;
    
    const r = Math.random() * 4;
    if (r <= 1)
      sprite.tint = 0x00ccff;
    else if (r <= 2)
      sprite.tint = 0xffaaaa;
    else if (r <= 3)
      sprite.tint = 0xffdd00;
    
    app.stage.addChild(sprite);

    const lifetime = 80 + Math.random() * 50;
    let age = 0;
    
    app.ticker.add(function update(delta) {
      age += delta;
      sprite.x += vx * delta * 0.06;
      sprite.y += vy * delta * 0.06 + 0.06 * age; // gravity
      sprite.alpha -= 0.008 * delta;
      
      if (Math.random() * 2 >= 1)
        sprite.tint ^= 0xbbbbaa;
      
      if (age > lifetime || sprite.alpha <= 0) {
        app.stage.removeChild(sprite);
        app.ticker.remove(update);
      }
    });
  }
}


function parseParams() {
  const params = new URLSearchParams(window.location.search);
  const ret = {};
  
  const pair = params.get('pair') || '';
  const splits = pair.split(',');
  
  if (splits.length == 6) {
    [aika_r, aika_k, aika_h,
     ilya_r, ilya_k, ilya_h] = splits;
    Object.assign(ret, {aika_r, aika_k, aika_h, ilya_r, ilya_k, ilya_h});
    document.querySelectorAll('.aika').forEach(el => {
      if (el.classList.contains('kanji')) {
        el.innerText = aika_k;
      } else {
        el.innerText = aika_r;
      }
    });
    
    document.querySelectorAll('.ilya').forEach(el => {
      if (el.classList.contains('kanji')) {
        el.innerText = ilya_k;
      } else {
        el.innerText = ilya_r;
      }
    });
  }
  
  
  // skip hanabi animation
  ret.skipa = params.get('skipa') != null;
  
  return ret;
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
