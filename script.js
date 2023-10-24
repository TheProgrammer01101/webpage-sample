const contentSections = Array.from(document.querySelectorAll('.content section'));
const sliderButtons = Array.from(document.querySelectorAll('.page-indicator .dot, .links li a'));
const allElements = contentSections.concat(sliderButtons);

sliderButtons.forEach(button => {
  button.addEventListener('click', function() {
    allElements.forEach(elem => {
      elem.classList.remove('active'); 
      if(elem.dataset.index == this.dataset.index) elem.classList.add('active');
    });
  })
});

const overlayElements = document.querySelectorAll('.blur, .overlay-box');
const buttons = document.querySelectorAll('.impressum-btn, .close-btn, .kontakt-btn');
const titleForm = document.querySelector('.title-form')

var xhr= new XMLHttpRequest();


buttons.forEach(btn => {
  btn.addEventListener('click', function () {
    overlayElements.forEach(overlayElem => {
      overlayElem.classList.add('active');
      if(btn.dataset.index == "impressum" || btn.dataset.index == "kontakt-form") {
        const fileName = btn.dataset.index + ".html";

        titleForm.innerHTML = btn.dataset.name;
        xhr.open('GET', fileName, true);
        xhr.onreadystatechange= function() {
          if (this.readyState!==4) return;
          if (this.status!==200) return; // or whatever error handling you want
          document.querySelector('#content').innerHTML= this.responseText;
        };
          xhr.send();
      }
      if(btn.className == "close-btn") {
        overlayElem.classList.remove('active');
      }
    })
  });
});