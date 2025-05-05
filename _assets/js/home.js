
document.addEventListener("DOMContentLoaded", async function() {
  {
    const params = new URLSearchParams(window.location.search);
    const pair = params.get('pair') || '';
    const splits = pair.split(',');
    
    if (splits.length == 6) {
      document.querySelectorAll('.aika').forEach(el => {
        if (el.classList.contains('kanji')) {
          el.innerText = splits[1];
        } else {
          el.innerText = splits[0];
        }
      });
      
      document.querySelectorAll('.ilya').forEach(el => {
        if (el.classList.contains('kanji')) {
          el.innerText = splits[4];
        } else {
          el.innerText = splits[3];
        }
      });
    }
  }
  
  const baseTime = "2022-10-16T11:14:00";
  
  const keika = document.getElementById('keika');
  keika.innerText = getTimePassedString(baseTime);
  const keikaItv = setInterval(function() {
    keika.innerText = getTimePassedString(baseTime);
  }, 1000);
  
  
  // when should we show the footer?
});


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
