const footer = document.getElementsByClassName('footer')[0];

for(let i = 0; i < 14; i++) {
    footer.innerHTML = footer.innerHTML + '<div class="footer-date"> <h4>2' + (9+i).toString().padStart(3, '0') +'</h4></div>';
}

const slideshow = document.getElementsByClassName('intro-slideshow')[0];

for(let i = 1; i < 6; i++) {
    slideshow.innerHTML = slideshow.innerHTML + '<div class="years-of-spacer"></div> <image src="assets/intro/slideshow/' + i.toString().padStart(3, '0') + '.jpg" class="intro-slideshow-image" alt="Slideshow Image">';
}