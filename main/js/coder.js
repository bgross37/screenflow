function parseFoundation(){
    let foundation = Foundation.createFoundation($("#foundation_html").val(), $("#foundation_css").val());
    return foundation;
}

/*
 * Let's us save the theme into a json file
 */
function saveFoundation(){
    let foundationName = document.getElementById('foundationName').value;
    if(foundationName == ''){
        foundationName = "untitled";
    }
    let path = app.getAppPath() + '/foundations/';
    let nameI = 0;
    let foundName = false;
    let foundation = parseFoundation();
    fs.readdir(path, function(err, items) {
        while(!foundName){
            foundName = foundationName;
            for (var i=0; i<items.length; i++) {
                if(nameI > 0){
                    foundName = foundationName + "_" + nameI ;
                }
                if(items[i] == (foundName + ".json")){
                    foundName = false;
                    break;
                }
            }
            nameI++;
        }
        foundation.name = foundName;
        foundation = JSON.stringify(foundation);
        fs.writeFile(path+foundName+ ".json", foundation, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });
    });
}
