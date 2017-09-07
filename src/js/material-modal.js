var MaterialModal = function(trigger) {
  this.trigger = trigger;

  this.initModal = function() {
    var modalId = this.trigger.dataset.modal;
    var len = modalId.length;
    var modalIdTrimmed = modalId.substring(1, len);
    var modal = document.getElementById(modalIdTrimmed);

    if (!modal) {
      if (this.trigger.dataset.hasOwnProperty('modalSrc')) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Action to be performed when the document is read;
            var container;
            if (this.trigger.dataset.hasOwnProperty('modalTarget')) {
              container = document.querySelector(this.trigger.dataset.modalTarget);
              if (!container) {
                console.error('Invalid modal-target property on this.trigger');
              }
            } else {
              container = document.createElement('div');
              document.body.appendChild(container);
            }

            container.innerHTML = xhttp.responseText;

            modal = document.getElementById(modalIdTrimmed);
            if (!modal) {
              console.error('No modal corresponding to this.trigger in loaded content');
            } else {
              this.modal = modal;
              this.setElements();
              this.bindActions();
            }
          }
        }.bind(this);
        xhttp.open("GET", this.trigger.dataset.modalSrc, true);
        xhttp.send();
      } else {
        console.error('Missing modal and no modal-src for async loading');
      }
    } else {
      this.modal = modal;
      this.setElements();
      this.bindActions();
    }
  };

  this.setElements = function() {
    this.content = this.modal.querySelector('.modal__content');
    this.closers = this.modal.querySelector('.modal__close');
    this.modalsbg = this.modal.querySelector('.modal__bg');
    if (!this.modalsbg) {
      this.modalsbg = [];
    }
    if (/modal__bg/.test(this.modal.className)) {
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
    for (var x = 0; x < this.modalsbg.length; x++) {
      this.modalsbg[x].addEventListener('click', this.close.bind(this), false);
    }
  };

  this.close = function(event) {
    var target = event.target;
    var contentDelay = 400;

    function removeDiv() {
      setTimeout(function() {
        window.requestAnimationFrame(function() {
          this.div.remove();
        }.bind(this));
      }.bind(this), contentDelay - 50);
    }

    if (this.isOpen && target.classList.contains('modal__bg') || target.classList.contains('modal__close')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      // make the hidden div visible again and remove the transforms so it scales back to its original size
      this.div.style.opacity = '1';
      // div.style.backgroundColor = window.getComputedStyle(self).backgroundColor;
      this.div.removeAttribute('style');

      // Remove active classes from triggers 
      this.trigger.style.transform = 'none';
      this.trigger.style.webkitTransform = 'none';
      this.trigger.classList.remove('modal__trigger--active');

      // Remove active classes from modals 
      this.modal.classList.remove('modal--active');
      this.content.classList.remove('modal__content--active');

      // when the temporary div is opacity:1 again, we want to remove it from the dom
      this.div.addEventListener('transitionend', removeDiv.bind(this), false);

      this.isOpen = false;
    }
  };

  this.open = function(event) {
    event.preventDefault();
    var contentDelay = 400;

    var makeDiv = function() {
      var tempdiv = document.getElementById('modal__temp');

      if (tempdiv === null) {
        this.div = document.createElement('div');
        this.div.id = 'modal__temp';
        this.trigger.appendChild(this.div);
        this.div.style.backgroundColor = window.getComputedStyle(this.trigger).backgroundColor;
        moveTrig();
      }
    }.bind(this);

    var moveTrig = function() {
      var trigProps = this.trigger.getBoundingClientRect();
      var mProps = this.modal.querySelector('.modal__content').getBoundingClientRect();
      var transX, transY, scaleX, scaleY;
      var xc = window.innerWidth / 2;
      var yc = window.innerHeight / 2;

      // this class increases z-index value so the button goes overtop the other buttons
      this.trigger.classList.add('modal__trigger--active');

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
      this.trigger.style.transform = 'translate(' + transX + 'px, ' + transY + 'px)';
      this.trigger.style.webkitTransform = 'translate(' + transX + 'px, ' + transY + 'px)';

      // expand temporary div to the same size as the modal
      this.div.style.backgroundColor = '#fff'; // transitions background color
      this.div.style.transform = 'scale(' + scaleX + ',' + scaleY + ')';
      this.div.style.webkitTransform = 'scale(' + scaleX + ',' + scaleY + ')';


      window.setTimeout(function() {
        window.requestAnimationFrame(function() {
          showDiv();
        }.bind(this));
      }.bind(this), contentDelay);
    }.bind(this);

    var showDiv = function() {
      if (!this.isOpen) {
        // select the content inside the modal
        var content = this.modal.querySelector('.modal__content');
        // reveal the modal
        this.modal.classList.add('modal--active');
        // reveal the modal content
        content.classList.add('modal__content--active');
        content.addEventListener('transitionend', hideDiv.bind(this), false);
        this.isOpen = true;
      }
    }.bind(this);

    var hideDiv = function() {
      this.div.style.opacity = '0';
      this.content.removeEventListener('transitionend', hideDiv.bind(this), false);
    }.bind(this);

    makeDiv();
  };

  this.initModal();
};

var triggers = document.querySelectorAll('.modal__trigger');
var modals = [];
for (var j = 0; j < triggers.length; j++) {
  new MaterialModal(triggers[j]);
}