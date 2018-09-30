class MessageBuilder{

  constructor(default_window){
    this.default_window = default_window;
  }

  makeTextSlide(text, inline_style, style, target_window){
      return {
        'type': 'next_content',
        'template': 'text_slide',
        'target_window': target_window != undefined ? target_window : this.default_window,
        'content': {
          'text': text,
          'inline_style': inline_style != undefined ? inline_style : undefined,
          'style': style != undefined ? style : undefined
        }
      }
  }

  makeNextSlide(target_window){
    return {
      'type': 'show_next',
      'target_window': target_window != undefined ? target_window : this.default_window
    }
  }

  makeTransitionTime(time, target_window){
    return {
      'type': 'transition_time',
      'target_window': target_window != undefined ? target_window : this.default_window,
      'content': time
    }
  }

  makeTheme(css_content, target_window){
    return {
      'type': 'set_theme',
      'target_window': target_window != undefined ? target_window : this.default_window,
      'content': css_content
    }
  }

}

module.exports = MessageBuilder;
