
var MaterialModal = function (trigger) {
  'use strict';

  this.trigger = trigger;


  this.initModal = function(){
    var modalId = this.trigger.dataset.modal;
    var len = modalId.length;
    var modalIdTrimmed = modalId.substring(1, len);
    var modal = document.getElementById(modalIdTrimmed);

	if(!modal){
		if(this.trigger.dataset.hasOwnProperty('modalSrc')){
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4 && xhttp.status == 200) {
				  // Action to be performed when the document is read;
				  var container;
				  if(this.trigger.dataset.hasOwnProperty('modalTarget')){
					container = document.querySelector(this.trigger.dataset.modalTarget);
					if(!container){
						console.error('Invalid modal-target property on this.trigger');
					}
				  }
				  else{
					container = document.createElement('div');
					document.body.adopt(container);
				  }

				  container.innerHTML = xhttp.responseText;

				  modal = document.getElementById(modalIdTrimmed);
				  if(!modal){
					  console.error('No modal corresponding to this.trigger in loaded content');
				  }
				  else{
					this.modal = modal;
					this.setElements();
					this.bindActions();
				  }
				}
			}.bind(this);
			xhttp.open("GET", this.trigger.dataset.modalSrc, true);
			xhttp.send();
		}
		else{
			console.error('Missing modal and no modal-src for async loading');
		}
	}
	else{
		this.modal = modal;
		this.setElements();
		this.bindActions();
	}
  };

  this.setElements = function(){
		this.content = this.modal.querySelector('.modal__content');
		this.closers = this.modal.querySelector('.modal__close')
		this.modalsbg = this.modal.querySelector('.modal__bg');
		if(!this.modalsbg){
			this.modalsbg = [];
		}
		if(/modal__bg/.test(this.modal.className)){
			this.modalsbg.push(this.modal);
		}
  };

  this.bindActions = function() {
	  this.trigger.addEventListener('click', this.open.bind(this), false);

    // bind modals 
    for (var i = 0; i < this.closers.length; i++) {
      this.closers[i].addEventListener('click', this.close.bind(this), false);
    }

    // bind modal__bgs 
    for (var i = 0; i < this.modalsbg.length; i++) {
      this.modalsbg[i].addEventListener('click', this.close.bind(this), false);
    }
  };

  this.close = function(event) {
    var target = event.target;
    var div = document.getElementById('modal__temp');
    var i;
	var contentDelay = 400;
    function removeDiv() {
      setTimeout(function() {
        window.requestAnimationFrame(function() {
          div.remove();
        });
      }, contentDelay - 50);
    }

    if (this.isOpen && target.classList.contains('modal__bg') || target.classList.contains('modal__close')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      // make the hidden div visible again and remove the transforms so it scales back to its original size
      div.style.opacity = '1';
      // div.style.backgroundColor = window.getComputedStyle(self).backgroundColor;
      div.removeAttribute('style');

      // Remove active classes from triggers 
      this.trigger.style.transform = 'none';
      this.trigger.style.webkitTransform = 'none';
      this.trigger.classList.remove('modal__trigger--active');

     // Remove active classes from modals 
      this.modal.classList.remove('modal--active');
      this.content.classList.remove('modal__content--active');

      // when the temporary div is opacity:1 again, we want to remove it from the dom
      div.addEventListener('transitionend', removeDiv, false);

      this.isOpen = false;

    } else {

    }
  };

  this.open = function(event){
    event.preventDefault();
    var self = event.target;
	var contentDelay = 400;

	var makeDiv = function(self) {

	  var tempdiv = document.getElementById('modal__temp');

	  if (tempdiv === null) {
		var div = document.createElement('div');
		div.id = 'modal__temp';
		self.appendChild(div);
		div.style.backgroundColor = window.getComputedStyle(self).backgroundColor;
		moveTrig(self, div);
	  }
	}.bind(this);

	var moveTrig = function(trig, div) {
		var trigProps = trig.getBoundingClientRect();
		var mProps = this.modal.querySelector('.modal__content').getBoundingClientRect();
		var transX, transY, scaleX, scaleY;
		var xc = window.innerWidth / 2;
		var yc = window.innerHeight / 2;

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
		if (this.modal.classList.contains('modal--align-top')) {
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
			showDiv(div);
		  });
		}, contentDelay);
	}.bind(this);

	var showDiv = function(div){
		if (!this.isOpen) {
		  // select the content inside the modal
		  var content = this.modal.querySelector('.modal__content');
		  // reveal the modal
		  this.modal.classList.add('modal--active');
		  // reveal the modal content
		  content.classList.add('modal__content--active');

		  var cb = function(){
			  hideDiv(div);
		  };

		  content.addEventListener('transitionend', cb, false);

		  this.isOpen = true;
		}


	}.bind(this);

	var hideDiv = function(div){
		div.style.opacity = '0';
		this.content.removeEventListener('transitionend', hideDiv, false);
	}.bind(this);

	makeDiv(self);
  }

  this.initModal();
}

var triggers = document.querySelectorAll('.modal__trigger');
var modals = [];
for(var j=0;j<triggers.length;j++){
	new MaterialModal(triggers[j]);
}
