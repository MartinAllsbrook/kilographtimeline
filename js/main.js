const footer = document.getElementsByClassName('footer')[0];
for(let i = 0; i < 14; i++) {
    footer.innerHTML = footer.innerHTML + '<div class="footer-date"> <h4>2' + (9+i).toString().padStart(3, '0') +'</h4></div>';
}

const slideshow = document.getElementsByClassName('intro-slideshow')[0];
for(let i = 1; i < 6; i++) {
    slideshow.innerHTML = slideshow.innerHTML + '<image src="assets/intro/slideshow/' + i.toString().padStart(3, '0') + '.jpg" alt="Slideshow Image">';
}

const haloweenReel = document.getElementsByClassName('haloween-reel')[0]
for(let i = 1; i <= 7; i++) {
    haloweenReel.innerHTML = haloweenReel.innerHTML + '<image src="assets/2013/Haloween best/' + i.toString().padStart(3, '0') + '.jpg" alt="Haloween Reel Image">'
}
console.log('Essential JS Loaded');