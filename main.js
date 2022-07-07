const footer = document.getElementsByClassName('footer')[0];

for(let i = 0; i < 14; i++) {
    footer.innerHTML = footer.innerHTML + '<div class="footer-date"> <h4>2' + (9+i).toString().padStart(3, '0') +'</h4></div>'
}