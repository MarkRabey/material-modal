var MaterialModal = function (container) {
  'use strict';
  if(!container){
    container = document;
  }

  var methods = {
    qsa: function (el, _container) {
      return _container.querySelectorAll(el);
    }
  };

  //var trigger = methods.qsa('.modal__trigger');
  var modals = methods.qsa('.modal', container);
  var modalsbg = methods.qsa('.modal__bg', container);
  var content = methods.qsa('.modal__content', container);
  var closers = methods.qsa('.modal__close', container);

  //find triggers for the modals we are interested in
  var trigger = [];
  for(var i=0;i<modals.length;i++){
    var trig = methods.qsa(".modal__trigger[data-modal='#" + modals[i].id+"']", document);
	console.log(trig);
	if(trig.length > 0){
		trigger.push(trig[0]);
	}
	else{
		console.log('Did not find trigger for modal #' + modal[i].id);
	}
  }




  var w = window;
  var isOpen = false;
  var contentDelay = 400;

  var getId = function(event) {

    event.preventDefault();
    var self = this;
    var modalId = self.dataset.modal;
    var len = modalId.length;
    var modalIdTrimmed = modalId.substring(1, len);
    var modal = document.getElementById(modalIdTrimmed);
    makeDiv(self, modal);
  };

  var makeDiv = function(self, modal) {

    var tempdiv = document.getElementById('modal__temp');

    if (tempdiv === null) {
      var div = document.createElement('div');
      div.id = 'modal__temp';
      self.appendChild(div);
      div.style.backgroundColor = window.getComputedStyle(self).backgroundColor;
      moveTrig(self, modal, div);
    }
  };

  var moveTrig = function(trig, modal, div) {
    var trigProps = trig.getBoundingClientRect();
    var m = modal;
    var mProps = m.querySelector('.modal__content').getBoundingClientRect();
    var transX, transY, scaleX, scaleY;
    var xc = w.innerWidth / 2;
    var yc = w.innerHeight / 2;

    // this class increases z-index value so the button goes overtop the other buttons
    trig.classList.add('modal__trigger--active');

    // these values are used for scale the temporary div to the same size as the modal
    scaleX = mProps.width / trigProps.width;
    scaleY = mProps.height / trigProps.height;

    scaleX = scaleX.toFixed(3); // round to 3 decimal places
    scaleY = scaleY.toFixed(3);


    // these values are used to move the button to the center of the window
    transX = Math.round(xc - trigProps.left - trigProps.width / 2);
    transY = Math.round(yc - trigProps.top - trigProps.height / 2);

    // if the modal is aligned to the top then move the button to the center-y of the modal instead of the window
    if (m.classList.contains('modal--align-top')) {
      transY = Math.round(mProps.height / 2 + mProps.top - trigProps.top - trigProps.height / 2);
    }


    // translate button to center of screen
    trig.style.transform = 'translate(' + transX + 'px, ' + transY + 'px)';
    trig.style.webkitTransform = 'translate(' + transX + 'px, ' + transY + 'px)';

    // expand temporary div to the same size as the modal
    div.style.backgroundColor = '#fff'; // transitions background color
    div.style.transform = 'scale(' + scaleX + ',' + scaleY + ')';
    div.style.webkitTransform = 'scale(' + scaleX + ',' + scaleY + ')';


    window.setTimeout(function() {
      window.requestAnimationFrame(function() {
        open(m, div);
      });
    }, contentDelay);

  };

  var open = function(m, div) {

    function hideDiv() {
      // fadeout div so that it can't be seen when the window is resized
      div.style.opacity = '0';
      content.removeEventListener('transitionend', hideDiv, false);
    }

    if (!isOpen) {
      // select the content inside the modal
      var content = m.querySelector('.modal__content');
      // reveal the modal
      m.classList.add('modal--active');
      // reveal the modal content
      content.classList.add('modal__content--active');

      content.addEventListener('transitionend', hideDiv, false);

      isOpen = true;
    }


  };

  var close = function(event) {
    // event.preventDefault();
    // event.stopImmediatePropagation();

    var target = event.target;
    var div = document.getElementById('modal__temp');
    var i;
    function removeDiv() {
      setTimeout(function() {
        window.requestAnimationFrame(function() {
          div.remove();
        });
      }, contentDelay - 50);
    }

    if (isOpen && target.classList.contains('modal__bg') || target.classList.contains('modal__close')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      // make the hidden div visible again and remove the transforms so it scales back to its original size
      div.style.opacity = '1';
      // div.style.backgroundColor = window.getComputedStyle(self).backgroundColor;
      div.removeAttribute('style');

      /* Remove active classes from triggers */
      for (i = 0; i < trigger.length; i++) {
        trigger[i].style.transform = 'none';
        trigger[i].style.webkitTransform = 'none';
        trigger[i].classList.remove('modal__trigger--active');
      }

      /* Remove active classes from modals */
      for (i = 0; i < modals.length; i++) {
        modals[i].classList.remove('modal--active');
        content[i].classList.remove('modal__content--active');
      }

      // when the temporary div is opacity:1 again, we want to remove it from the dom
      div.addEventListener('transitionend', removeDiv, false);

      isOpen = false;

    } else {

    }
  };

  var bindActions = function() {
    var i;
    /* bind triggers */
    for (i = 0; i < trigger.length; i++) {
      trigger[i].addEventListener('click', getId, false);
    }

    /* bind modals */
    for (i = 0; i < closers.length; i++) {
      closers[i].addEventListener('click', close, false);
    }

    /* bind modal__bgs */
    for (i = 0; i < modalsbg.length; i++) {
      modalsbg[i].addEventListener('click', close, false);
    }

  };

   bindActions();

};

Modal = new MaterialModal();
