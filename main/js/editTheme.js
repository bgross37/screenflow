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
