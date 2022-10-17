console.log('Unloading')


window.addEventListener('beforeunload', function(event) {
    event.returnValue = "Do you want to leave this site?";
});