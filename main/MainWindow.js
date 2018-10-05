const { remote, ipcRenderer } = require ('electron');
const {dialog, app} = require('electron').remote;
const fs = require('fs-extra');
const MessageBuilder = require('./lib/MessageBuilder.js');

let mb = new MessageBuilder('overlay1');


function nextSlide(){
  console.log('next slide is up!')
  let message = mb.makeTextSlide(document.getElementById('text').value,
    document.getElementById('inline_style').value,
    document.getElementById('style').value);
  sendMessage(message);

  sendMessage(mb.makeNextSlide());
}

function setTheme(){
  let message = mb.makeTheme(document.getElementById('theme').value);
  sendMessage(message);
}





// This one just sends a given message to the intended target window.
function sendMessage(message){
  let target = remote.getGlobal('windows')[message.target_window];
  if (target) target.webContents.send('message', message);
}



//----------------------------------------------- Legacy stuff


function ingestFile(){
  dialog.showOpenDialog((filePaths) => {
    // fileNames is an array that contains all the selected
    if(filePaths === undefined){
        console.log("No file selected");
        return;
    }

    fs.copy(filePaths[0], app.getAppPath() + '/assets/' + filePaths[0].split('\\').pop().split('/').pop())
    .then(() => console.log('success!'))
    .catch(err => console.error(err))
});
}



function setTransitionTime(){
  let message = {
    'type': 'transition_time',
    'target_window': 'overlay1',
    'content': document.getElementById('time').value
  };
  sendMessage(message);
}
