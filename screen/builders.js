
class builders {

  constructor(content_wrapper){
    this.handlers = ['full', 'text_slide'];
    this.content_wrapper = content_wrapper;
  }


  full(content){
    if(this.content_wrapper.loaded_template != 'full'){
      this.load_template('full');
    }
    this.content_wrapper = content;
  }


  createTextSlide(text){
    return `
    <style>
    .flexbox_container{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .text_container p{
      text-align: center;
    }
    </style>
    <div class="flexbox_container">
      <p id="slidetext1">` + text + `</p>
    </div>
    `;
  }


  text_slide(text){
    let text_element = document.getElementById('text_element');
    text_element.innerText = text;
  }


  load_template(template){
    switch(template){
      case 'text_slide':
      this.content_wrapper.innerHTML = ´
      ´;

      this.content_wrapper.loaded_template = "text_slide";
      break;

      case 'full':
      this.content_wrapper.innerHTML = '';
      this.content_wrapper.loaded_template = 'full';
      break;
    }
  }
}
module.exports = builders;
