class Theme {
  constructor(css_tag, key, value){
    if(css_tag != undefined && key != undefined && value != undefined){
      this.styleList = {css_tag: [key + ':' + value + ';']};
    }

  }

  addRule(css_tag, key, value){
    this.styleList[css_tag].push(key + ':' + value + ';');
  }



/*
* This function shall return a <style> DOM-Element that can be passed straight to
* the display.
*/
  getDOMStyleElement(){
    return '<style>' + this.styleList + '</style>';
  }



}

module.exports = Theme;
