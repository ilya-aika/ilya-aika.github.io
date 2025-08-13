(async function(){

document.addEventListener("DOMContentLoaded", async function() {
  const params = parseParams();
  
});

function parseParams() {
  const params = new URLSearchParams(window.location.search);
  const ret = {};
  
  ret.counter = params.get("counter") != null;
  if (ret.counter) {
    document.getElementById("visitor-container").classList.remove("hidden");
  }
  
  return ret;
}

})();
