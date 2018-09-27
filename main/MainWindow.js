const { remote, ipcRenderer } = require ('electron');
const {dialog, app} = require('electron').remote;
const fs = require('fs-extra');
const MessageBuilder = require('./main/MessageBuilder.js');












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



function sendInput(){
  let message = {
    'type': 'next_content',
    'template': 'text_slide',
    'target_window': 'overlay1',
    'content': {'text': document.getElementById('textThing').value,
    'style': `
      color: white;
      outline: 10px solid white;
      outline-offset: -10px;
      background-image: url("./assets/picture.jpg");
      background-size: cover;
      background-position: center;
      `}
  }
  send(message);
}

function nextSlide(){
  let message = {
    'type': 'show_next',
    'target_window': 'overlay1'
  };
  send(message);
}

function setTransitionTime(){
  let message = {
    'type': 'transition_time',
    'target_window': 'overlay1',
    'content': document.getElementById('time').value
  };
  send(message);
}


function send(message){
  let target = remote.getGlobal('windows')[message.target_window];
  if (target) target.webContents.send('message', message);
}
