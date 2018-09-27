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
      handleNext(message.template, message.content);
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
function handleNext(template, content){
  let next_up = document.createElement('div');
  next_up.classList.add('slide_container', 'smooth_fade', 'hidden');
  next_up.id = 'next_up';
  next_up.style = content.style;
  next_up.innerHTML = builder[template](content.text);

  let old_next_up = document.getElementById('next_up');
  if(old_next_up){
    old_next_up.parentNode.removeChild(old_next_up);
  }

  document.getElementById("content_wrapper").appendChild(next_up);
}



/*
* this one actually triggers the transition.
*/
function showNextSlide(){
  let old = document.getElementById('old');
  if(old != undefined){
    old.parentNode.removeChild(old);
  }

  let next_up = document.getElementById('next_up');
  if(!next_up){
    return 'Nothing queued!';
  }

  let current = document.getElementById('current');
  if(current != undefined){
    current.classList.remove('visible');
    current.classList.add('hidden');
    current.id = 'old';
  }

  next_up.classList.remove('hidden');
  next_up.classList.add('visible');
  next_up.id = 'current';
}
