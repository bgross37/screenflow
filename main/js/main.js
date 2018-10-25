const { remote, ipcRenderer } = require ('electron');
const {dialog, app} = require('electron').remote;
const fsx = require('fs-extra');
const fs = require('fs');
const root = "../..";
const MessageBuilder = require(root+'/lib/MessageBuilder.js');
const FoundationVariable = require(root+'/lib/class.foundationVariable.js');
const Foundation = require(root+'/lib/class.foundation.js');

let mb = new MessageBuilder('overlay1');

$ = jQuery = require('jquery');


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

    fsx.copy(filePaths[0], app.getAppPath() + '/assets/' + filePaths[0].split('\\').pop().split('/').pop())
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
