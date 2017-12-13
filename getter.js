function getBodies() {
  var bodies = document.getElementsByClassName('truncate-by-height')
  var arr = []

  for (var i = 0; i < bodies.length; i++) {
    arr.push(bodies[i].textContent)
  }

  return arr
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  sendResponse(getBodies());
});
