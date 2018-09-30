# ScreenFlow
The vision for this app is to make a new worship presenter software,
mostly tailored to my needs, and actually functional and enjoyable to use.

## Architecture
So this is gonna be built upon the amazing electron framework.

## Some proposed features
- multiple displays, addressable individually, that allow for continuous or mirrored backgrounds.
- the standard stuff, text, pictures, pdf, video, audio. HTML5 should provide all of that.
- Maybe a Notion-like text/block markup style for services.


# Documentation
## IPC message structure

## Styling content
There are currently three ways to style content:
### 1. inline_style
This style is plain CSS to be set as an inline style for the slide wrapper.
It is delivered as a message content, on an individual basis per slide.
Use this for general styling for the wrapper, e.g. special backgrounds or sth...
It was originally intended for the theme, but this had to be shifted to the overall
wrapper because the transition made weird effects.
### 2. style
This is also plain CSS, which is also delivered as a message content.
Difference is, it will be wrapper in a <style> tag inside the slide.
Use this for advanced styling for the fonts or overrides for the theme.
### 3. Theme
This will be delivered as a separate message content similar to the transition time,
because this shouldn't really change on a slide-to-slide basis.
The contents of the message will be added as plain string to the CSS class for the
overall content wrapper on the display.
