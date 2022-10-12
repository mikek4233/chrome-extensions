chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.clear(() => {
    setup(new Date().toString());
  });
});

chrome.runtime.onInstalled.addListener(() => {
  setup(new Date().toString());
});

chrome.history.search({
    'text': '',               // Return every history item....
    'maxResults': 500         // Optionally state a limit
}, (results) => {
    document.getElementById('page-count').innerText = `Page Count: ${results.length}`
    let occurences = {}
    let maxKey = {'title': '', 'link': ''}
    results.forEach(result => {
        let str = result.title
        if(!occurences[str]){
          occurences[str] = 0;
         }
         occurences[str]++;
         if(maxKey.title == '' || occurences[str] > occurences[maxKey.title]){
             maxKey['title'] = str;
             maxKey['link'] = result.url
         }
    })

    document.getElementById('most-visited').innerText = `Most visited: `
    let link = document.createElement('a')
    link.setAttribute('href', maxKey['link'])
    link.innerText = `${maxKey['title']}`
    document.getElementById('most-visited').appendChild(link)


})

document.getElementById('version').innerText = 'Chrome version: ' + /Chrome\/([0-9.]+)/.exec(navigator.userAgent)[1];

chrome.storage.local.get(["started"], async (result) => {
  let started 
  if (result.started){
      started = new Date(result.started);
      document.getElementById('up-since').innerText = "Browser Up Since: " + formatResult(getUptime(started, new Date()));
  } else {
      let date = new Date().toString()
      chrome.storage.local.set({started: date}, () => {console.log(date)})
      started = date
      document.getElementById('up-since').innerText = "Browser Up Since: " + formatResult(getUptime(started, new Date()));
  }
});

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
  
setup = async (date) => {
  chrome.storage.local.set({started: date});
}