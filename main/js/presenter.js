function nextSlide(){
  console.log('next slide is up!')
  let message = mb.makeTextSlide(document.getElementById('text').value,
    document.getElementById('inline_style').value,
    document.getElementById('style').value);
  sendMessage(message);

  sendMessage(mb.makeNextSlide());
}

function sendTheme(themeName){
    if(themeName == ''){
        themeName = "untitled";
    }
    let path = app.getAppPath() + '/themes/';
    try {
      if (fs.existsSync(path + themeName + ".json")) {
        var obj = JSON.parse(fs.readFileSync(path + themeName + ".json", 'utf8'));
        let message = mb.makeTheme(obj.themeContent);
        sendMessage(message);
      }
    } catch(err) {
      console.error(err);
    }
}

$(document).ready(function() {
    updateThemes();
});

function updateThemes(){
    let path = app.getAppPath() + '/themes/';
    let themes = fs.readdirSync(path);
    $("#themes_wrapper").html();
    let i = 0;
    $(themes).each(function(key, value){
        let obj = JSON.parse(fs.readFileSync(path + value, 'utf8'));
        let themeCss = obj.themeContent;
        $("#themes_wrapper").append("<div class='theme_preview' id='theme_preview_"+i+"' onclick='sendTheme(\""+obj.name+"\")'><div class='flexbox_container'><p>Some Content</p></div></div>");
        document.styleSheets[0].insertRule(`
          #themes_wrapper #theme_preview_`+i+`{
            ` + themeCss + `
          }`);
        i++;
    });
}
