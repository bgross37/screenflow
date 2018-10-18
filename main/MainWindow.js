const { remote, ipcRenderer } = require ('electron');
const {dialog, app} = require('electron').remote;
const fsx = require('fs-extra');
const fs = require('fs');
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

/*
 * Let's us save the theme into a json file
 */
function saveTheme(){
    let themeName = document.getElementById('themeName').value;
    if(themeName == ''){
        themeName = "untitled";
    }
    let path = app.getAppPath() + '/themes/';
    let nameI = 0;
    let foundName = false;
    let theme = JSON.stringify(document.getElementById('theme').value);
    fs.readdir(path, function(err, items) {
        while(!foundName){
            foundName = themeName;
            for (var i=0; i<items.length; i++) {
                if(nameI > 0){
                    foundName = themeName + "_" + nameI ;
                }
                if(items[i] == (foundName + ".json")){
                    foundName = false;
                    break;
                }
            }
            nameI++;
        }
        fs.writeFile(app.getAppPath() + '/themes/'+foundName+ ".json", '{"name":"'+foundName+'", "themeContent":'+theme+'}', function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });
    });
}

function loadTheme(){
    let themeName = document.getElementById('themeName').value;
    if(themeName == ''){
        themeName = "untitled";
    }
    let path = app.getAppPath() + '/themes/';
    try {
      if (fs.existsSync(path + themeName + ".json")) {
        var obj = JSON.parse(fs.readFileSync(path + themeName + ".json", 'utf8'));
        document.getElementById('theme').value = obj.themeContent;
      }
    } catch(err) {
      console.error(err);
    }
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
