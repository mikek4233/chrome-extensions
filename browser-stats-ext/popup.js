chrome.history.search({
    'text': '',               // Return every history item....
    'maxResults': 500         // Optionally state a limit
}, (results) => {
    document.getElementById('page-count').innerText = `Page Count: ${results.length}`
    chrome.storage.local.get(["started"], function(result) {
        let started 
        if (result){
            started = new Date(result.started);
            document.getElementById('up-since').innerText = "Browser Up Since: " + formatResult(getUptime(started, new Date()));
        } else {
            setup(new Date().toString());
            started = new Date().toString()
            document.getElementById('up-since').innerText = "Browser Up Since: " + formatResult(getUptime(started, new Date()));
        }
    });
})

let segments = {
    day: 86400000,
    hour: 3600000,
    minute: 60000,
    second: 1000,
    millisecond: 1
  };

  
  function lz(num, size) {
    var pad = new Array(1 + size).join("0");
    return (pad + num).slice(-pad.length);
  }
  
  function getUptime(from, to) {
    var result = {};
    var interval = to - from;
    Object.keys(segments).forEach(function(key) {
      result[key] = ~~(interval / segments[key]);
      interval -= result[key] * segments[key];
    });
    return result;
  }
  
  function formatResult(times) {
    result = [];
    if (times.day > 1) {
      result.push(times.day + " days");
    }
    if (times.day === 1) {
      result.push(times.day + " day");
    }
    result.push(" ");
    result.push(lz(times.hour, 2));
    result.push(":");
    result.push(lz(times.minute, 2));
    result.push(":");
    result.push(lz(times.second, 2));
    result.push(".");
    result.push(lz(times.millisecond, 3));
    return result.join("");
  }
  
  function setup(date) {
    return chrome.storage.local.set({ started: date }, function() {});
  }

  
  chrome.runtime.onStartup.addListener(function() {
    setup(new Date().toString());
  });

  chrome.runtime.onInstalled.addListener(function() {
    setup(new Date().toString());
  });

