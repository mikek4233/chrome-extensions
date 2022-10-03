
let submitBtn = document.getElementById("submitBtn");

// Reacts to a submit button by saving the repos in storage
// and closing the options tab
function handleSubmit(event) {
  let dev = document.getElementById("devRepo").value;
  let sl  = document.getElementById("slRepo").value;
  let repos = {dev, sl};

  chrome.storage.sync.set({ repos });
  chrome.runtime.sendMessage(
    { 
        msg: "tab_close_msg"
    }, 
    function (response) {
        console.log("response from the bg", response);
    }
  );
}

// Add 2 inputs for the repos (load them if they exist in chrome storage)
function constructOptions() {
  chrome.storage.sync.get("repos", (data) => {
    let dev = data.repos.dev;
    let sl  = data.repos.sl; 

    let inputDev = document.getElementById("devRepo");
    let inputSl  = document.getElementById("slRepo");

    if (dev){
      inputDev.value = dev;
    }

    if (sl){
      inputSl.value = sl;
    }

    let submitBtn = document.getElementById("submitBtn");
    submitBtn.addEventListener("click", handleSubmit);
  });
}


constructOptions();
