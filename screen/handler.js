const { remote, ipcRenderer } = require('electron');
const fs = require('fs-extra');
const builders = require('./screen/builders.js');

let content_wrapper = document.getElementById('content_wrapper');
content_wrapper.loaded_template = 'full';
content_wrapper.innerHTML = '';

let builder = new builders(content_wrapper);

ipcRenderer.on('message', (event, message) => {
  console.log(message);

  switch(message.type){
    case 'transition_time':
      setTransitionTime(message.content);
      break;

    case 'next_content':
      handleNext(message.content);
      break;

    case 'show_next':
      showNextSlide();
      break;

  }


});


/*
* changes transition time based on input. Therefore .smooth_fade has to be
* the top most style rule in the style sheet.
*/
function setTransitionTime(time){
  document.styleSheets[0].deleteRule(0);
  document.styleSheets[0].insertRule('.smooth_fade{transition: opacity ' + time + 's;}', 0);
}

/*
* this one needs to prep the next <div> with the delivered content (kinda like caching)
*/
function handleNext(type, content){
  let next_up = document.createElement('div');
  next_up.classList.add('slide_container','smooth_fade');
  next_up.id = 'next_up';
  next_up.innerHTML = builder[type](content)
}



/*
* this one actually triggers the transition.
*/
function showNextSlide(){

}
