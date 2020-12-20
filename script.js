const contentSections = Array.from(document.querySelectorAll('.content section'));
const clickableSections = Array.from(document.querySelectorAll('.content-switcher .section, .links li a'));
const allElements = contentSections.concat(clickableSections);

clickableSections.forEach(clickable => {
  clickable.addEventListener('click', function() {
    allElements.forEach(elem => {
      elem.classList.remove('active'); 
      if(elem.dataset.index == this.dataset.index) elem.classList.add('active');
    });
  })
});

const overlayElements = document.querySelectorAll('.blur, .overlay-box');
const buttons = document.querySelectorAll('.ipm, .close-btn, .kontakt-btn');
const titleForm = document.querySelector('.title-form')

var xhr= new XMLHttpRequest();


buttons.forEach(btn => {
  btn.addEventListener('click', function () {
    overlayElements.forEach(overlayElem => {
      overlayElem.classList.add('active');
      if(btn.dataset.index == "ipm" || btn.dataset.index == "kontakt-form") {
        const fileName = btn.dataset.index + ".html";

        titleForm.innerHTML = btn.dataset.name;
        xhr.open('GET', fileName, true);
        xhr.onreadystatechange= function() {
          if (this.readyState!==4) return;
          if (this.status!==200) return; // or whatever error handling you want
          document.getElementById('content').innerHTML= this.responseText;
        };
          xhr.send();
      }
      if(btn.className == "close-btn") {
        overlayElem.classList.remove('active');
      }
    })
  });
});