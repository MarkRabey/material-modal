Material Modal
==============
[![devDependencies](https://david-dm.org/MarkRabey/material-modal/dev-status.svg)](https://david-dm.org/MarkRabey/material-modal#info=devDependencies&view=table) [![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT) [![Issues](http://img.shields.io/github/issues/MarkRabey/material-modal.svg)]( https://github.com/MarkRabey/material-modal/issues )
___

Click [here](http://markrabey.github.io/material-modal/) for a demo.

## What is it?
An animated modal dialog styled for use with [Material Design Lite].

## Installation
### Bower

	bower install material-modal --save

### NPM

	npm install material-modal --save

After Bower or NPM install, copy the files from `dist/css` and `dist/js` to your project's assets folder.

### Without a Package Manager
Clone repo, or download [zip](https://github.com/MarkRabey/material-modal/archive/master.zip).

## Usage
A working sample is available in the download, in the 'demo' folder.

Create an element with the class `.modal__trigger`. Add the `data-modal` attribute with a value of the id of the target modal.

Create a `div` with the class `.modal`, with another nested div with the class `.modal__content`.

Optionally you can add a `.modal__header` and `.modal__footer`. To close the modal, you can click the background, or create an element with the class `.modal__close`.

Here is a sample HTML structure using [Material Design Lite]:

```html
...
<html>
  <head>
    <meta charset="UTF-8">
    <title>Material Design Modal Demo</title>
    <link rel="stylesheet" href="https://storage.googleapis.com/code.getmdl.io/1.0.5/material.indigo-pink.min.css"> <!-- Default MDL CSS -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">  <!-- MDL Icons -->
    <link rel="stylesheet" href="../dist/css/material-modal.min.css">
  </head>
  <body>

    <div class="content">  <!-- For Demo Only -->
      <a href="" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored modal__trigger" data-modal="#modal">
        Launch Modal
      </a>

      <div id="modal" class="modal modal__bg">
        <div class="modal__dialog">
          <div class="modal__content">
            <div class="modal__header">
              <div class="modal__title">
                <h2 class="modal__title-text">Modal</h2>
              </div>

              <span class="mdl-button mdl-button--icon mdl-js-button  material-icons  modal__close"></span>
            </div>


            <div class="modal__text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis laboriosam accusantium facere suscipit, alias accusamus corrupti consequatur at porro, voluptates commodi sed omnis voluptatem, ex officiis illum, architecto fugiat id?
              </p>
            </div>

            <div class="modal__footer">
              <a class="mdl-button mdl-button--colored mdl-js-button  modal__close">
                Close
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>


    <script src="https://storage.googleapis.com/code.getmdl.io/1.0.5/material.min.js"></script> <!-- MDL JavaScript -->
    <script src="path/to/js/material-modal.min.js"></script>
  </body>
</html>
```

## Development
Feel free to do what you'd like with this. Clone or fork the repo, type `npm install` and have your way with it. Use `grunt build` to compile Less to CSS, lint and minify JS, and update the `dist` and `demo` folders. Use `grunt default` to run the build, and continue to watch the Less and JavaScript files for changes.


---
**Material Modal** © 2015-2017, Mark Rabey. Released under the [MIT] License.<br>
Authored and maintained by Mark Rabey

> [markrabey.com](http://markrabey.com) &nbsp;&middot;&nbsp;
> GitHub [@MarkRabey](https://github.com/MarkRabey) &nbsp;&middot;&nbsp;
> Twitter [@MarkRabey](https://twitter.com/MarkRabey)

[MIT]: http://mit-license.org/
[Material Design Lite]: http://getmdl.io
