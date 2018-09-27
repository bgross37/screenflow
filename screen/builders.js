class builders {

  constructor(content_wrapper){

  }


  full(content){
    return `
    <style>
    .flexbox_container{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    </style>
    <div class="flexbox_container">` + content + '</div>';
  }


  text_slide(text){
    return `
    <style>
    .flexbox_container{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .flexbox_container p{
      text-align: center;
    }
    </style>
    <div class="flexbox_container">
      <p id="slidetext1">` + text + '</p></div>';
  }


}

module.exports = builders;
