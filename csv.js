/*
 * csv.js
 * convert query result bodies into CSV file
 *
 * created by Aranda Rizki Soedjono
 * QAE at bukalapak.com
 */

Array.prototype.diff = function(a) {
  return this.filter(function(i) {return a.indexOf(i) < 0;})
};

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, {}, function(bodies) {
    var keys = []
    var rows = []
    var csvContent = ""

    for (var idx = 0; idx < bodies.length; idx++) {
      var body_keys = Object.keys(JSON.parse(bodies[idx]))
      var diff = body_keys.diff(keys)

      if (diff.length > 0) {
        keys = keys.concat(diff)
      }
    }
    csvContent += keys.join(",") + "\n"

    for (var idx = 0; idx < bodies.length; idx++) {
      var json = JSON.parse(bodies[idx])
      var arr = []

      for (var jdx = 0; jdx < keys.length; jdx++) {
        arr.push(json[keys[jdx]])
      }

      csvContent += arr.join(",") + "\n"
    }

    var blob = new Blob([csvContent], {type: "text/csv"})
    var url = window.URL.createObjectURL(blob)

    var link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "kibana.csv")
    link.click()
  })
})
